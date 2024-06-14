import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loggedInUser } from "../redux/userSlice";
import Avatar from "./Avatar";

const EditUserDetails = ({ setEditUserDetails }) => {
  const userInfo = useSelector(loggedInUser);
  const [data, setData] = useState({
    name: userInfo?.name,
    profile_pic: userInfo?.profile_pic,
  });

  const handleOnChange = () => {};
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit profile details</p>
        <form className="grid gap-3 mt-3 ">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name : </label>
            <input
              className="w-full py-1 px-2 focus:outline-primary border-0.5"
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={(e) => handleOnChange(e)}
            ></input>
          </div>
          <div>
            <label htmlFor="profile_pic">Photo : </label>

            <Avatar profile={userInfo.profile_pic}></Avatar>
          </div>
        </form>
        {/* <h2
          className="cursor-pointer"
          onClick={() => setEditUserDetails(false)}
        >
          Close
        </h2> */}
      </div>
    </div>
  );
};

export default EditUserDetails;
