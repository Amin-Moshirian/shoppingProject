import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/action";

// User information

const Profile = () => {
  const { data } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <div className="flex w-2/5 rounded-xl border-2 border-black my-12 mx-auto justify-center">
      <div className="flex flex-col items-center">
        <div>
          <img
            src={data.user?.image}
            className="w-36 h-36 my-3 rounded-full"
          ></img>
        </div>
        <p className="font-medium my-3">Email: {data.user?.email}</p>
        <p className="font-medium my-3">Username: {data.user?.username}</p>
        <p className="font-medium my-3">Mobile: {data.user?.mobile}</p>
        {data.user?.firstname && (
          <p className="font-medium my-3">First name: {data.user?.firstname}</p>
        )}
        {data.user?.lastname && (
          <p className="font-medium my-3">Last name: {data.user?.lastname}</p>
        )}
        {data.user?.gender && (
          <p className="font-medium my-3">Gender: {data.user?.gender}</p>
        )}
        {data.user?.city && (
          <p className="font-medium my-3">City: {data.user?.city}</p>
        )}
        {data.user?.age && (
          <p className="font-medium my-3">Age: {data.user?.age}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
