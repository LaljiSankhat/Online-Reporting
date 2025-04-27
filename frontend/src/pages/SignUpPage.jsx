import React, { useState } from "react";
import { CgAsterisk } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const { authUser, isLoggedIn, isCheckingAuth, signup } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
    password: "",
  });

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.number ||
      !formData.password
    ) {
      return toast.error("All fields are required");
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Invalid email format");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must contain 6 characters");
    }
    if (formData.number.length !== 10 || !/^\d{10}$/.test(formData.number)) {
      return toast.error("Invalid mobile number format");
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if(success) signup(formData);
  };

  return (
    <div className="w-full h-screen flex justify-center gap-20 items-center pr-10">
      <div className="left w-[90vh]  bg-cover flex items-center justify-center outline-none">
        <img className="outline-none" src="signup.avif" alt="" />
      </div>
      <div className="right rounded-lg lg:w-1/4 w-full bg-[#fafafaed] border border-gray-200 p-8 shadow-2xl flex flex-col">
        <h1 className="text-3xl mb-5">
          Register <span className="text-blue ">Here!</span>
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* <div className="w-full">
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
              </div> */}

          <div className="w-full">
            <label className=" mb-2 text-md flex">
              Name
              <span>
                <CgAsterisk className="text-red-600 text-[.5vw]" />
              </span>
            </label>
            <input
              type="name"
              placeholder="Enter your name.."
              // defaultValue={"Web Developer"}
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                    focus:outline-none sm:text-sm sm:leading-6"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>

          <div className="w-full">
            <label className=" mb-2 text-md flex">
              Mobile No.
              <span>
                <CgAsterisk className="text-red-600 text-[.5vw]" />
              </span>
            </label>
            <input
              type="number"
              placeholder="1234567890"
              // defaultValue={"Web Developer"}
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                    focus:outline-none sm:text-sm sm:leading-6"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
            />
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
              className={`block w-full border-1 bg-white py-1.5 pl-3 pr-10 text-gray-900 placeholder:text-gray-400 
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
            <button className="mx-auto block bg-blue text-white text-[.9vw] text-semibold px-6 py-2 rounded-sm cursor-pointer">
              Register
            </button>
          </div>

          <div className="text-center text-[.8vw] ">
            Already have an account?{" "}
            <Link className="text-sky-800" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
