import React, { useEffect, useState } from "react";
import { useReportStore } from "../../store/useReportStore";
import { CgAsterisk } from "react-icons/cg";
import { CircleX } from "lucide-react";
import { set } from "mongoose";

const AllFeedbacks = () => {
  const { getAllFeedbacks, feedbacks } = useReportStore();
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedFeedback, setClickedFeedback] = useState(null);
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  useEffect(() => {
    // setIsLoading(true);
    getAllFeedbacks();
    setAllFeedbacks(feedbacks);
    setIsLoading(false);
  }, [getAllFeedbacks]);

  return (
    <div className="w-full h-screen">
      <div className="border border-black pt-20 pb-5 px-20 h-full flex gap-2">
        {isLoading ? (
          <div>Loding...</div>
        ) : (
          <div className="gap-2 w-full flex p-2 rounded-md overflow-y-scroll scrollbar-hide shadow-lg border h-full">
            <div
              className={`left space-y-1 overflow-y-scroll scrollbar-hide ${
                isClicked ? "w-1/2 pr-2 border-r-2" : "w-full"
              } h-full`}
            >
              {allFeedbacks.map((feedback, ind) => (
                <div 
                onClick={() => {
                  setIsClicked(!isClicked)
                  setClickedFeedback(feedback)
              }} className="flex flex-col gap-2 bg-gray-100 rounded-lg p-4">
                  <div className="flex justify justify-between">
                    <div className="flex gap-2">
                      <div className="size-6 text-center rounded-full bg-red-300">
                        {feedback.fullName.toUpperCase().charAt(0)}
                      </div>
                      <span>{feedback.fullName}</span>
                    </div>
                  </div>
                  <div className="flex flex-row text-sm gap-2 justify-between">
                    <span>Satisfaction : {feedback.overallSatisfaction}</span>
                    <span>Response Time : {feedback.responseTime}</span>
                    <span>Quality : {feedback.qualityOfWork}</span>
                    <span>communication : {feedback.communication}</span>
                    <span>Experiance : {feedback.userExperience}</span>
                  </div>

                  <div className="overflow-hidden h-6">
                    {feedback.suggestion} ...
                  </div>
                </div>
              ))}
            </div>

            {isClicked && (
              <div className="right relative right rounded-md p-10 w-1/2 h-full font-semibold">
                <button
                  onClick={() => {
                    setIsClicked(!isClicked); // Close the report details
                  }}
                  className="absolute top-3 right-4 text-gray-500 hover:text-black"
                >
                  <CircleX className="size-5" />
                </button>
                <div className="flex flex-col justify-between space-y-1">
                  <h1>
                    <span className="text-blue">Name</span>: {clickedFeedback.fullName}
                  </h1>
                  <h1>
                    <span className="text-blue">Number</span>: {clickedFeedback.number}
                  </h1>
                  <h1>
                    <span className="text-blue">Satisfaction</span> : {clickedFeedback.overallSatisfaction}
                  </h1>
                  <h1>
                    <span className="text-blue">Response Time</span> : {clickedFeedback.responseTime}
                  </h1>
                  <h1>
                    <span className="text-blue">Quality</span> : {clickedFeedback.qualityOfWork}
                  </h1>
                  <h1>
                    <span className="text-blue">Communication</span> : {clickedFeedback.communication}
                  </h1>
                  <h1>
                    <span className="text-blue">Experiance</span> : {clickedFeedback.userExperience}
                  </h1>
                </div>

                <div className="mt-2  ">
                  <h1 className="text-blue">Feedback description : </h1>
                  <h1 className="h-72 overflow-y-scroll scrollbar-hide">
                    {clickedFeedback.suggestion}
                  </h1>
                </div>
              </div>
            )}
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default AllFeedbacks;
