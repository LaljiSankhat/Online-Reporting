import React, { useContext, useState } from "react";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } =
    useContext(UserContext);
  const [Email, setEmail] = useState("");
  const [emailSended, setEmailSended] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [number, setNumber] = useState(0);
  const [pass, setPass] = useState(0);
  const [rePass, setRePass] = useState(0);
  const [OTP, setOTP] = useState(0);
  console.log(Email);
  console.log(number);
  console.log(pass);
  console.log(rePass);

  const navigate = useNavigate();

  const handleOtp = () => {
    fetch(`http://localhost:5000/forgot-password/generate-otp/${Email}`)
    .then((res) => res.json())
    .then((data) => {
      if(data.send === true){
        alert("otp mailed successfully in this email address!!");
        setEmailSended(true);
        setOTP(data.otp);
      } else {
        alert(data.error);
      }
    })
  }
  
  
  const handleVerifyOtp = () => {
    if(OTP === number) {
      alert("otp verified successfully!!");
      setIsVerified(true);
    } else {
      alert("wrong OTP!!");
    }
  }

  const handlePasswordChange = () => {
    if(pass !== rePass){
      alert("password doesn't match");
    } else {
      fetch(`http://localhost:5000/change-password/${Email}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: pass }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.update === true){
          alert("Password changed successfully!!");
          setCurrentUser(data.updatedUser); 
          navigate("/login");         
        } else {
          alert(data.error);
        }
      });
    }

  }

   
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="lg:w-1/4 p-10 w-full border">
        <h1 className="text-3xl font-semibold">
          Reset <span className="text-blue">Password</span>
        </h1>
        {
          emailSended ? ( isVerified ? (<div className="mt-10 space-y-4">
            <div className="w-full ">
            <label className=" mb-2 text-md flex">Enter new Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
              className="block w-full rounded flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="w-full ">
            <label className=" mb-2 text-md flex">Re Enter new Password</label>
            <input
              type="password"
              name="re-password"
              placeholder="password"
              onChange={(e) => {
                setRePass(e.target.value);
              }}
              className="block w-full rounded flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                 sm:text-sm sm:leading-6"
            />
          </div>
          <button onClick={handlePasswordChange} className="block bg-blue text-white text-[.9vw] text-semibold px-6 py-2 rounded cursor-pointer">
              Change Password
            </button>
          </div>) : (<div className="mt-10 space-y-4">
          <div className="w-full ">
            <label className=" mb-2 text-md flex">Verify OTP</label>
            <input
              type="number"
              name="number"
              placeholder="Enter 6 digit otp"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              className="block w-full rounded flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                 sm:text-sm sm:leading-6"
            />
          </div>
          <button onClick={handleVerifyOtp} className="block bg-blue text-white text-[.9vw] text-semibold px-6 py-2 rounded cursor-pointer">
              Verify
            </button>
        </div>)
          ) : (<div className="mt-10 space-y-4">
          <div className="w-full ">
            <label className=" mb-2 text-md flex">Email</label>
            <input
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="block w-full rounded flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                 sm:text-sm sm:leading-6"
            />
          </div>
          <button onClick={handleOtp} className="block bg-blue text-white text-[.9vw] text-semibold px-6 py-2 rounded cursor-pointer">
              Generate OTP
            </button>
        </div>)
        }
        
      </div>
    </div>
  );
};

export default ForgotPassword;
