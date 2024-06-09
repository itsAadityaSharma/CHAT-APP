import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
// import uploadFile from "../helpers/uploadFile";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";
import Avatar from "../components/Avatar";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...data, [name]: value };
    setData(newData);
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    // debugger;
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;

      console.log("URL", URL);

      const response = await fetch(URL, {
        body: JSON.stringify(data),
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
      const resData = await response.json();

      if (resData.error) {
        toast.error(resData.message);
      } else {
        toast.success(resData.message);
        setData({
          email: "",
        });
        console.log(resData?.data);

        navigate(`/password`, {
          state: resData?.data,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
        <Avatar></Avatar>
        <h3>Welcome to Chat App</h3>

        <form className="grid gap-4 mt-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-1">
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
          </div>

          {/* <div className="flex flex-col gap-1">
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
          </div> */}

          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Next
          </button>
        </form>
        <p className="my-3 text-center">
          Doesn't have account ?{" "}
          <Link
            to={"/register"}
            className="hover:text-primary font-semibold
          "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
