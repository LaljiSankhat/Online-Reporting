import React, { useContext, useEffect, useState } from "react";
import { CgAsterisk } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { authUser, isLoggedIn, isCheckingAuth, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    role:"",
    email: "",
    number: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Invalid email format");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must contain 6 characters");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    
    if(success) login(formData);

  };
  return (
    <div className="w-full h-screen flex justify-center gap-20 items-center pr-10">
      <div className="left w-[90vh]  bg-cover flex items-center justify-center outline-none">
        <img className="outline-none" src="loginImage.avif" alt="" />
      </div>
      <div className="lg:w-1/4 w-full bg-[#fafafa] border border-gray-100 p-8 shadow-2xl flex flex-col">
        <h1 className="text-3xl">
          Please <span className="text-blue ">Login!</span>
        </h1>
        <div className="p-5 align-middle">
          <img className="w-1/3 h-1/3 mx-auto" src="login.png" alt="" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="w-full">
            <label className="mb-2 text-md flex">
              Role
              <span>
                <CgAsterisk className="text-red-600 text-[.5vw]" />
              </span>
            </label>
            <select className="create-job-input"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
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
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                focus:outline-none sm:text-sm sm:leading-6"
                value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="w-full relative">
            <label className="mb-2 text-md flex">
              Password
              <span>
                <CgAsterisk className="text-red-600 text-[.5vw]" />
              </span>
            </label>

            <input
              type={showPassword ? "text" : "password"}
              className={`block w-full border bg-white py-1.5 pl-3 pr-10 text-gray-900 placeholder:text-gray-400 
      focus:outline-none sm:text-sm sm:leading-6`}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button
              type="button"
              className="absolute right-3 top-3/4 -translate-y-1/2 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-4 text-gray-500" />
              ) : (
                <Eye className="size-4 text-gray-500" />
              )}
            </button>
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
            Don't have an account?{" "}
            <Link className="text-sky-800" to={"/sign-up"}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
