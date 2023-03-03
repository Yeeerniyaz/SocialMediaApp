import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProfileMax.scss";
import { fetchUpdate } from "../../redux/slices/auth";
import axios from "../../axios";

import { UilMapMarker, UilBag, UilInstagram } from "@iconscout/react-unicons";

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

const ProfileMax = ({ profile, isLoading }) => {
  const me = useSelector((state) => state.auth.data);
  const coverRef = React.useRef();
  const dispatch = useDispatch();
  const { username } = useParams();
  const [openedModal, setOpenedModal] = React.useState(false);
  const isFollow = Boolean(me.follows.find((e) => e === profile?._id));

  function Clicklogout() {
    window.localStorage.removeItem("token");
    dispatch(logout());
  }

  if (isLoading !== "loaded") {
    return (
      <div className='profileMaxSkeleton' style={{ height: "300px"}}>
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

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("file", file);
      await axios.post("/send", formData).then(({ data }) => {
        dispatch(fetchUpdate({ coverUrl: data }));
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading !== "loaded") {
    return (
      <div className="profileMaxSkeleton" style={{ height: "300px" }}>
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      <div className="ProfileMax">
        <div className="img-c">
          {profile?.coverUrl ? (
            <img
              src={`http://192.168.43.127:5000/${profile.coverUrl}`}
              alt=""
            />
          ) : (
            profile?.avatarUrl && (
              <img
                src={`http://192.168.43.127:5000/${profile.avatarUrl}`}
                alt=""
                className="coverAva"
              />
            )
          )}

          {profile._id === me._id && (
            <div
              className="button"
              onClick={() => {
                coverRef.current.click();
              }}
            >
              <span>Изменить обложку</span>
            </div>
          )}
        </div>
        <div className={`profileInfo`}>
          {profile?.avatarUrl && (
            <img
              src={`http://192.168.43.127:5000/${profile.avatarUrl}`}
              alt=""
            />
          )}
          <div
            className={`proofileName ${profile?.avatarUrl ? "" : "noAvatar"}`}
          >
            <span>{profile.fristName + " " + profile.lastName}</span>
            {profile?.status ? (
              <span>{profile.status}</span>
            ) : (
              <span>@{profile.username}</span>
            )}
          </div>
        </div>

        <input type="file" onChange={handleChangeFile} ref={coverRef} hidden />
      </div>

      <div className="ProfieCard ProfieCardProfile ">
        <div className="img-c">
          {profile?.coverUrl ? (
            <img
              src={`http://192.168.43.127:5000/${profile.coverUrl}`}
              alt=""
            />
          ) : (
            profile?.avatarUrl && (
              <img
                src={`http://192.168.43.127:5000/${profile.avatarUrl}`}
                alt=""
                className="coverAva"
              />
            )
          )}
          {profile._id === me._id && (
            <div
              className="button"
              onClick={() => {
                coverRef.current.click();
              }}
            >
              <span>Изменить обложку</span>
            </div>
          )}
        </div>
        <div className="ProfileSection">
          <div className="ProfileImg">
            {profile?.avatarUrl && (
              <img
                src={`http://192.168.43.127:5000/${profile.avatarUrl}`}
                alt=""
              />
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

        {username === me.username && (
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
    </>
  );
};

export default ProfileMax;
