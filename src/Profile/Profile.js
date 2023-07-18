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
    <div className="lg: w-2/5 md: w-2/5 sm: w-3/5 xsm: w-4/5 xxsm: w-4/5 flex rounded-xl border-2 border-black my-12 mx-auto justify-center">
      <div className="flex flex-col items-center">
        <div>
          <img
            src={data?.avatar}
            className="w-36 h-36 my-3 rounded-full"
          ></img>
        </div>
        <p className="font-medium my-3">Email: {data?.email}</p>
        <p className="font-medium my-3">Username: {data?.username}</p>
        <p className="font-medium my-3">Mobile: {data?.mobile}</p>
        {data?.firstName && (
          <p className="font-medium my-3">First name: {data?.firstName}</p>
        )}
        {data?.lastName && (
          <p className="font-medium my-3">Last name: {data?.lastName}</p>
        )}
        {data?.gender && (
          <p className="font-medium my-3">Gender: {data?.gender}</p>
        )}
        {data?.city && (
          <p className="font-medium my-3">City: {data?.city}</p>
        )}
        {data?.age && (
          <p className="font-medium my-3">Age: {data?.age}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
