import React from "react";

import "./ProfileCenter.scss";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import ProfileMax from "../ProfileMax/ProfileMax.jsx";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProfileCenter = () => {
  const { username } = useParams();
  const GetMe = useSelector((state) => state.auth.data);
  const GetUser = useSelector((state) => state.user.getUser);
  const isLoadingMe = useSelector((state) => state.auth.status);
  const isLoadingUser = useSelector((state) => state.user.status.getUser);

  if (isLoadingMe !== "loaded") {
    return <div></div>;
  }

  return (
    <div className="ProfileCenter">
      {username === GetMe.username && (
        <ProfileMax profile={GetMe} isLoading={isLoadingMe} />
      )}
      {username !== GetMe.username && (
        <ProfileMax profile={GetUser} isLoading={isLoadingUser} />
      )}
      <PostShare />
      <Posts />
    </div>
  );
};

export default ProfileCenter;
