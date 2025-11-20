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
            name: userRequest.name,
            email: userRequest.email,
            password: hashedPassword,
            phone: userRequest.phone,
            rollno: userRequest.rollno,
            course: userRequest.course,
            verificationToken
        });

        if (!createdUser) {
            throw new Error("Unable to create new User!");
        }

        const token = this.jwtService.generateToken(createdUser.email, "User", createdUser.id);

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

        const user = await this.userService.findUserByEmail(email);

        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password as string);

        if (isPasswordValid) {
            const token = this.jwtService.generateToken(user.email, "User", user.id);
            return { token: token, email: user.email, name: user.name };
        }

        return null;
    }

    async getUserById(patientId: string): Promise<Partial<IUser> | null> {
        const user = await this.userService.findUserById(patientId);

        if (!user) {
            return null;
        }

        const userObj = user.toObject();
        return userObj;
    }

    async signInByGoogle(code: string, role: string): Promise<AuthResponse | null> {
        const googleResponse = await oauth2Client.getToken(code);
        const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);

        const { email, name, verified_email, picture } = userResponse.data;

        let userInfo = await this.userService.findUserByEmail(email);

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

        if (!userInfo || !userInfo.id) {
            throw new Error('Unable to save user in the database');
        }

        const token = this.jwtService.generateToken(email, role, userInfo.id);
        return { token, email, name, profile: userInfo.profileUrl || '' };
    }

    async verifyToken(token: string): Promise<boolean | null> {
        const user: IUser | null = await this.userService.getUserByVerificationToken(token);

        if(!user) {
            return false;
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        return true;
    }
}