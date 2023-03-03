import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";
import { UilSetting } from "@iconscout/react-unicons";
import { UilComment } from "@iconscout/react-unicons";
import { UilEstate } from "@iconscout/react-unicons";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal.jsx";

export function Navbar() {
  const [openedModal, setOpenedModal] = React.useState(false);
  const isLoading = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="navIcon">
      <UilEstate
        onClick={() => {
          navigate("/");
        }}
      />
      <UilSetting
        onClick={() => {
          setOpenedModal(true);
        }}
      />
      <UilComment
        onClick={() => {
          navigate("/chat");
        }}
      />
      <UilSignOutAlt
        onClick={() => {
          navigate("/auth");
          window.localStorage.removeItem("token");
          dispatch(logout());
        }}
      />
      {isLoading === "loaded" && (
        <ProfileEditModal
          setOpenedModal={setOpenedModal}
          openedModal={openedModal}
        />
      )}
    </div>
  );
}
