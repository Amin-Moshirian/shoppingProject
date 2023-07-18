import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UploadAvatar = () => {
  const [pic, setPic] = useState(null);
  const { data } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const req = async () => {
    const formData = new FormData();
    formData.append("avatar", pic);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/user/upload-avatar",
        formData,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("Token")}`,
          },
        }
        );
      toast(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "success",
      });
      navigate("/profile");
    } catch (error) {
      toast(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "error",
      });
    }
  };

  return (
    <div className="mt-10 xl:ml-96	lg:ml-80 md:ml-62 sm:ml-62">
      <from className="flex flex-col gap-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Upload file
        </label>
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          onChange={(e) => setPic(e.target.files[0])}
        ></input>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "
          type="submit"
          onClick={() => req()}
        >
          Upload
        </button>
      </from>
    </div>
  );
};

export default UploadAvatar;
