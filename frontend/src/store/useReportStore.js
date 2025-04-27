import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
// import mongoose from "mongoose";

export const useReportStore = create((set, get) => ({
  allReports: [],
  feedbacks:  [],
  myFeedbacks: [],
  myReports: [],
  reportAnIssue: async (data) => {
    try {
        const res = await axiosInstance.post("/report/post-issue", data);
        console.log(res);
    } catch (error) {
        toast.error(error.response.data.message);
    }
  },
  postFeedback: async (data) => {
    try {
        const res = await axiosInstance.post("/report/post-feedback", data);
        console.log(res);
        // res.status(201).json(res);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
  },
  getAllIssues: async () => {
    try {
        const res = await axiosInstance.get("/report/all-issues");
        console.log(res);
        set({allReports: res.data});
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
  },

  setAsCompleted: async (id) => {
    try {
        const res = await axiosInstance.put(`/report/set-completed/${id}`);
        console.log(res);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
  },


  getAllFeedbacks: async () => {
    try {
        const res = await axiosInstance.get("/report/all-feedbacks");
        console.log(res);
        set({feedbacks: res.data});
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
  },

  getMyFeedbacks: async (id) => {
    try {
      const res = await axiosInstance.get(`/report/my-feedbacks/${id}`);
      set({myFeedbacks: res.data});
      return res;
    } catch (error) {
      toast.error(error.message.data.message);
    }
  },

  getMyReports: async (id) => {
    try {
      const res = await axiosInstance.get(`/report/my-reports/${id}`);
      set({myReports: res.data});
      return res;
    } catch (error) {
      toast.error(error.message.data.message);
    }
  },
}));
