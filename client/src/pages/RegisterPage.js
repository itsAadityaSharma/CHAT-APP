import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState(null);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...data, [name]: value };
    setData(newData);
  };
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setUploadPhoto(file);
    setData((prev) => ({
      ...prev,
      profile_pic: uploadPhoto?.url,
    }));
    console.log("Data", data);
    e.target.value = null;
  };
  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };
  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    // debugger;
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;

      console.log("URL", URL);

      const response = await fetch(URL, {
        body: JSON.stringify(data),
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
      const resData = await response.json();

      console.log(resData);
      if (resData.error) {
        toast.error(resData.message);
      } else {
        toast.success(resData.message);
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });
        setUploadPhoto(null);
        navigate("/email");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to Chat App</h3>
        <form className="grid gap-4 mt-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.name}
              onChange={(e) => handleOnChange(e)}
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={(e) => handleOnChange(e)}
            ></input>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={(e) => handleOnChange(e)}
            ></input>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo:
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto.name
                    : "Upload Profile Picture"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={(e) => handleClearUploadPhoto(e)}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={(e) => handleUpload(e)}
            ></input>
          </div>
          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Register
          </button>
        </form>
        <p className="my-3 text-center">
          Already have account ?{" "}
          <Link
            to={"/email"}
            className="hover:text-primary font-semibold
          "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
