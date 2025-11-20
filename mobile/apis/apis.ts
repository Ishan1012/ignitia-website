import { SignInRequest, SignUpRequest } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI || "http://172.16.6.168:5000/api/v1";

const api = axios.create({ baseURL });

api.interceptors.request.use(
  async (config) => {
    const userSession = await AsyncStorage.getItem("userSession");

    const excludedPaths = ['/auth/signin', '/auth/signup', '/auth/signin/google'];

    const shouldExclude = excludedPaths.some(path =>
      config.url?.includes(path)
    );

    if (!shouldExclude && userSession) {
      const token = JSON.parse(userSession).token;

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const signInApi = (signInRequest: SignInRequest) => api.post('/auth/signin', signInRequest);

export const signUpApi = (signUpRequest: SignUpRequest) => api.post('/auth/signup', signUpRequest);

export const signInByGoogleApi = (code: string, role: string) => api.post('/auth/signin/google', { code, role }, { headers: { 'Content-Type': 'application/json' } });

export const userApi = () => api.get('/auth/me');