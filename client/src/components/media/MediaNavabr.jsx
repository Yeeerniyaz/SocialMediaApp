import React from "react";

import { UilComment } from "@iconscout/react-unicons";
import { UilEstate } from "@iconscout/react-unicons";
import { UilUserCircle } from "@iconscout/react-unicons";
import { UilUser } from "@iconscout/react-unicons";
import { UilSearch } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";

export function Navbar() {
  const me = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

  return (
    <div className="navIconMedia navIcon  ">
      <UilEstate
        onClick={() => {
          navigate("/");
        }}
      />

      <UilSearch
        onClick={() => {
          navigate("/search");
        }}
      />

      <UilUser
        onClick={() => {
          navigate("/audience");
        }}
      />

      <UilComment
        onClick={() => {
          navigate("/chat");
        }}
      />

      <UilUserCircle
        onClick={() => {
          navigate(`/profile/${me.username}`);
        }}
      />
    </div>
  );
}
