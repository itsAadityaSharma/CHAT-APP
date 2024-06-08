import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: "",
    userId: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (location?.state?._id) {
      const newData = { ...data, [name]: value, userId: location.state._id };
      setData(newData);
    }
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!location?.state?._id) {
      navigate("/email");
    }
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

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
          email: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  if (!location?.state?._id) {
    navigate("/email");
  }

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to Chat App</h3>
        <form className="grid gap-4 mt-5" onSubmit={(e) => handleSubmit(e)}>
          {/* <div className="flex flex-col gap-1">
            <label htmlFor="email">Email : </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={(e) => handleOnChange(e)}
            ></input>
          </div> */}

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password : </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={(e) => handleOnChange(e)}
            ></input>
          </div>

          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
