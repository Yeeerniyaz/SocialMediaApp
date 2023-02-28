import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProfileMax.scss";
import axios from "../../axios";
import { fetchUpdate } from "../../redux/slices/auth";

const ProfileMax = ({ profile, isLoading }) => {
  const me = useSelector((state) => state.auth.data);
  const coverRef = React.useRef();
  const dispatch = useDispatch();

  if (isLoading !== "loaded") {
    return <div></div>;
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

  return (
    <div className="ProfileMax">
      <div className="img-c">
        {profile?.coverUrl ? (
          <img src={`http://localhost:5000/${profile.coverUrl}`} alt="" />
        ) : (
          profile?.avatarUrl && (
            <img
              src={`http://localhost:5000/${profile.avatarUrl}`}
              alt=""
              className="coverAva"
            />
          )
        )}
        <div
          className="button"
          onClick={() => {
            coverRef.current.click();
          }}
        >
          {profile._id === me._id && <span>Изменить обложку</span>}
        </div>
      </div>
      <div className={`profileInfo`}>
        {profile?.avatarUrl && (
          <img src={`http://localhost:5000/${profile.avatarUrl}`} alt="" />
        )}
        <div className={`proofileName ${profile?.avatarUrl ? "" : "noAvatar"}`}>
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
  );
};

export default ProfileMax;
