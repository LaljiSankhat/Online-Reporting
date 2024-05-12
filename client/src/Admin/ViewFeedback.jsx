import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewFeedback = () => {
  const { id } = useParams();
  const [f, setF] = useState({});

  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:5000/all-feedbacks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setF(data.feedback);
      });
  }, []);
  return (
    <div className="w-full h-screen pt-24 px-20 pb-5">
      <div className="middle w-full rounded-lg shadow-lg ">
        <div className="rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white rounded-lg divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm font-medium text-gray-900">Name</h1>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm text-gray-500">{f.name}</h1>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm font-medium text-gray-900">Email</h1>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm text-gray-500">{f.email}</h1>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm font-medium text-gray-900">Number</h1>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm text-gray-500">{f.number}</h1>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm font-medium text-gray-900">
                    Satisfaction
                  </h1>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm text-gray-500">{f.satisfaction}</h1>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm font-medium text-gray-900">Work</h1>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm text-gray-500">{f.work}</h1>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm font-medium text-gray-900">
                    Communication
                  </h1>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm text-gray-500">{f.communication}</h1>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm font-medium text-gray-900">
                    User Experience
                  </h1>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm text-gray-500">{f.userExperience}</h1>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm font-medium text-gray-900">
                    User Suggestion
                  </h1>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <h1 className="text-sm text-gray-500">{f.suggestion}</h1>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
