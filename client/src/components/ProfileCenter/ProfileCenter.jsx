import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./ProfileCenter.scss";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import ProfileMax from "../ProfileMax/ProfileMax.jsx";
import Skeleton from '../Skeleton/Skeleton';

const ProfileCenter = () => {
  const { username } = useParams();
  const GetMe = useSelector((state) => state.auth.data);
  const GetUser = useSelector((state) => state.user.getUser.user);
  const isLoadingMe = useSelector((state) => state.auth.status);
  const isLoadingUser = useSelector((state) => state.user.status.getUser);
  const post = useSelector((state) => state.user.getUser.post);

  if (isLoadingMe !== "loaded") {
    return (
      <div
        style={{
          height: "700px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="ProfileCenter">
      {username === GetMe.username && (
        <ProfileMax profile={GetMe} isLoading={isLoadingMe} />
      )}
      {username !== GetMe.username && (
        <ProfileMax profile={GetUser} isLoading={isLoadingUser} />
      )}
      {username === GetMe.username && <PostShare />}
      {username === GetMe.username && (
        <Posts post={GetMe.posts} isLoading={isLoadingUser} />
      )}
      {username !== GetMe.username && (
        <Posts post={post} isLoading={isLoadingUser} />
      )}
    </div>
  );
};

export default ProfileCenter;
