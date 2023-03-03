import React from "react";

import "./right.scss";
import TrendCard from "../TrendCard/TrendCard.jsx";
import { Navbar } from "../Navbar/Navbar";

const RightSide = () => {
  return (
    <div className="RightSide">
      <Navbar />
      <TrendCard />
    </div>
  );
};

export default RightSide;
