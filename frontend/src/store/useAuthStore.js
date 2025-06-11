import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in check auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (dataOfTheForm) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/sign-in", dataOfTheForm);
      set({ authUser: res.data });
      toast.success("SignIn successfully ");
    } catch (error) {
      console.log("Error while login", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  login: async (dataOfTheForm) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/sign-up", dataOfTheForm);
      set({ authUser: res.data });
      toast.success("Account created successfully ");
    } catch (error) {
      console.log("Error in check auth", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out");
    } catch (error) {
      console.log("Error while logout", error);
      toast.error("Error while logout");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update", data);
      set({ authUser: res.data });
      toast.success("Profile updated sucessfully");
    } catch (error) {
      console.log("Error while updating the avatar", error);
      toast.error("Error while updating the avatar");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
