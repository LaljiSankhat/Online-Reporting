import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useReportStore } from "../store/useReportStore";
import toast from "react-hot-toast";

const FeedbackPage = () => {
  const { authUser } = useAuthStore();
  const { postFeedback } = useReportStore();

  const [formData, setFormData] = useState({
    overallSatisfaction: "",
    responseTime: "",
    qualityOfWork: "",
    communication: "",
    userExperience: "",
    suggestion: "",
    userId: authUser._id,
    fullName: authUser.fullName,
    number: authUser.number,
    email: authUser.email,
  });

  const validateForm = () => {
    if (
      !formData.overallSatisfaction ||
      !formData.responseTime ||
      !formData.qualityOfWork ||
      !formData.communication ||
      !formData.userExperience ||
      !formData.suggestion
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    console.log(success);

    if (success) {
      console.log(formData);
      const res = postFeedback(formData);
      console.log(res);

      toast.success("Feedback submitted successfully");
      setFormData({
        overallSatisfaction: "",
        responseTime: "",
        qualityOfWork: "",
        communication: "",
        userExperience: "",
        suggestion: "",
        userId: authUser._id,
        fullName: authUser.fullName,
        number: authUser.number,
        email: authUser.email,
      });
    }
  };
  return (
    <>
      <div className="px-56 py-28">
        <div className="bg-[#FAFAFA] border border-gray-200 rounded-lg px-10 py-5 shadow-xl">
          <h1 className="text-center text-4xl font-bold mb-8 mt-2">
            Give Your <span className="text-blue">Feedback</span>
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Fourth row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className=" mb-2 text-lg flex">
                  Overall Satisfaction
                </label>
                <select
                  className="create-job-input"
                  value={formData.overallSatisfaction}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      overallSatisfaction: e.target.value,
                    })
                  }
                >
                  <option value="">Select</option>
                  <option value="verySatisfied">Very Satisfied</option>
                  <option value="satisfied">Satisfied</option>
                  <option value="normal">Normal</option>
                  <option value="dissatisfied">Dissatisfied</option>
                  <option value="veryDissatisfied">Very Dissatisfied</option>
                </select>
              </div>
              <div className="lg:w-1/2 w-full">
                <label className=" mb-2 text-lg flex">Response Time</label>
                <select
                  value={formData.responseTime}
                  onChange={(e) =>
                    setFormData({ ...formData, responseTime: e.target.value })
                  }
                  className="create-job-input"
                >
                  <option value="">Select</option>
                  <option value="veryPrompt">Very prompt</option>
                  <option value="prompt">prompt</option>
                  <option value="average">average</option>
                  <option value="slow">slow</option>
                  <option value="verySlow">Very slow</option>
                </select>
              </div>
            </div>

            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className=" mb-2 text-lg flex">Quality of Work</label>
                <select
                  value={formData.qualityOfWork}
                  onChange={(e) =>
                    setFormData({ ...formData, qualityOfWork: e.target.value })
                  }
                  className="create-job-input"
                >
                  <option value="">Select</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                  <option value="veryPoor">Very poor</option>
                </select>
              </div>
              <div className="lg:w-1/2 w-full">
                <label className=" mb-2 text-lg flex">Communication</label>
                <select
                  value={formData.communication}
                  onChange={(e) =>
                    setFormData({ ...formData, communication: e.target.value })
                  }
                  className="create-job-input"
                >
                  <option value="">Select</option>
                  <option value="clearAndHelpful">Clear and helpful</option>
                  <option value="somewhatClear">Somewhat clear</option>
                  <option value="normal">Normal</option>
                  <option value="unclear">Unclear</option>
                  <option value="veryUnclear">Very unclear</option>
                </select>
              </div>
            </div>
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg">User Experience</label>
                <select
                  value={formData.userExperience}
                  onChange={(e) =>
                    setFormData({ ...formData, userExperience: e.target.value })
                  }
                  className="create-job-input"
                >
                  <option value="">Select</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                  <option value="veryPoor">Very poor</option>
                </select>
              </div>
            </div>

            {/* 7th row */}
            <div className="w-full">
              <label className="block mb-2 text-lg ">
                Suggestion For Improvement
              </label>
              <textarea
                value={formData.suggestion}
                onChange={(e) =>
                  setFormData({ ...formData, suggestion: e.target.value })
                }
                className="w-full pl-3 py-1.5 focus:outline-none "
                rows={6}
                placeholder="give some suggestions for improvement"
              />
            </div>

            <input
              className="block mt-12 bg-blue text-white text-semibold px-8 py-2 rounded-sm cursor-pointer"
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
