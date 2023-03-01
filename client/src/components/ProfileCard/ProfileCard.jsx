import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UilMapMarker, UilBag, UilInstagram } from "@iconscout/react-unicons";

import "./ProfileCard.css";
import {
  fetchRemoveFollow,
  fetchAddFollow,
  logout,
} from "../../redux/slices/auth";
import { followConventor } from "../../Utils/sorter.js";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal.jsx";
import { NavLink, useParams } from "react-router-dom";
import Skeleton from "../Skeleton/Skeleton";
import { followersIncMax, followersIncMin } from "../../redux/slices/user";

const ProfileCard = ({ profile, isLoading }) => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const [openedModal, setOpenedModal] = React.useState(false);
  const me = useSelector((state) => state.auth.data);
  const isFollow = Boolean(me.follows.find((e) => e === profile?._id));

  function Clicklogout() {
    window.localStorage.removeItem("token");
    dispatch(logout());
  }

  if (isLoading !== "loaded") {
    return (
      <div style={{ height: "300px" }}>
        <Skeleton />
      </div>
    );
  }

  function buttonSubscribe() {
    if (isFollow) {
      dispatch(fetchRemoveFollow(profile._id));
      dispatch(followersIncMin(me._id));
    } else {
      dispatch(fetchAddFollow(profile._id));
      dispatch(followersIncMax(me._id));
    }
  }

  return (
    <div className="ProfieCard">
      <div className="ProfileSection">
        <div className="ProfileImg">
          {profile?.avatarUrl && (
            <img src={`http://localhost:5000/${profile.avatarUrl}`} alt="" />
          )}
        </div>
        <NavLink className="ProfileName" to={`/profile/${profile.username}`}>
          <span>{profile.fristName + " " + profile.lastName}</span>
          <span>@{profile.username}</span>
        </NavLink>
      </div>

      {profile._id !== me._id && (
        <div className="buttonSubscribe" onClick={buttonSubscribe}>
          {isFollow ? <div>отписаться</div> : <div>подписатся</div>}
        </div>
      )}

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

      <p>{profile.status}</p>

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

      {username === undefined && (
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
      )}
    </div>
  );
};

export default ProfileCard;
