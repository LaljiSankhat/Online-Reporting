import React, { useContext } from "react";
import UserContext from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const LeftBar = ({user}) => {
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } =
    useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        fetch("http://localhost:5000/logout", {
          method: "POST",
          headers: { "content-type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => {
          if(data.error){
            alert("Error occure while logout", data.error);
          } else {
            alert("logout successfull");
            console.log(isLoggedIn)
            // toggleIsLoggedIn(2);
            setCurrentUser({});
            setIsLoggedIn(false);
            console.log(isLoggedIn)
            navigate("/");
          }
        });
    }
    const options = [
        {title: "Home", path: "/"},
        { title: "Account", path: "/profile" },
        { title: "My Complaints", path: "/my-complaints" },
        { title: "My Feedbacks", path: "/my-feedbacks" },
        { title: "Reset Password", path: "/forgot-password" },
      ];
  return (
    <div className="left h-full w-1/5 border-2 border-gray-300 space-y-7 rounded-2xl shadow-2xl">
      <div className="img mt-8 w-28 h-28  rounded-full bg-center bg-cover  mx-auto bg-[url('./profile.jpg')]">
        <img className="rounded-full" src="./profile.jpg" alt="" />
        <h1 className="text-[0.8vw] text-center">{currentUser.role}</h1>
      </div>
      <div className="w-full">
        <h1 className="capitalize text-center font-semibold text-3xl">
          {currentUser.name}
        </h1>
      </div>
      <div className="links w-full ">
        {options.map((item, ind) => (
          <Link to={item.path} className="hover:text-white  " >
            <div className="p-4 w-full border-t hover:bg-blue flex justify-start items-center">
              {item.title}
            </div>
          </Link>
        ))}
        <div onClick={handleLogout} className="p-5 w-full border-y hover:bg-blue flex justify-start items-center">
              Log out
        </div>
        
      </div>
    </div>
  );
};

export default LeftBar;
