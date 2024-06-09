import React from "react";
import { PiUserCircle } from "react-icons/pi";

const Avatar = ({ profile }) => {
  return (
    <div className="w-fit mx-auto mb-2">
      {profile ? (
        <img
          className="rounded-full"
          height={120}
          width={120}
          src={profile}
        ></img>
      ) : (
        <PiUserCircle size={80} />
      )}
    </div>
  );
};

export default Avatar;
