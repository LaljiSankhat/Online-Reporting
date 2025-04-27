import { create } from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoggedIn: false,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data, isLoggedIn: true});
            
        } catch (error) {
            console.log("Error in check Auth : ", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data, isLoggedIn: true});
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
        } finally {
            set({isSigningUp: false});
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data, isLoggedIn: true});
            toast.success("Logged In successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } 
    },


    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null, isLoggedIn: false});
            toast.success("Logged out successfully !!");
            
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({authUser: res.data});
            toast.success("Profile updated successfully");
            res.status(200).json(res);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    
}))