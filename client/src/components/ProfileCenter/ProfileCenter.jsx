import React from "react";

import "./ProfileCenter.scss";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import ProfileMax from "../ProfileMax/ProfileMax.jsx";

const ProfileCenter = () => {
  return (
    <div className="ProfileCenter">
      <ProfileMax />
      <PostShare />
      <Posts />
    </div>
  );
};

export default ProfileCenter;
