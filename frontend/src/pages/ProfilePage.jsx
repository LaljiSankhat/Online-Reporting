import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Leftbar from "../components/Leftbar";
import { CgAsterisk } from "react-icons/cg";


const ProfilePage = () => {
  const { authUser, updateProfile } = useAuthStore();


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
  return (
    <div className="w-full h-screen pt-10">
      <div className=" w-full h-full  p-10 flex gap-5">
        <Leftbar />
        <div className="right w-4/5">
          <div className="left h-full w-full border border-gray-300 space-y-7 rounded-lg shadow-lg">
            <div className="m-5 p-3 ">
              <h1 className="text-3xl font-semibold mb-5">
                Account <span className="text-blue">Settings</span>
              </h1>
              <div className="flex gap-20">
                <div className=" w-1/2 px-10 py-10 rounded-sm">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    encType="multipart/form-data"
                  >
                    {/* First row */}
                    <div className="create-job-flex">
                      <div className=" w-full">
                        <label className=" mb-2 text-lg flex">
                          Name
                          <span>
                            <CgAsterisk className="text-red-600 text-xs" />
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Your Name"
                          value={formData.fullName}
                            onChange={(e) =>setFormData({...formData, fullName: e.target.value})}
                          className="block w-full flex-1 border border-grya-200 outline-5 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                    focus:outline-none sm:text-sm sm:leading-6 focus:bg-[#FAFAFA] rounded-md"
                        />
                      </div>
                    </div>
                    <div className="create-job-flex">
                      <div className="w-full">
                        <label className=" mb-2 text-lg flex">
                          Mobile Number
                          <span>
                            <CgAsterisk className="text-red-600 text-xs" />
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="1234567890"
                            value={formData.number}
                                onChange={(e) =>setFormData({...formData, number: e.target.value})}
                          className="block w-full flex-1 border border-grya-200  py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                    focus:outline-none sm:text-sm sm:leading-6 focus:bg-[#FAFAFA] rounded-md"
                        />
                      </div>
                    </div>

                    {/* Third row */}
                    <div className="create-job-flex">
                      <div className=" w-full">
                        <label className=" mb-2 text-lg flex">
                          Email
                          <span>
                            <CgAsterisk className="text-red-600 text-xs" />
                          </span>
                        </label>
                        <input
                          type="email"
                          placeholder="abc@gmail.com"
                            value={formData.email}
                                onChange={(e) =>setFormData({...formData, email: e.target.value})}
                          className="block w-full flex-1 border border-grya-200  py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                            focus:outline-none sm:text-sm sm:leading-6 focus:bg-[#FAFAFA] rounded-md"
                        />
                      </div>
                    </div>

                    {/* Fourth row */}
                    <div className="create-job-flex">
                      <div className=" w-full">
                        <label className=" mb-2 text-lg flex">
                          City
                          <span>
                            <CgAsterisk className="text-red-600 text-xs" />
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Bhavnagar"
                            value={formData.city}
                                onChange={(e) =>setFormData({...formData, city: e.target.value})}
                          className="block w-full flex-1 border border-grya-200  py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                            focus:outline-none sm:text-sm sm:leading-6 focus:bg-[#FAFAFA] rounded-md"
                        />
                      </div>
                    </div>
                    <button className="block bg-blue text-white text-[1vw] text-bold px-6 py-2 rounded-sm cursor-pointer">
                      Update
                    </button>
                  </form>
                </div>
                <div className="size-96 h-full bg-center bg-cover overflow-hidden">
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

export default ProfilePage;
