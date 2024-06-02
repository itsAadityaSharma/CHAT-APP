import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
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
