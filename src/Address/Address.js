import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Address = () => {
  const navigate = useNavigate();

  // States for save values of city, address, postal code and phone
  const [city, setCity] = useState({
    isValid: false,
    value: "",
    isTouched: false,
    error: "City must be at least 2 characters",
  });
  const [address, setAddress] = useState({
    isValid: false,
    value: "",
    isTouched: false,
    error: "Address must be at least 10 characters",
  });
  const [postalCode, setPostalCode] = useState({
    isValid: false,
    value: "",
    isTouched: false,
    error: "Postal code must be numbers",
  });
  const [phone, setPhone] = useState({
    isValid: false,
    value: "",
    isTouched: false,
    error: "Phone number must be 11 numbers like example: 09*********",
  });
  // _____________________________________________________________

  // Function to check that the user does not send empty values
  const pathHandling = () => {
    if (
      city.isValid &&
      address.isValid &&
      postalCode.isValid &&
      phone.isValid
    ) {
      // Save values in local storage
      localStorage.setItem("address", address.value);
      localStorage.setItem("city", city.value);
      localStorage.setItem("postalCode", postalCode.value);
      localStorage.setItem("phone", phone.value);
      // _____________________________________________________________
      navigate("/cheakout");
    } else {
      toast("All of these fields are require and most be valid", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "warning",
      });
    }
  };
  // ______________________________________________________________

  const phoneNumberRegex = /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/;
  const profileRegex = /^[a-z ,.'-]+$/i;
  const numberRegex = /^\d+$/;

  return (
    <div className="mt-16 flex flex-col justify-center items-center ">
      <h3 className="mb-10">Shipping address</h3>
      <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              City
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              value={city.value}
              onChange={(e) =>
                setCity((last) => {
                  return { ...last, value: e.target.value };
                })
              }
              onFocus={() =>
                setCity((last) => {
                  return { ...last, isTouched: false };
                })
              }
              onBlur={() =>
                setCity((last) => {
                  return {
                    ...last,
                    isTouched: true,
                    isValid:
                      last.value?.trim().length >= 2 &&
                      profileRegex.test(last.value),
                  };
                })
              }
            ></input>
            {!city.isValid && city.isTouched && city.value && (
              <span className="text-base	text-red-600">{city.error}</span>
            )}
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Address
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              value={address.value}
              onChange={(e) =>
                setAddress((last) => {
                  return { ...last, value: e.target.value };
                })
              }
              onFocus={() =>
                setAddress((last) => {
                  return { ...last, isTouched: false };
                })
              }
              onBlur={() =>
                setAddress((last) => {
                  return {
                    ...last,
                    isTouched: true,
                    isValid: last.value?.trim().length >= 10,
                  };
                })
              }
            ></input>
            {!address.isValid && address.isTouched && address.value && (
              <span className="text-base	text-red-600">{address.error}</span>
            )}
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Postal code
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              value={postalCode.value}
              onChange={(e) =>
                setPostalCode((last) => {
                  return { ...last, value: e.target.value };
                })
              }
              onFocus={() =>
                setPostalCode((last) => {
                  return { ...last, isTouched: false };
                })
              }
              onBlur={() =>
                setPostalCode((last) => {
                  return {
                    ...last,
                    isTouched: true,
                    isValid: numberRegex.test(last.value),
                  };
                })
              }
            ></input>
            {!postalCode.isValid &&
              postalCode.isTouched &&
              postalCode.value && (
                <span className="text-base	text-red-600">
                  {postalCode.error}
                </span>
              )}
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Phone
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              value={phone.value}
              onChange={(e) =>
                setPhone((last) => {
                  return { ...last, value: e.target.value };
                })
              }
              onFocus={() =>
                setPhone((last) => {
                  return { ...last, isTouched: false };
                })
              }
              onBlur={() =>
                setPhone((last) => {
                  return {
                    ...last,
                    isTouched: true,
                    isValid:
                      phoneNumberRegex.test(last.value) &&
                      last.value.length === 11,
                  };
                })
              }
            ></input>
            {!phone.isValid && phone.isTouched && phone.value && (
              <span className="text-base	text-red-600">{phone.error}</span>
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
              type="button"
              onClick={() => {
                pathHandling();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Address;
