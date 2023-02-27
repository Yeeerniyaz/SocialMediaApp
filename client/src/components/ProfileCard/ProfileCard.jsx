import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { UilMapMarker, UilBag, UilInstagram } from "@iconscout/react-unicons";

import "./ProfileCard.css";
import { logout } from "../../redux/slices/auth";
import { followConventor } from "../../Utils/sorter.js";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal.jsx";

const ProfileCard = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.data);
  const isLoading = useSelector((state) => state.auth.status);
  const [openedModal, setOpenedModal] = React.useState(true);

  function Clicklogout() {
    window.localStorage.removeItem("token");
    dispatch(logout());
  }

  if (isLoading !== "loaded") {
    return <div></div>;
  }

  return (
    <div className="ProfieCard">
      <div className="ProfileSection">
        <div className="ProfileImg">
          {profile?.avatarUrl && <img src={profile.avatarUrl} alt="" />}
        </div>

        <div className="ProfileName">
          <span>{profile.fristName + " " + profile.lastName}</span>
          <span>@{profile.username}</span>
        </div>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{followConventor(profile.posts.length)}</span>
            <span>посты</span>
          </div>

          <div className="vl"></div>

          <div className="follow">
            <span>{followConventor(profile.followers.length)}</span>
            <span>подписчики</span>
          </div>

          <div className="vl"></div>

          <div className="follow">
            <span>{followConventor(profile.follows.length)}</span>
            <span>подписки</span>
          </div>
        </div>
        <hr />
      </div>

      <div className="ProfileInfo">
        {profile?.location && (
          <div>
            <UilMapMarker
              style={{ width: "1.3rem", marginRight: "4px", opacity: "0.7" }}
            />
            <p>{profile.location}</p>
          </div>
        )}

        {profile?.social && (
          <div>
            <UilInstagram
              style={{ width: "1.3rem", marginRight: "4px", opacity: "0.7" }}
            />
            <p>{profile.social}</p>
          </div>
        )}

        {profile.profession && (
          <div>
            <UilBag
              style={{ width: "1.3rem", marginRight: "4px", opacity: "0.7" }}
            />
            <p>{profile.profession}</p>
          </div>
        )}
      </div>

      <div className="controler">
        <ProfileEditModal
          setOpenedModal={setOpenedModal}
          openedModal={openedModal}
        />
        <div
          onClick={() => {
            setOpenedModal(true);
          }}
        >
          Редактировать
        </div>
        <button className="button log-btn" onClick={Clicklogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
