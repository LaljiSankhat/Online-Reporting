import React, { useState } from "react";
import { CgAsterisk } from "react-icons/cg";
import { useAuthStore } from "../store/useAuthStore";
import { Map, MapPin, X } from "lucide-react";
import toast from "react-hot-toast";
import { useReportStore } from "../store/useReportStore";

const PostIssuePage = () => {
  const { authUser, checkAuth, isCheckingAuth, isLoggedIn } = useAuthStore();
  const { reportAnIssue } = useReportStore();
  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  const [selectedImg, setSelectedImg] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    fullName: authUser.fullName,
    number: authUser.number,
    email: authUser.email,
    postingDate: d + "/" + m + "/" + y,
    category: "",
    city: "",
    location: "",
    description: "",
    file: "",
    userId: authUser._id,
  });

  const validateForm = () => {
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      return toast.error("Please provide name");
    }

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return toast.error("Invalid email format");
    }

    // Mobile number validation (10 digits)
    if (!/^\d{10}$/.test(formData.number)) {
      return toast.error("Invalid number format");
    }

    // Posting date validation (cannot be in the future)
    const selectedDate = new Date(formData.postingDate);
    const currentDate = new Date();
    if (!formData.postingDate || selectedDate > currentDate) {
      return toast.error("Invalid date");
    }

    // Category selection validation
    if (!formData.category || formData.category.trim() === "") {
      return toast.error("Please select a category");
    }

    // City name validation
    if (!formData.city || formData.city.trim().length < 2) {
      return toast.error("Please enter a city");
    }

    return true;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      setImagePreview(reader.result);
      setFormData({ ...formData, file: base64Image });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    console.log(formData);
    console.log(success);

    console.log("report submitted");

    let res;

    if (success) res = reportAnIssue(formData);

    console.log(res);
    if (res.email) {
      toast.success("Issue submitted successsfully !!");
      setFormData({
        fullName: authUser.fullName,
        number: authUser.number,
        email: authUser.email,
        postingDate: d + "/" + m + "/" + y,
        category: "",
        city: "",
        location: "",
        description: "",
        file: "",
      });
    } else {
      toast.error("Error in submitting issue", res.message);
    }
  };
  console.log(authUser);
  console.log(selectedImg);
  console.log(isLoggedIn);

  return (
    <div className="px-56 py-28">
      <div className="bg-[#FAFAFA] border border-gray-200 rounded-lg px-10 py-6 shadow-xl">
      <h1 className="text-center text-4xl font-bold mb-8 mt-2">
            Submit An <span className="text-blue">Issue</span>
          </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className=" mb-2 text-lg flex">
                Name
                <span>
                  <CgAsterisk className="text-red-600" />
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                    focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className=" mb-2 text-lg flex">
                Mobile Number
                <span>
                  <CgAsterisk className="text-red-600" />
                </span>
              </label>
              <input
                type="number"
                placeholder="1234567890"
                defaultValue={authUser.number}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 
                    focus:outline-none sm:text-sm sm:leading-6"
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
              />
            </div>
          </div>

          {/* Third row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className=" mb-2 text-lg flex">
                Email
                <span>
                  <CgAsterisk className="text-red-600" />
                </span>
              </label>
              <input
                type="email"
                placeholder="abc@gmail.com"
                defaultValue={authUser.email}
                className="create-job-input"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className=" mb-2 text-lg flex">
                Posting Date
                <span>
                  <CgAsterisk className="text-red-600" />
                </span>
              </label>
              <input
                type="text"
                // placeholder="Ex: 2024-02-21"
                defaultValue={d + "/" + m + "/" + y}
                className="create-job-input"
                value={formData.postingDate}
                onChange={(e) =>
                  setFormData({ ...formData, postingDate: e.target.value })
                }
              />
            </div>
          </div>

          {/* Fourth row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className=" mb-2 text-lg flex">
                Category
                <span>
                  <CgAsterisk className="text-red-600" />
                </span>
              </label>
              <select
                className="create-job-input"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="patholes">Patholes</option>
                <option value="waste">Waste</option>
                <option value="water">Water</option>
              </select>
            </div>

            <div className="lg:w-1/2 w-full">
              <label className=" mb-2 text-lg flex">
                City
                <span>
                  <CgAsterisk className="text-red-600" />
                </span>
              </label>
              <input
                type="text"
                placeholder="Ex: Bhavnagar"
                className="create-job-input"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
          </div>

          <div className="w-full">
            <label className=" mb-2 text-lg flex">
              Location
              <span>
                <CgAsterisk className="text-red-600" />
              </span>
            </label>
            <div className="flex  w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 justify-between">
              <input
                type="text"
                placeholder="enter location of problem"
                className="mr-1 w-full outline-none"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
              <div className="flex ">
                <button className="mr-2 flex items-center gap-1">
                  <MapPin className="size-3 text-blue" />
                  Location
                </button>
              </div>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg ">Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none "
              rows={6}
              placeholder="give some details about issue."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <input
            type="file"
            name="file"
            onChange={handleImageUpload}
            className="create-job-input"
          />
          {imagePreview && (
            <div className="mb-3 flex items-center gap-2">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="size-40 object-cover rounded-lg border border-zinc-700"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                  }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                  type="button"
                >
                  <X className="size-3" />
                </button>
              </div>
            </div>
          )}

          {/* <input
            className="block mt-12 bg-blue text-white text-semibold px-8 py-2 rounded-sm cursor-pointer"
            type="submit"
          /> */}
          <button className="block mt-12 bg-blue text-white text-semibold px-8 py-2 rounded-sm cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostIssuePage;
