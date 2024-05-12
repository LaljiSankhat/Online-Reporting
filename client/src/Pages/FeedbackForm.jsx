import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import UserContext from "../Context/UserContext";

const FeedbackForm = () => {
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } =
    useContext(UserContext);
  const mail = currentUser.email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.user = currentUser._id;
    data.name = currentUser.name;
    data.number = currentUser.number;
    data.email = currentUser.email;
    fetch(`http://localhost:5000/post-feedback/${mail}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.posted === true) {
          alert("Feedback submited successfully");
          reset();
        } else {
          alert("some error occure");
        }
      });
  };
  return (
    <>
      <div className="px-56 py-28">
        <div className="bg-[#eacaca2b] px-10 py-5 rounded-md shadow-xl">
          <h1 className="text-center text-4xl font-bold mb-8 mt-2">
            Give Your <span className="text-blue">Feedback</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Fourth row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg flex">
                  Overall Satisfaction
                </label>
                <select
                  {...register("satisfaction")}
                  className="create-job-input"
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
                <label className="block mb-2 text-lg flex">Response Time</label>
                <select {...register("time")} className="create-job-input">
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
                <label className="block mb-2 text-lg flex">
                  Quality of Work
                </label>
                <select {...register("work")} className="create-job-input">
                  <option value="">Select</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                  <option value="veryPoor">Very poor</option>
                </select>
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg flex">Communication</label>
                <select
                  {...register("communication")}
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
                <label className="block mb-2 text-lg flex">
                  User Experience
                </label>
                <select
                  {...register("userExperience")}
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
                {...register("suggestion", { required: true })}
                className="w-full pl-3 py-1.5 focus:outline-none "
                rows={6}
                defaultValue={""}
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

export default FeedbackForm;
