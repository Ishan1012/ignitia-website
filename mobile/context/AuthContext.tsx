'use client';
import { signInApi, signInByGoogleApi, signUpApi, userApi } from "@/apis/apis";
import { SignInRequest, SignUpRequest, UserSession } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import * as AuthSession from "expo-auth-session";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
    userSession: UserSession | null;
    isAuthenticated: boolean;
    login: (data: SignInRequest) => Promise<boolean>;
    signup: (data: SignUpRequest) => Promise<boolean>;
    logout: () => Promise<void>;
    getUser: () => Promise<any | null>;
    googleLogin: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userSession, setUserSession] = useState<UserSession | null>(null);

    const redirectUri = AuthSession.makeRedirectUri({
        scheme: "Ignitia"
    });

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
        redirectUri: redirectUri,
        scopes: ["profile", "email"]
    });

    useEffect(() => {
        (async () => {
            const stored = await AsyncStorage.getItem("userSession");
            // console.log(stored);
            if (stored) setUserSession(JSON.parse(stored));
        })();
    }, []);

    const login = async (data: SignInRequest): Promise<boolean> => {
        try {
            const res = await signInApi(data);
            const userDetails = res.data?.user;

            if (!userDetails?.email) {
                console.log('no details found');
                return false;
            }

            const session: UserSession = {
                email: userDetails.email,
                name: userDetails.name,
                token: userDetails.token,
                profile: userDetails.profile,
            };

            if (!session.token) {
                console.warn('Login did not return a token, authentication may fail');
            }

            await AsyncStorage.setItem("userSession", JSON.stringify(session));
            setUserSession(session);

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const googleLogin = async (): Promise<boolean> => {
        try {
            const result = await promptAsync();
            if (result?.type !== "success") return false;

            const accessToken = result.authentication?.accessToken;
            if (!accessToken) return false;

            const response = await signInByGoogleApi(accessToken, "User");
            const userDetails = response.data.user;

            const session: UserSession = {
                email: userDetails.email,
                name: userDetails.name,
                token: userDetails.token,
                profile: userDetails.profile,
            };

            await AsyncStorage.setItem("userSession", JSON.stringify(session));
            setUserSession(session);

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const getUser = async (): Promise<any | null> => {
        try {
            const res = await userApi();
            if (!res.data.success) throw new Error(res.data.error);
            return res.data.user;
        } catch (err) {
            if (err instanceof AxiosError) {
                const serverError = err.response?.data?.error ?? err.response?.data ?? err.message;
                if (typeof serverError === 'string' && serverError.includes("jwt expired")) {
                    throw new Error("jwt expired");
                }
            }
            console.error(err);
            return null;
        }
    };

    const signup = async (data: SignUpRequest): Promise<boolean> => {
        try {
            const res = await signUpApi(data);
            const user = res.data.user;

            const session: UserSession = {
                email: user.email,
                name: user.name,
                token: user.token,
                profile: user.profile,
            };

            if (!session.email) {
                console.log("Email missing while signup!");
                return false;
            }

            await AsyncStorage.setItem("userSession", JSON.stringify(session));
            setUserSession(session);

            return true;
        } catch (err) {
            alert(err);
            return false;
        }
    };

    const logout = async (): Promise<void> => {
        await AsyncStorage.removeItem("userSession");
        setUserSession(null);
    };

    return (
        <AuthContext.Provider value={{
            userSession,
            isAuthenticated: !!userSession,
            login,
            signup,
            logout,
            googleLogin,
            getUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};