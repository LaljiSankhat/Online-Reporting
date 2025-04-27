import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const IssueReport = () => {
  const { isLoggedIn, authUser } = useAuthStore();
  return (
    <div className="w-full h-screen flex lg:flex-row flex-col">
      <div className="left w-1/2 h-screen">
        <div className="py-20 px-24">
          <h1 className="text-5xl font-bold mb-16 ">
            Report An <span className="text-blue">Issue</span>
          </h1>
          <h2 className="text-xl text-start leading-7 font-semibold mb-10 ">
            "Report Issues Seamlessly: Our platform empowers you to easily flag
            and document urban challenges. Snap photos or videos, pinpointing
            details crucial for resolution. Find contact information for
            responsible authorities swiftly, ensuring your concerns are heard
            and addressed effectively. Join us in fostering a proactive approach
            to enhancing our community's well-being, one issue at a time."
          </h2>
          <h1 className="font-semibold text-[1.1vw]">
            Be a part To foster a more productive, safe, and resilient
            cityscape...
          </h1>

          {isLoggedIn && authUser.role === "user" &&
            (isLoggedIn === 1 ? (
              <Link to={"/post-issue"}>
                <button className="py-2 px-4 mt-10 bg-blue text-white rounded-lg font-semibold">
                  Report An Issue
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="py-2 px-4 mt-10 bg-blue text-white rounded-lg font-semibold">
                  Report An Issue
                </button>
              </Link>
            ))}
        </div>
      </div>
      <div className="right w-1/2 h-screen px-10 py-2 flex items-center justify-center">
        <div className=" w-3/4 h-3/4">
          <img
            src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-report_516790-639.jpg?w=740"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default IssueReport;
