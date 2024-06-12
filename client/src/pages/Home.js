import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { loggedInUser, loggedIntoken, setUser } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const dispatch = useDispatch();
  const stateUser = useSelector(loggedInUser);
  const token = useSelector(loggedIntoken);
  const navigate = useNavigate();

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
  return (
    <div className="grid grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className="bg-white">
        <Sidebar></Sidebar>
      </section>
      <section>
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default Home;
