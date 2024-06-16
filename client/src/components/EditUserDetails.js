import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser, loggedIntoken, setUser } from "../redux/userSlice";
import Avatar from "./Avatar";
import uploadFile from "../helpers/uploadFile";

const EditUserDetails = ({ setEditUserDetails }) => {
  const userToken = useSelector(loggedIntoken);
  const userInfo = useSelector(loggedInUser);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    token: userToken,
    name: userInfo?.name,
    profile_pic: userInfo?.profile_pic,
  });

  const handleOnChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setData((prev) => ({
      ...prev,
      profile_pic: uploadPhoto?.url,
    }));
    e.target.value = null;
  };
  const handSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/updateUser`;
      const response = await fetch(URL, {
        body: JSON.stringify(data),
        method: "PATCH",
        headers: { "Content-type": "application/json" },
      });
      const resData = await response.json();
      dispatch(setUser(resData.data));
      setEditUserDetails(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Data", data);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit profile details</p>
        <form className="grid gap-3 mt-3 " onSubmit={handSubmit}>
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="name">
              Name :{" "}
            </label>
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
            <p className="font-semibold">Photo : </p>
            <Avatar profile={data.profile_pic}></Avatar>
            <label htmlFor="profile_pic">
              <div className="font-semibold border-primary border px-4 py-1 rounded w-40">
                Change photo
              </div>
            </label>
            <input
              id="profile_pic"
              type="file"
              className="hidden"
              onChange={(e) => handleUploadPhoto(e)}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="border-primary bg-primary text-white border px-4 py-1 rounded"
              type="submit"
            >
              Save
            </button>
            <button
              className="border-primary border text-primary px-4 py-1 rounded"
              onClick={() => setEditUserDetails(false)}
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
