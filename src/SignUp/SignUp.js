import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navgate = useNavigate();

  //   Email State

  const [email, setEmail] = useState({
    value: "",
    isTouched: false,
    error: "Email is not valid!",
    isValid: false,
  });
  // ______________________________________________________________________________

  //   Username State

  const [userName, setUserName] = useState({
    value: "",
    isTouched: false,
    error: "Username is not valid!",
    isValid: false,
  });
  // ______________________________________________________________________________

  //   Password State

  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
    error: "Password is not valid!",
    isValid: false,
  });
  // ______________________________________________________________________________

  //   Mobile State

  const [mobile, setMobile] = useState({
    value: "",
    isTouched: false,
    error: "Mobile number is not valid!",
    isValid: false,
  });
  // ______________________________________________________________________________

  //   Confirm password State

  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isTouched: false,
    error: "Passwords are not match!",
    isValid: false,
  });
  // ______________________________________________________________________________

  const req = async () => {
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/signup",
        {
          username: userName.value,
          email: email.value,
          password: password.value,
          mobile: mobile.value,
        }
      );
      toast("Sign up was success and " + data.message, {
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
      navgate("/login");
    } catch (error) {
      toast("Sign up failed because: " + error.message, {
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

  // Regexes
  const userNameRegex = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const phoneNumberRegex = /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/;
  //________________________________________________________________________________
  return (
    <div className="flex justify-center mt-16 ">
      <div className="border border-black p-12">
        <h3 className=" mb-12 xl:ml-8 lg:ml-8 md:ml-8 sm:ml-1 ">Sign Up</h3>

        <form className="w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Username
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                placeholder="Enter Username"
                value={userName.value}
                onChange={(e) =>
                  setUserName((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setUserName((last) => {
                    return { ...last, isTouched: false };
                  })
                }
                onBlur={() =>
                  setUserName((last) => {
                    return {
                      ...last,
                      isTouched: true,
                      isValid: userNameRegex.test(last.value),
                    };
                  })
                }
              ></input>
              {!userName.isValid && userName.isTouched && userName.value && (
                <span className="text-base	text-red-600">{userName.error}</span>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="email"
                placeholder="Enter Email"
                value={email.value}
                onChange={(e) =>
                  setEmail((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setEmail((last) => {
                    return { ...last, isTouched: false };
                  })
                }
                onBlur={() =>
                  setEmail((last) => {
                    return {
                      ...last,
                      isTouched: true,
                      isValid: emailRegex.test(last.value),
                    };
                  })
                }
              ></input>
              {!email.isValid && email.isTouched && email.value && (
                <span className="text-base	text-red-600">{email.error}</span>
              )}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="password"
                placeholder="Enter Password"
                value={password.value}
                onChange={(e) =>
                  setPassword((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setPassword((last) => {
                    return { ...last, isTouched: false };
                  })
                }
                onBlur={() =>
                  setPassword((last) => {
                    return {
                      ...last,
                      isTouched: true,
                      isValid: passwordRegex.test(last.value),
                    };
                  })
                }
              ></input>
              {!password.isValid && password.isTouched && password.value && (
                <span className="text-base	text-red-600">{password.error}</span>
              )}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Confirm password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword.value}
                onChange={(e) =>
                  setConfirmPassword((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setConfirmPassword((last) => {
                    return { ...last, isTouched: false };
                  })
                }
                onBlur={() =>
                  setConfirmPassword((last) => {
                    return {
                      ...last,
                      isTouched: true,
                      isValid: password.value === confirmPassword.value,
                    };
                  })
                }
              ></input>
              {!confirmPassword.isValid &&
                confirmPassword.isTouched &&
                confirmPassword.value && (
                  <span className="text-base	text-red-600">
                    {confirmPassword.error}
                  </span>
                )}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Mobile
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="tel"
                placeholder="Mobile"
                value={mobile.value}
                onChange={(e) =>
                  setMobile((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setMobile((last) => {
                    return { ...last, isTouched: false };
                  })
                }
                onBlur={() =>
                  setMobile((last) => {
                    return {
                      ...last,
                      isTouched: true,
                      isValid: phoneNumberRegex.test(last.value),
                    };
                  })
                }
              ></input>
              {!mobile.isValid && mobile.isTouched && mobile.value && (
                <span className="text-base	text-red-600">{mobile.error}</span>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3"></div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  userName.isValid &&
                  email.isValid &&
                  password.isValid &&
                  confirmPassword.isValid &&
                  mobile.isValid &&
                  req()
                }
                type="submit"
              >
                SignUp
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
