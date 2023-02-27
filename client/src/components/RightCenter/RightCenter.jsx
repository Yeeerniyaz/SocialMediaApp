import React from "react";

import "./right.scss";
import TrendCard from "../TrendCard/TrendCard.jsx";
import { UilSetting } from "@iconscout/react-unicons";
import { UilComment } from "@iconscout/react-unicons";
import { UilEstate } from "@iconscout/react-unicons";
import { UilBell } from "@iconscout/react-unicons";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div className="navIcon">
        <UilEstate />
        <UilSetting />
        <UilComment />
        <UilBell />
      </div>

      <TrendCard />
    </div>
  );
};

export default RightSide;
