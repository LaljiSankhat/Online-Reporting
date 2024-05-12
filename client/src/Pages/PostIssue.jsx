import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { MdLocationPin } from "react-icons/md";
import UserContext from "../Context/UserContext";
import axios from "axios"

const PostIssue = () => {

  const [files, setFiles] = useState(null);
  
  const {isLoggedIn, setIsLoggedIn,currentUser, setCurrentUser} = useContext(UserContext);

  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  const mail = currentUser.email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('file', files);
    // data['file'] = files;
    // data.append("file", files);
    
    // data.file = files;
    // console.log(data);
    // const formData = new FormData();
    // formData.append("file", data.file[0]); // Use e.target.files[0] to get the file
    // data.file = data.

    // Append other form data fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "file") {
        formData.append(key, value);
      }
    });
    // fetch(`http://localhost:5000/post-issue/${mail}`,{
    //   method: "POST",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify(data),
    //   // body: data,
    // }).then((res) => res.json()).then((result) => {
    //     console.log(result);
    //     if (result.posted === true) {
    //       alert("report submitted successfully");
    //     } else {
    //       alert("error occure")
    //     }
    //     reset();
    //   });
    axios.post(`http://localhost:5000/post-issue/${mail}`, formData)
    .then((result) => {
      console.log(result);
        if (result.data.posted === true) {
          alert("report submitted successfully");
          reset();
        } else {
          alert("error occure")
        }
    })
    .catch((e) => {
      console.log(e)
    })
    
  };
  return (
    <div className="px-56 py-32">
      <div className="bg-[#FAFAFA] px-10 py-10 rounded-sm shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" encType="multipart/form-data">
          {/* First row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg flex">
                Name
                <span>
                  <CgAsterisk className="text-red-600" />
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                defaultValue={currentUser.name}
                // defaultValue={"Web Developer"}
                {...register("name", { required: true })}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg flex">
                Mobile Number
                <span>
                  <CgAsterisk className="text-red-600" />
                </span>
              </label>
              <input
                type="number"
                placeholder="1234567890"
                defaultValue={currentUser.number}
                // defaultValue={number}
                // onChange={(e) => {setNumber(e.target.value); console.log(number)}}
                {...register("number", { required: true })}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Third row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg flex">
                Email
                <span>
                  <CgAsterisk className="text-red-600" />
                </span>
              </label>
              <input
                type="email"
                placeholder="abc@gmail.com"
                defaultValue={currentUser.email}
                {...register("email", { required: true })}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg flex">
                Posting Date
                <span>
                  <CgAsterisk className="text-red-600" />
                </span>
              </label>
              <input
                type="text"
                // placeholder="Ex: 2024-02-21"
                defaultValue={d + "/" + m + "/" + y}
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* Fourth row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg flex">
                Category
                <span>
                  <CgAsterisk className="text-red-600" />
                </span>
              </label>
              <select
                {...register("category", { required: true })}
                className="create-job-input"
              >
                <option value="">Select Category</option>
                <option value="patholes">Patholes</option>
                <option value="waste">Waste</option>
                <option value="water">Water</option>
              </select>
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg flex">
                City
                <span>
                  <CgAsterisk className="text-red-600" />
                </span>
              </label>
              <input
                type="text"
                placeholder="Ex: Bhavnagar"
                {...register("city", { required: true })}
                className="create-job-input"
              />
            </div>
          </div>

          <div className="w-full">
            <label className=" mb-2 text-lg flex">
              Location
              <span>
                <CgAsterisk className="text-red-600" />
              </span>
            </label>
            <div className="flex create-job-input justify-between">
              <input
                type="text"
                placeholder="enter location of problem"
                {...register("location", { required: true })}
                className="mr-1 w-full outline-none"
              />
              <div className="">
                <button className="mr-2 flex items-center gap-1">
                  <MdLocationPin />
                  Location
                </button>
              </div>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg ">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="w-full pl-3 py-1.5 focus:outline-none "
              rows={6}
              defaultValue={""}
              placeholder="give some details about issue."
            />
          </div>

          <input
            type="file"
            name="file"
            onChange={(e) => {
              setFiles(e.target.files[0]);              
            }}
            // placeholder="Choose Photo"
            // {...register("file", { required: true })}
            className="create-job-input"
          />

          <input
            className="block mt-12 bg-blue text-white text-semibold px-8 py-2 rounded-sm cursor-pointer"
            type="submit"
          />
        </form>
      </div>
    </div>
    // <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
    //   <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">

    //   </div>
    // </div>
  );
};

export default PostIssue;
