import React from "react";

import "./right.scss";
import TrendCard from "../TrendCard/TrendCard.jsx";
import { UilSetting } from "@iconscout/react-unicons";
import { UilComment } from "@iconscout/react-unicons";
import { UilEstate } from "@iconscout/react-unicons";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth";

const RightSide = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="RightSide">
      <div className="navIcon">
        <UilEstate
          onClick={() => {
            navigate("/");
          }}
        />
        <UilSetting />
        <UilComment />
        <UilSignOutAlt
          onClick={() => {
            navigate("/auth");
            window.localStorage.removeItem("token");
            dispatch(logout());
          }}
        />
      </div>
      <TrendCard />
    </div>
  );
};

export default RightSide;
