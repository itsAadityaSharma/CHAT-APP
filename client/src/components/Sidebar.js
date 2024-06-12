import React from "react";
import { MdOutlineChat } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-full h-full">
      <div className="bg-slate-100 h-full w-12 rounded-tr-md rounded-br-lg py-5">
        <div
          className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          title="chat"
        >
          <MdOutlineChat size={25} />
        </div>
        <div
          className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          title="User"
        >
          <FaUserPlus size={25} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
