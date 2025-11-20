'use client';
import { signInApi, signInByGoogleApi, signUpApi, userApi } from "@/apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { SignInRequest, SignUpRequest, UserSession } from "@/types/type";
import * as AuthSession from "expo-auth-session";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

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
            console.log(stored);
            if (stored) setUserSession(JSON.parse(stored));
        })();
    }, []);

    const login = async (data: SignInRequest): Promise<boolean> => {
        try {
            const res = await signInApi(data);
            const { userDetails } = res.data.user;

            await AsyncStorage.setItem("userSession", JSON.stringify(userDetails));
            setUserSession(userDetails);

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
            const { userDetails } = response.data;

            await AsyncStorage.setItem("userSession", JSON.stringify(userDetails));
            setUserSession(userDetails);

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
            if (err instanceof AxiosError && err.response?.data.error.includes("jwt expired")) {
                throw new Error("jwt expired");
            }
            console.error(err);
            return null;
        }
    };

    const signup = async (data: SignUpRequest): Promise<boolean> => {
        try {
            const res = await signUpApi(data);
            const user = res.data?.user;

            if (!user?.email) {
                console.log("Email missing while signup!");
                return false;
            }

            await AsyncStorage.setItem("userSession", JSON.stringify(user));
            setUserSession(user);

            return true;
        } catch (err) {
            console.error(err);
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