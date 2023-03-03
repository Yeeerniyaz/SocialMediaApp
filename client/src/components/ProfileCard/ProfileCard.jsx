import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UilMapMarker, UilBag, UilInstagram } from "@iconscout/react-unicons";

import "./ProfileCard.css";
import { fetchRemoveFollow, fetchAddFollow } from "../../redux/slices/auth";
import { followConventor } from "../../Utils/sorter.js";
import { NavLink } from "react-router-dom";
import Skeleton from "../Skeleton/Skeleton";
import { followersIncMax, followersIncMin } from "../../redux/slices/user";
import Follows from "../Follows/Follows";
import Followers from "../Followers/Followers";

const ProfileCard = ({ profile, isLoading }) => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.auth.data);
  const isFollow = Boolean(me.follows.find((e) => e === profile?._id));
  const [openedFollowers, setOpenedFollowers] = React.useState(false);
  const [openedFollows, setOpenedFollows] = React.useState(false);

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

          <div
            className="follow"
            onClick={() => {
              setOpenedFollowers(true);
            }}
          >
            <span>{followConventor(profile.followers.length)}</span>
            <span>подписчики</span>
          </div>

          <div className="vl"></div>

          <div
            className="follow"
            onClick={() => {
              setOpenedFollows(true);
            }}
          >
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
      <Followers
        openedFollowers={openedFollowers}
        setOpenedFollowers={setOpenedFollowers}
      />
      <Follows
        openedFollows={openedFollows}
        setOpenedFollows={setOpenedFollows}
      />
    </div>
  );
};

export default ProfileCard;
