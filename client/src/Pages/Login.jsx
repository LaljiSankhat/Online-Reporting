import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
// import { Link, useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } = useContext(UserContext);
  // const h = useHistory();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    // console.log(e)
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(e),
    }).then((res) => res.json()).then((data) => {
      console.log(data);
      if(data.userFound === true){
        alert("Login Successfull!!");
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        console.log(isLoggedIn);
        console.log(currentUser);
        console.log(currentUser.email);
        navigate("/");
      } else {
        alert("Improper details");
        navigate("/login");
      }
      
    });
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
        
      <div className="lg:w-1/4 w-full bg-[#fafafa] border border-gray-100 p-8 shadow-2xl flex flex-col">
        <h1 className="text-3xl">
          Please <span className="text-blue ">Login!</span>
        </h1>
        <div className="p-8 align-middle">
          <img className="w-1/3 h-1/3 mx-auto" src="login.png" alt="" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} >
          <div className="w-full">
            <label className="mb-2 text-md flex">
              Role
              <span>
                <CgAsterisk className="text-red-600 text-[.5vw]" />
              </span>
            </label>
            <select
              {...register("role", { required: true })}
              className="create-job-input"
            >
              <option value="">Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="w-full">
            <label className=" mb-2 text-md flex">
              Email
              <span>
                <CgAsterisk className="text-red-600 text-[.5vw]" />
              </span>
            </label>
            <input
              type="email"
              placeholder="abc@mail.com"
              // defaultValue={"Web Developer"}
              {...register("email", { required: true })}
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                focus:outline-none sm:text-sm sm:leading-6"
            />
          </div>

          <div className="w-full">
            <label className=" mb-2 text-md flex">
              Password
              <span>
                <CgAsterisk className="text-red-600 text-[.5vw]" />
              </span>
            </label>
            <input
              type="password"
              placeholder="password"
              // defaultValue={"Web Developer"}
              {...register("password", { required: true })}
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                focus:outline-none sm:text-sm sm:leading-6"
            />
          </div>

          <div className="flex items-center mt-5 justify-between p-1">
            <button className="block bg-blue text-white text-[.9vw] text-semibold px-6 py-2 rounded-sm cursor-pointer">
              Login
            </button>
            <Link to={"/forgot-password"}>
              <h1 className="font-semibold">Forgot Password?</h1>
            </Link>
          </div>

          <div className="text-center text-[.8vw] ">
            Don't have an account? <Link className="text-sky-800" to={"/sign-up"}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
