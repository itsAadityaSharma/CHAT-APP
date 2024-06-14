import React, { useState } from "react";
import { MdOutlineChat } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser, setToken, setUser } from "../redux/userSlice";
import Avatar from "./Avatar";
import EditUserDetails from "./EditUserDetails";

const Sidebar = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateUser = useSelector(loggedInUser);
  const [editUserDetails, setEditUserDetails] = useState(false);

  const handleLogOut = async (e) => {
    setSelected("logout");
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/logout`;
      const response = await fetch(URL, {
        method: "GET",
      });
      console.log(response);

      dispatch(setUser(null));
      dispatch(setToken(""));

      navigate("/email");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="bg-slate-100 h-full w-12 rounded-tr-md rounded-br-lg py-5 flex flex-col justify-between">
        <div>
          <div
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded ${
              selected === "chat" && "bg-slate-400"
            }`}
            title="Chat"
            onClick={() => setSelected("chat")}
          >
            <MdOutlineChat size={25} />
          </div>
          <div
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded ${
              selected === "user" && "bg-slate-400"
            }`}
            title="Add friend"
            onClick={() => setSelected("user")}
          >
            <FaUserPlus size={25} />
          </div>
        </div>
        <div>
          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded p-2"
            title={stateUser?.name}
            onClick={() => setEditUserDetails(true)}
          >
            <Avatar profile={stateUser?.profile_pic}></Avatar>
          </div>
          <div
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded ${
              selected === "logout" && "bg-slate-400"
            }`}
            title="Logout"
            onClick={(e) => handleLogOut(e)}
          >
            <RiLogoutBoxLine size={25} />
          </div>
        </div>
      </div>
      {editUserDetails ? (
        <EditUserDetails setEditUserDetails={setEditUserDetails} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Sidebar;
