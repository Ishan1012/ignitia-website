import { Document, Types } from "mongoose";

export interface IUser extends Document{
    name: string;
    email: string;
    password?: string;
    isOAuth: boolean;
    detailsComplete: boolean;
    status: string;
    isVerified: boolean;
    verificationToken?: string | undefined;
    profileUrl?: string;
    age: number;
    phone: string;
    rollno: string;
    course: string;
    isPhoneVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}