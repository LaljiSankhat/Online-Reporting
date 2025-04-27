import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Leftbar from "../components/Leftbar";
import { CgAsterisk } from "react-icons/cg";
import MyIssueCard from "../components/MyIssueCard";
import { useReportStore } from "../store/useReportStore";

const MyReportsPage = () => {
    const { authUser, updateProfile } = useAuthStore();
    const {myReports, myFeedbacks, getMyReports, getMyFeedbacks} = useReportStore();


    const [formData, setFormData] = useState({
      fullName: authUser.fullName,
      number: authUser.number,
      email: authUser.email,
      city: authUser.city,
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const res = updateProfile(formData);
      console.log(res)
    };

    useEffect(() => {
      console.log(authUser._id)
      // let id = 67ab767bf40db99471e70302
      const res = getMyReports(authUser._id);
      const res2 = getMyFeedbacks(authUser._id);
      console.log(myReports);
      console.log(myFeedbacks);
      console.log(res);
    }, []);
    return (
      <div className="w-full h-screen pt-10">
        <div className=" w-full h-full  p-10 flex gap-5">
          <Leftbar />
          <div className="right w-4/5">
            <div className="left h-full w-full border border-gray-300 space-y-7 rounded-lg shadow-lg">
              <div className="m-5 p-3 ">
                <h1 className="text-3xl font-semibold mb-5">
                  My <span className="text-blue">Reports</span>
                </h1>
                <div className="flex gap-20">
                  <MyIssueCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default MyReportsPage
