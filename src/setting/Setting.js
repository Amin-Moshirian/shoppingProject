import React from "react";
import { Link, Outlet } from "react-router-dom";

const Setting = () => {
  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60  mr-20">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white">Setting</h2>
          </div>

          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <Link
                  to="change-profile"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    className="text-white w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <span className="text-gray-100">Change profile</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="change-password"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    className="text-white w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>

                  <span className="text-gray-100">Change password</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="upload-avatar"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    className="text-white w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>

                  <span className="text-gray-100">Upload avatar</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Setting;
