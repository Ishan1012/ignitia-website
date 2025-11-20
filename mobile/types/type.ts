export type Event = {
    id: number;
    name: string;
    desc: string;
    location: string;
    date: string;
    time: string;
    contact: string;
    price: string;
    imageSrc: any;
    imageAlt: string;
};

export interface UserSession {
    email: string;
    name: string;
    token: string;
    profile: string;
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface UserRequest {
    user?: User;
}

export interface SignUpRequest {
    role: string;
    name: string;
    email: string;
    phone: string;
    rollno: string;
    course: string;
    password: string;
}

export interface User {
    id: string;
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
    isPhoneVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}