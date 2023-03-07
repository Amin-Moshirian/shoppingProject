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
    formData.append("profile-image", pic);
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
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
      toast(error.message, {
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
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input type="file" onChange={(e) => setPic(e.target.files[0])}></input>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="submit"
          onClick={() => req()}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadAvatar;
