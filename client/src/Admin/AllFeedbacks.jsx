import React, { useEffect, useState } from 'react'
import FeedbackCard from '../Components/FeedbackCard'
import { Link } from 'react-router-dom';

const AllFeedbacks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);



  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/all-feedbacks`)
      .then((res) => res.json())
      .then((result) => {
        if(result.found === true){
          setFeedbacks(result.feedbacks);
          setIsLoading(false)
        } else {
          alert(data.error);
        }
      });
  }, []);

  const handleGetDetails = (f) => {
    const id = f._id;


  }

  return (
    <div className='w-full h-screen pt-20 px-20 pb-5'>
      <div className="middle h-full rounded-lg shadow-xl">
        {/* <FeedbackCard/>
         */}
         <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      no.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Number
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Details
                    </th>
                  </tr>
                </thead>

                {isLoading ? (
                  <div className="flex items-center justify-center h-20">
                    <p>Loding...</p>
                  </div>
                ) : (
                  <tbody>
                    {feedbacks.map((f, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {f.name}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {f.number}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {f.email}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {/* <button
                            onClick={handleGetDetails(f)}
                            className="bg-blue/90 py-2 px-4 text-white rounded-sm"
                          >
                            Get details
                          </button> */}
                          <Link to={`/all-feedbacks/${f._id}`} className="font-semibold hover:text-blue" >Get Details</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
      </div>
    </div>
  )
}

export default AllFeedbacks