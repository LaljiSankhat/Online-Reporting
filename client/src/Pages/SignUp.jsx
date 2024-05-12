import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
// import { useHistory } from "react-router-dom";

const SignUp = () => {
  const {isLoggedIn, setIsLoggedIn,currentUser, setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();


  // const history = useHist
  // const history = useHistory();
  const onSubmit = async (e) => {
    // window.location.href = "/"
    console.log(e)
    fetch("http://localhost:5000/sign-up", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(e),
    }).then((res) => res.json()).then((data) => {
      console.log(data);
      if(data.userFound === true){
        alert("user already exist please sign in");
        // window.location.href = "/login"
        navigate("/login")
      } else {
        alert("new user has been registered");
        // toggleIsLoggedIn();
        setIsLoggedIn(true);
        setCurrentUser(data.newUser);
        console.log(currentUser.email);
        // window.location.href = "/"
        navigate("/");
      }
      
    });
    
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <div className="w-full h-screen flex justify-center gap-20 items-center pr-10">
      <div className="left w-[90vh]  bg-cover flex items-center justify-center outline-none">
        <img className="outline-none" src="signup.avif" alt="" />
      </div>
      <div className="right lg:w-1/4 w-full bg-[#fafafaed] border border-gray-100 p-8 shadow-2xl flex flex-col">
        <h1 className="text-3xl mb-5">
          Register <span className="text-blue ">Here!</span>
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              {...register("name", { required: true })}
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                focus:outline-none sm:text-sm sm:leading-6"
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
              type="name"
              placeholder="1234567890"
              // defaultValue={"Web Developer"}
              {...register("number", { required: true })}
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                focus:outline-none sm:text-sm sm:leading-6"
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

export default SignUp;
