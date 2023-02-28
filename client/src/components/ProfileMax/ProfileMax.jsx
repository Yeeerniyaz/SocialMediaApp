import React from "react";
import { useSelector } from "react-redux";

import "./ProfileMax.scss";

const ProfileMax = () => {
  const profile = useSelector((state) => state.user.gerUser);
  const isLoading = useSelector((state) => state.user.status.gerUser);

  console.log(isLoading + profile );

  if (isLoading !== "loaded") {
    return <div></div>;
  }

  return (
    <div className="ProfileMax">
      <div className="img-c">
        <img src={`http://localhost:5000/${profile.avatarUrl}`} alt="" />
        <div className="button">
          <span>Change cover</span>
        </div>
      </div>
      <div className="profileInfo">
        <img src={`http://localhost:5000/${profile.avatarUrl}`} alt="" />
        <div className="proofileName">
          <span>{profile.fristName + " " + profile.lastName}</span>
          <span>{profile.status}</span>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProfileMax;
