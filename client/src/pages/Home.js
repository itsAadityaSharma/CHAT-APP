import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { loggedInUser, loggedIntoken, setUser } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png";

const Home = () => {
  const dispatch = useDispatch();
  const stateUser = useSelector(loggedInUser);
  const token = useSelector(loggedIntoken);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/userDetails`;
      const response = await fetch(URL, {
        body: JSON.stringify({
          token: token,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const responseData = await response.json();
      if (responseData.success) {
        dispatch(setUser(responseData.data));
        if (responseData.data.logout) {
          navigate("/email");
        }
        // console.log("userDetails", responseData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("user data in state", stateUser);
  console.log("token in state", token);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  console.log("Location : ", location);

  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar></Sidebar>
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet></Outlet>
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <img src={logo} width={200} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
};

export default Home;
