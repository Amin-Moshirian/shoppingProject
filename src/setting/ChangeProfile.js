import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangeProfile = () => {
  const [firstName, setFirstName] = useState({
    isValid: false,
    value: "",
    isTouched: false,
    error: "Firstname must be at least 3 characters",
  });
  const [lastName, setLastName] = useState({
    isValid: false,
    value: "",
    isTouched: false,
    error: "Lastname must be at least 3 characters",
  });
  const [gender, setGender] = useState({
    isValid: false,
    value: "",
    isTouched: false,
    error: "Gender must be select between male or female",
  });
  const [age, setAge] = useState({
    isValid: false,
    value: "",
    isTouched: false,
    error: "Age must be a number and greater than or equal 15",
  });
  const [city, setCity] = useState({
    isValid: false,
    value: "",
    isTouched: false,
    error: "City must be at least 3 characters",
  });

  const req = async () => {
    try {
      const { data } = await axios.put(
        "https://kzico.runflare.run/user/change-profile",
        {
          firstname: firstName.value,
          lastname: lastName.value,
          gender: gender.value,
          age: age.value,
          city: city.value,
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
      setFirstName((last) => {
        return { ...last, value: "" };
      });
      setLastName((last) => {
        return { ...last, value: "" };
      });
      setAge((last) => {
        return { ...last, value: "" };
      });
      setGender((last) => {
        return { ...last, value: "" };
      });
      setCity((last) => {
        return { ...last, value: "" };
      });
    } catch (error) {
      error.response.data.message?.map((item) => {
        return toast(item, {
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
      });
    }
  };

  const profileRegex = /^[a-z ,.'-]+$/i;
  const numberRegex = /^\d+$/;

  const submit = () => {
    if (
      firstName.isValid &&
      lastName.isValid &&
      gender.isValid &&
      age.isValid &&
      city.isValid
    ) {
      req();
    } else
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
  };

  return (
    <div className="mt-10 xl:ml-96	lg:ml-80 md:ml-62 sm:ml-62 xsm:ml-62 xxsm:ml-62">
      <div className="mt-16 flex flex-col justify-center items-center ">
        <h3 className="mb-10">Profile info</h3>
        <form className="w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                First name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                value={firstName.value?.trim()}
                onChange={(e) =>
                  setFirstName((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setFirstName((last) => {
                    return { ...last, isTouched: false };
                  })
                }
                onBlur={() =>
                  setFirstName((last) => {
                    return {
                      ...last,
                      isTouched: true,
                      isValid:
                        last.value?.length >= 3 &&
                        profileRegex.test(last.value),
                    };
                  })
                }
              ></input>
              {!firstName.isValid && firstName.isTouched && firstName.value && (
                <span className="text-base	text-red-600">{firstName.error}</span>
              )}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Last name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                value={lastName.value?.trim()}
                onChange={(e) =>
                  setLastName((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setLastName((last) => {
                    return { ...last, isTouched: false };
                  })
                }
                onBlur={() =>
                  setLastName((last) => {
                    return {
                      ...last,
                      isTouched: true,
                      isValid:
                        last.value?.length >= 3 &&
                        profileRegex.test(last.value),
                    };
                  })
                }
              ></input>
              {!lastName.isValid && lastName.isTouched && lastName.value && (
                <span className="text-base	text-red-600">{lastName.error}</span>
              )}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Gender
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                value={gender.value?.trim()}
                onChange={(e) =>
                  setGender((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setGender((last) => {
                    return { ...last, isTouched: false };
                  })
                }
                onBlur={() =>
                  setGender((last) => {
                    return {
                      ...last,
                      isTouched: true,
                      isValid: last.value === "male" || last.value === "female",
                    };
                  })
                }
              ></input>
              {!gender.isValid && gender.isTouched && gender.value && (
                <span className="text-base	text-red-600">{gender.error}</span>
              )}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Age
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                value={age.value?.trim()}
                onChange={(e) =>
                  setAge((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setAge((last) => {
                    return { ...last, isTouched: false };
                  })
                }
                onBlur={() =>
                  setAge((last) => {
                    return {
                      ...last,
                      isTouched: true,
                      isValid: parseInt(last.value) > 15 && numberRegex.test(last.value),
                    };
                  })
                }
              ></input>
              {!age.isValid && age.isTouched && age.value && (
                <span className="text-base	text-red-600">{age.error}</span>
              )}
            </div>
          </div>
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
                value={city.value?.trim()}
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
                        last.value?.length >= 3 &&
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
            <div className="md:w-1/3"></div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={() => submit()}
              >
                Done
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeProfile;
