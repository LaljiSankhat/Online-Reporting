import React, { useEffect, useState } from "react";
import { useReportStore } from "../../store/useReportStore";
import { CgAsterisk } from "react-icons/cg";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const AllIssuesPage = () => {
  const { getAllIssues, allReports, setAsCompleted } = useReportStore();
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedReport, setClickedReport] = useState(null);
  const [reports, setReports] = useState([]);

  const sortedReports = allReports.sort((a, b) => {
    return !a.isComplited === !b.isComplited ? 0 : !a.isComplited ? -1 : 1;
  })


  useEffect(() => {
    const res = getAllIssues();
    console.log(allReports)
  }, []);

  const handleChangeCategory = (e) => {
    const category = e.target.value;
    
  }

  const handleMarkAsCompleted = (id) => {
    setAsCompleted(id);
    toast.success("Marked as Completed");
  }
//   console.log(getAllIssues());
  return (
    <div className="w-full h-screen">
      <div className="border border-black pt-20 pb-5 px-20 h-full flex gap-2">
        {/* <div
          className={`left border shadow-xl  rounded-lg w-1/5 ${
            isClicked ? "w-1/5" : "w-1/2"
          } h-full transition-all delay-7000 duration-500 ease-in-out`}
        >
          <h1 className="ml-5 mt-4 text-2xl text-blue font-semibold">Filter</h1>
          <div className="filterInputs p-2 font-semibold">
            <div className="w-full p-4">
              <label className="mb-2 text-md flex">
                Category
              </label>
              <select
                className="block w-full flex-1 border-1 rounded-sm bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400
                outline-gray-200 sm:text-sm sm:leading-6"
                onChange={handleChangeCategory}
              >
                <option value="">Select Category</option>
                <option value="patholes">Patholes</option>
                <option value="waste">Waste</option>
                <option value="water">Water</option>
              </select>
            </div>
          </div>
        </div> */}
        <div
          className={`middle p-2 grid gap-2 rounded-md overflow-y-scroll scrollbar-hide shadow-lg border h-full ${
            isClicked ? "w-1/2" : "w-full"
          }`}
        >
          {isLoading ? (
            <div>Loding...</div>
          ) : ( sortedReports.map((res, ind) => (
            <div
              onClick={() => {
                setIsClicked(!isClicked);
                setClickedReport(res);
              }}
              className={`border ${res.isComplited === true ? "bg-green-50" : "bg-yellow-50/50"}  shadow-md p-4 h-28 flex rounded-md hover:border-gray-500 gap-2 cursor-pointer`}
            >
              {/* <div className="left flex justify-center items-center">
                    <input type="checkbox" name="" id="" />
                </div> */}
              <div className={`w-full flex flex-col justify-between`}>
                <div className="upper flex justify-between">
                  <h1 className="font-semibold">
                    {res.postingDate.toString()}
                  </h1>
                  <h1>Completed : {res.isComplited === true ? "Yes" : "No"}</h1>
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
          
          <div className="relative right rounded-md shadow-xl border p-10 w-1/2 h-full space-y-2 font-semibold">
          {/* Cross Button */}
          <button
            onClick={() => {
              setClickedReport(null); // Clear or hide report details
              setIsClicked(!isClicked); // Close the report details
            }}
            className="absolute top-3 right-4 text-gray-500 hover:text-black"
          >
            <CircleX className="size-5" />
          </button>
        
          <div className="flex justify-between">
            <h1>Name: {clickedReport.fullName}</h1>
            <h1>Number: {clickedReport.number}</h1>
          </div>
        
          <div className="flex justify-between">
            <h1>Email: {clickedReport.email}</h1>
            <h1>Posting Date: {clickedReport.postingDate.toString().slice(0, 15)}</h1>
          </div>
        
          <div className="flex justify-between">
            <h1>Location: {clickedReport.location}</h1>
            <h1>City: {clickedReport.city}</h1>
          </div>
        
          <div className="pt-8 flex border-t-2 gap-5">
            <img
              className="h-72 w-72 border border-black"
              src={clickedReport.file}
              alt=""
            />
            <div className="h-72 w-72">
              <h1 className="text-blue">Description:</h1>
              <h1 className="overflow-auto">{clickedReport.description}</h1>
            </div>
          </div>
        
          <div className="flex justify-between p-10">
            <h1>Completed: {clickedReport.isComplited ? "Yes" : "No"}</h1>
            {!clickedReport.isComplited && (
              <button
                onClick={() => handleMarkAsCompleted(clickedReport._id)}
                className="block bg-blue text-white text-[.9vw] font-semibold px-4 py-2 rounded-sm cursor-pointer"
              >
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

export default AllIssuesPage;
