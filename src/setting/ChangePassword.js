import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const req = async () => {
    try {
      const { data } = await axios.put(
        "https://kzico.runflare.run/user/change-password",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
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
      setOldPassword("");
      setNewPassword("");
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
      setOldPassword("");
      setNewPassword("");
    }
  };

  const repetition = () => {
    if (oldPassword !== newPassword) {
      req();
    } else {
      toast("Old and new passwords must not same!", {
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
      setOldPassword("");
      setNewPassword("");
    }
  };

  return (
    <div
      className="mt-10 xl:ml-96	lg:ml-80 md:ml-62 sm:ml-62"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="Old password"
            >
              Old password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="******************"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="New password"
            >
              New password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="******************"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={() => repetition()}
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
