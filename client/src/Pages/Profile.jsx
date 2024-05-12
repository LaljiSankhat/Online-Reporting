import React, { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import LeftBar from "../Sidebars/LeftBar";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";

const Profile = () => {
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } =
    useContext(UserContext);
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {

    fetch(`http://localhost:5000/update-account/${currentUser.email}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if(data.update === true){
            alert("User details are updated successfully !!")
            setCurrentUser(data.updatedUser);
            console.log(data.updatedUser);
            // navigate("/login");
        } else if(data.update === false) {
            alert(data.massage);
        }
    })
    
  };
  
  return (
    <div className="w-full h-screen">
      <div className="border w-full h-full border-black  p-4 flex gap-5">
        <LeftBar />
        <div className="right w-4/5">
          <div className="left h-full w-full border-2 border-gray-300 space-y-7 rounded-2xl shadow-xl">
            <div className="m-5 p-3 ">
              <h1 className="text-3xl font-semibold mb-10">
                Account <span className="text-blue">Setting</span>
              </h1>
              <div className="flex gap-20">
              <div className=" w-1/2 px-10 py-10 rounded-sm">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  encType="multipart/form-data"
                >
                  {/* First row */}
                  <div className="create-job-flex">
                    <div className=" w-full">
                      <label className="block mb-2 text-lg flex">
                        Name
                        <span>
                          <CgAsterisk className="text-red-600 text-xs" />
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Your Name"
                        defaultValue={currentUser.name}
                        // defaultValue={"Web Developer"}
                        {...register("name", { required: true })}
                        className="block w-full flex-1 border-1 outline-5 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                focus:outline-none sm:text-sm sm:leading-6 focus:bg-[#FAFAFA] rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="create-job-flex">
                    <div className="w-full">
                      <label className="block mb-2 text-lg flex">
                        Mobile Number
                        <span>
                          <CgAsterisk className="text-red-600 text-xs" />
                        </span>
                      </label>
                      <input
                        type="number"
                        placeholder="1234567890"
                        defaultValue={currentUser.number}
                        // defaultValue={number}
                        // onChange={(e) => {setNumber(e.target.value); console.log(number)}}
                        {...register("number", { required: true })}
                        className="block w-full flex-1 border-1  py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                focus:outline-none sm:text-sm sm:leading-6 focus:bg-[#FAFAFA] rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Third row */}
                  <div className="create-job-flex">
                    <div className=" w-full">
                      <label className="block mb-2 text-lg flex">
                        Email
                        <span>
                          <CgAsterisk className="text-red-600 text-xs" />
                        </span>
                      </label>
                      <input
                        type="email"
                        placeholder="abc@gmail.com"
                        defaultValue={currentUser.email}
                        {...register("email", { required: true })}
                        className="block w-full flex-1 border-1  py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                        focus:outline-none sm:text-sm sm:leading-6 focus:bg-[#FAFAFA] rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Fourth row */}
                  <div className="create-job-flex">
                    <div className=" w-full">
                      <label className="block mb-2 text-lg flex">
                        City
                        <span>
                          <CgAsterisk className="text-red-600 text-xs" />
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Bhavnagar"
                        defaultValue={currentUser.city}
                        {...register("city", { required: true })}
                        className="block w-full flex-1 border-1  py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                        focus:outline-none sm:text-sm sm:leading-6 focus:bg-[#FAFAFA] rounded-lg"
                      />
                    </div>
                  </div>
                  <button className="block bg-blue text-white text-[1vw] text-bold px-6 py-2 rounded-sm cursor-pointer">
                    Update
                    </button>
                </form>
              </div>
              <div className="w-1/2 h-full bg-center bg-cover overflow-hidden">
                <img src="account.avif" alt="" />
              </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
