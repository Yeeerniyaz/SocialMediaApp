import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./left.scss";
import ProfileCard from "../ProfileCard/ProfileCard.jsx";
import FollwersCard from "../FollwersCard/FollwersCard.jsx";
import Skeleton from "../Skeleton/Skeleton.jsx";
import Search from "../Search/Search.jsx";

const PofileSide = () => {
  const { username } = useParams();
  const GetMe = useSelector((state) => state.auth.data);
  const GetUser = useSelector((state) => state.user.getUser.user);
  const isLoadingMe = useSelector((state) => state.auth.status);
  const isLoadingUser = useSelector((state) => state.user.status.getUser);

  if (isLoadingMe !== "loaded") {
    return (
      <div className="skeletonHL  homeLeft">
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (username === undefined) {
    return (
      <div className="homeLeft">
        <Search />
        <ProfileCard profile={GetMe} isLoading={isLoadingMe} />
        <FollwersCard />
      </div>
    );
  }

  return (
    <div className="homeLeft">
      <Search />
      {username === GetMe.username && (
        <ProfileCard profile={GetMe} isLoading={isLoadingMe} />
      )}
      {username !== GetMe.username && (
        <ProfileCard profile={GetUser} isLoading={isLoadingUser} />
      )}
      <FollwersCard />
    </div>
  );
};

export default PofileSide;
