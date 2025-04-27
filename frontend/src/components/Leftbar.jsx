import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Leftbar = () => {
    const {authUser, logout} = useAuthStore();
    const options = [
        {title: "Home", path: "/"},
        { title: "Account", path: "/profile" },
        { title: "My Complaints", path: "/my-reports" },
        { title: "My Feedbacks", path: "/my-feedbacks" },
        { title: "Reset Password", path: "/forgot-password" },
      ];

      const handleLogout = () => {
        logout();
        toast.success("Logged out Successfully")
      }
    return (
        <div className="left h-full w-1/5 border border-gray-300 space-y-7 rounded-lg shadow-lg">
          <div className="img mt-8 w-28 h-28  rounded-full bg-center bg-cover  mx-auto bg-[url('./profile.jpg')]">
            <img className="rounded-full" src="./profile.jpg" alt="" />
            <h1 className="text-0.5xl font-semibold text-center">{authUser.fullName}</h1>
          </div>
          {/* <div className="w-full">
            <h1 className="capitalize text-center font-semibold text-3xl">
              {authUser.fullName}
            </h1>
          </div> */}
          <div className="links w-full pt-4">
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
}

export default Leftbar
