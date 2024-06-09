import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/userDetails`;
      const response = await fetch(URL, {
        url: URL,
        withCredentials: true,
        credentials: "include",
        method: "GET",
      });
      const data = await response.json();
      console.log("Current User details : ", data);
    } catch (error) {}
  };
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
