import React, { useContext, useEffect, useState } from "react";
import LeftBar from "./LeftBar";
import UserContext from "../Context/UserContext";

const MyCompaints = () => {
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } =
    useContext(UserContext);
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/my-complaints/${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.found === true) {
          setComplaints(data.result);
          console.log(complaints);
        } else {
          alert("no complaints is found by this email");
        }
      });
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="border w-full h-full border-black  p-4 flex gap-5 overflow-hidden">
        <LeftBar />
        <div className="right w-4/5">
          <div className="left h-full w-full border-2 border-gray-300 space-y-7 rounded-2xl shadow-xl">
            <div className="m-5 p-3 h-full">
              <h1 className="text-3xl font-bold mb-10">
                All my <span className="text-blue">Compaints</span>
              </h1>

              {complaints.length === 0 ? (
                <div className=" p-10">
                  <div className="bg-center w-full h-2/3 flex flex-col justify-center items-center">
                    <img className="h-1/2 w-1/2" src="notFound.png" alt="" />
                    <h1 className="font-bold">
                      You have not submitted any complaints yet
                    </h1>
                  </div>
                </div>
              ) : (
                <div className="complaints p-3 w-full h-4/5  border rounded-3xl border-sky-100 overflow-y-auto space-y-3">
                  {complaints.map((item) => (
                    <div className={`border ${item.isComplited === true ? "bg-green-100" : "bg-yellow-50"} bg-yello-100 border-gray-100 p-4 rounded-3xl space-y-5 shadow-b hover:border-red-600 transition delay-7000 duration-500 ease-in-out`}>
                      <div className="upper flex justify-between">
                        <h1 className="text-blue font-semibold ">
                          {item.city}
                        </h1>
                        <div className="flex gap-2 font-semibold">
                            <h1>Complaint: </h1>
                            <h1>{item.isComplited === true ? "Completed" : "Pending..."}</h1>
                        </div>
                      </div>
                      <div className="lower flex gap-5">
                        <div className="left w-full">
                          <h1 className="font-semibold">Categary</h1>
                          <h1 className="font-light w-full overflow-hidden">
                            {item.category}
                          </h1>
                        </div>
                        <div className="left w-full">
                          <h1 className="font-semibold">Location</h1>
                          <h1 className="font-light w-full overflow-hidden">
                            {item.location}
                          </h1>
                        </div>
                        <div className="right w-full">
                          <h1 className="font-semibold">Description</h1>
                          <h1 className="font-light w-full overflow-hidden">
                            {item.description}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCompaints;
