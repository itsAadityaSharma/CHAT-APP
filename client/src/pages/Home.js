import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { loggedInUser, loggedIntoken, setUser } from "../redux/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const stateUser = useSelector(loggedInUser);
  const token = useSelector(loggedIntoken);

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/userDetails`;
      const response = await fetch(URL, {
        url: URL,
        // withCredentials: true,
        credentials: "include",
        method: "GET",
      });
      const responseData = await response.json();
      if (responseData.success) {
        dispatch(setUser(responseData.data));
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
    <div>
      HOMEEE
      <section>
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default Home;
