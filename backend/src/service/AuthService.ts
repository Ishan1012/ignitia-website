import bcrypt from "bcrypt";
import crypto from "crypto";
import { IUser } from "../interface/IUser";
import { JwtService } from "./JwtService";
import { UserService } from "./UserService";
import { AuthRequest } from "../middleware/auth";
import { AuthResponse } from "../interface/AuthResponse";
import { oauth2Client } from "../config/GoogleAuthconfig";
import axios from "axios";
import { VerificationResponse } from "../interface/VerificationResponse";
import { JwtPayload, verify } from "jsonwebtoken";
import { createTransport } from "nodemailer";
import { Message } from "../utils/Message";
import transporter from "../config/NodeMailer";

export class AuthService {
    private userService: UserService;
    private jwtService: JwtService;

    constructor() {
        this.userService = new UserService();
        this.jwtService = new JwtService();
    }

    async signUp(userRequest: IUser): Promise<VerificationResponse | null> {
        if (!userRequest.email || !userRequest.password || !userRequest.name) {
            throw new Error(`Missing required fields: \n name: ${!!userRequest.name}, email: ${!!userRequest.email}, or password: ${!!userRequest.password}`);
        }

        const user = await this.userService.findUserByEmail(userRequest.email);

        if (user) {
            return null;
        }

        const hashedPassword = await bcrypt.hash(userRequest.password as string, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');


            const createdUser = await this.userService.saveUser({
                name: IUser.name,
                email: IUser.email,
                password: hashedPassword,
                verificationToken
            });

            if (!createdUser) {
                throw new Error("Unable to create new User!");
            }

            const token = this.jwtService.generateToken(createdUser?.email, "User", createdUser?.id);

            const verificationUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${createdUser.verificationToken}`;
            await transporter.sendMail({
                from: `no reply <${process.env.EMAIL_ID}>`,
                to: createdUser.email,
                subject: 'Verify Your Email',
                html: Message(verificationUrl),
            });

            return { token: token, email: createdUser.email, name: createdUser.name, verificationToken };

    }

    async signIn(signInRequest: AuthRequest): Promise<AuthResponse | null> {
        const { email, password } = signInRequest.body;

        if (!email || !password) {
            throw new Error(`Following details not defined!\n Please provide following to proceed:\n email: ${!!email}, password: ${!!password}`);
        }

        const patient = await this.userService.findUserByEmail(email);
        const doctor = await this.doctorService.findDoctorByEmail(email);

        if (!patient && !doctor) {
            return null;
        }

        if (patient) {
            const isPasswordValid = await bcrypt.compare(password, patient.password as string);

            if (isPasswordValid) {
                const token = this.jwtService.generateToken(patient.email, "User", patient.id);
                return { token: token, email: patient.email, name: patient.name };
            }

            return null;
        } else if (doctor) {
            const isPasswordValid = await bcrypt.compare(password, doctor.password as string);

            if (isPasswordValid) {
                const token = this.jwtService.generateToken(doctor.email, "Doctor", doctor.id);
                return { token: token, email: doctor.email, name: doctor.name };
            }

            return null;
        } else {
            throw new Error('Invalid user type');
        }
    }

    async getUserById(patientId: string): Promise<Partial<IUser> | null> {
        const patient = await this.userService.findUserById(patientId);

        if (!patient) {
            return null;
        }

        const patientObj = patient.toObject();
        return patientObj;
    }

    async getDoctorById(doctorId: string): Promise<Partial<IDoctor> | null> {
        const doctor = await this.doctorService.findDoctorById(doctorId);

        if (!doctor) {
            return null;
        }

        const doctorObj = doctor.toObject();
        const { _id, password, ...rest } = doctorObj;
        return rest;
    }

    async signInByGoogle(code: string, role: string): Promise<AuthResponse | null> {
        const googleResponse = await oauth2Client.getToken(code);
        const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);

        const { email, name, verified_email, picture } = userResponse.data;

        let userInfo;
        if (role === "User") {
            userInfo = await this.doctorService.findDoctorByEmail(email);
            if (!!userInfo) {
                role = "Doctor";
            }
            if (!userInfo) {
                userInfo = await this.userService.findUserByEmail(email);
            }
            if (!userInfo) {
                userInfo = await this.userService.saveUser({
                    name,
                    email,
                    password: '',
                    isVerified: verified_email,
                    profileUrl: picture,
                    isOAuth: true
                });
            }
        } else if (role === "Doctor") {
            userInfo = await this.userService.findUserByEmail(email);
            if (!!userInfo) {
                role = "User";
            }
            if (!userInfo) {
                userInfo = await this.doctorService.findDoctorByEmail(email);
            }
            if (!userInfo) {
                userInfo = await this.doctorService.saveDoctor({
                    name,
                    email,
                    password: '',
                    isVerified: verified_email,
                    profileUrl: picture,
                    isOAuth: true
                });
            }
        } else {
            throw new Error('Invalid user role');
        }

        if (!userInfo || !userInfo.id) {
            throw new Error('Unable to save user in the database');
        }

        const token = this.jwtService.generateToken(email, role, userInfo.id);
        return { token, email, name, profile: userInfo.profileUrl || '' };
    }

    async verifyToken(token: string): Promise<boolean | null> {
        const doctor: IDoctor | null = await this.doctorService.getDoctorByVerificationToken(token);

        if (!doctor) {
            const patient: IUser | null = await this.userService.getUserByVerificationToken(token);

            if (!patient) {
                return false;
            }

            patient.isVerified = true;
            patient.verificationToken = undefined;
            await patient.save();

            return true;
        } else {
            doctor.isVerified = true;
            doctor.verificationToken = undefined;
            await doctor.save();

            return true;
        }
    }
}