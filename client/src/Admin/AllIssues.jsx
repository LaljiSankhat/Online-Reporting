import React, { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import { CgAsterisk } from "react-icons/cg";
// import mongoose from "mongoose";

const AllIssues = () => {
  const [result, setResult] = useState([]);
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } =
    useContext(UserContext);
  const [data, setData] = useState(result);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [clickedReport, setClickedReport] = useState({});
  const [selectedId, setSelectedId] = useState(0);

//   const toggleIsClicked = (res) => {
//     setIsClicked(!isClicked);
//     setClickedReport(res);
//   };

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/all-issues/Rajula")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.found === true) {
          setIsLoading(false);
          setResult(data.complaints);
        } else {
          alert(data.massage);
        }
      });
  }, []);

  const handleMarkAsCompleted = () => {
    // const id = clickedReport._id;
    // console.log(clickedReport.id);
    // const i = new mongoose.Types.ObjectId(id);
    console.log(selectedId);
    fetch(`http://localhost:5000/change-report/${selectedId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        // body: JSON.stringify(clickedReport),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if(data.update === true){
            alert("User details are updated successfully !!")
            setClickedReport(data.updatedReport);
            // console.log(data.updatedUser);
            // navigate("/login");
        } else if(data.update === false) {
            alert(data.massage);
        }
    })
  }
  return (
    <div className="w-full h-screen">
      <div className="border border-black pt-20 pb-5 px-20 h-full flex gap-2">
        <div
          className={`left border shadow-xl  rounded-lg w-1/5 ${
            isClicked ? "w-1/5" : "w-1/2"
          } h-full transition-all delay-7000 duration-500 ease-in-out`}
        >
          <h1 className="ml-5 mt-4 text-2xl text-blue font-semibold">Filter</h1>
          <div className="filterInputs p-2 font-semibold">
            <div className="w-full p-4">
              <label className="mb-2 text-md flex">
                Category
                <span>
                  <CgAsterisk className="text-red-600 text-[.5vw]" />
                </span>
              </label>
              <select
                className="block w-full flex-1 border-1 rounded-sm bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                outline-gray-200 sm:text-sm sm:leading-6"
              >
                <option value="">Select Category</option>
                <option value="patholes">Patholes</option>
                <option value="waste">Waste</option>
                <option value="water">Water</option>
              </select>
            </div>
          </div>
        </div>
        <div
          className={`middle p-2 rounded-lg space-y-2 shadow-xl border h-full ${
            isClicked ? "w-1/3" : "w-2/3"
          }`}
        >
          {isLoading ? (
            <div>Loding...</div>
          ) : ( result.map((res, ind) => (
            <div
              onClick={() => {
                setIsClicked(!isClicked);
                setClickedReport(res);
                setSelectedId(res._id);
              }}
              className={`border ${res.isComplited === true ? "bg-green-100" : "bg-yellow-50"} shadow-md p-4 flex rounded-3xl hover:border-red-300 space-x-2 gap-5`}
            >
              {/* <div className="left flex justify-center items-center">
                    <input type="checkbox" name="" id="" />
                </div> */}
              <div className={`w-full space-y-1  `}>
                <div className="upper flex justify-between">
                  <h1 className="font-semibold">
                    {res.postingDate.toString().slice(0, 8)}
                  </h1>
                  <h1>Completed: {res.isComplited === true ? "Yes" : "No"}</h1>
                </div>
                <div className="w-full lower flex justify-between overflow-hidden">
                  <h1>Category: {res.category}</h1>
                  {!isClicked && (
                    <h1>Location: {res.location}</h1>
                  )}
                  <h1>City: {res.city}</h1>
                </div>
              </div>

              {/* <h1>{res.postingDate.toString().slice(8, 10) + '/' + res.postingDate.toString().slice(5, 7) + '/' + res.postingDate.toString().slice(0, 4)}</h1> */}
            </div>
          ))
            
          )}
        </div>
        {isClicked && (
          <div className="right rounded-lg shadow-xl border p-10 w-1/2 h-full space-y-2 font-semibold">
            <div className="flex justify-between">
              <h1>Name: {clickedReport.name}</h1>
              <h1>Number: {clickedReport.number}</h1>
            </div>
            <div className="flex justify-between">
              <h1>Email: {clickedReport.email}</h1>
              <h1>
                Posting Date: {clickedReport.postingDate.toString().slice(0, 15)}
              </h1>
            </div>
            <div className="flex justify-between">
              <h1>Location: {clickedReport.location}</h1>
              <h1>City: {clickedReport.city}</h1>
              
              {/* <h1>{clickedReport._id}</h1> */}
            </div>

            <div className="pt-8 flex border-t-2  gap-5">
              <img
                className="h-72 w-72 border border-black"
                src={`http://localhost:5000/images/uploads/${clickedReport.file}`}
                alt=""
              />

              <div className="h-72 w-72">
                <h1 className="text-blue">Description:</h1>
                <h1 className="overflow-auto"> {clickedReport.description}</h1>
              </div>
            </div>

            <div className="flex justify-between p-10">
              <h1>
                Completed: {clickedReport.isComplited === true ? "Yes" : "No"}
              </h1>
              {clickedReport.isComplited !== true && (
                <button onClick={handleMarkAsCompleted} className="block bg-blue text-white text-[.9vw] text-semibold px-4 py-2 rounded-sm cursor-pointer">
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllIssues;
