import React from "react";

import ProfileCard from "../ProfileCard/ProfileCard.jsx";
import FollwersCard from "../FollwersCard/FollwersCard.jsx";
import "./left.scss";

const PofileSide = () => {
  return (
    <div className="homeLeft">
      <ProfileCard />
      <FollwersCard />
    </div>
  );
};

export default PofileSide;
