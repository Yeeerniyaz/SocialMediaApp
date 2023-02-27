import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const FollwersCard = () => {
  const followers = useSelector((state) => state.user.followers);
  const isloading = useSelector((state) => state.user.status.followers);
  const navigate = useNavigate();

  if (isloading === "loading") {
    return <div>loading</div>;
  }

  if (followers.length <= 0) {
    return <div></div>;
  }

  return (
    <div className="FollwersCard">
      <h3>Подписчики</h3>
      {followers.slice(0, 6).map((obj) => {
        return (
          <div
            className="users"
            key={obj._id}
            onClick={() => {
              navigate("/profile/" + obj.username);
            }}
          >
            <div>
              {obj?.avatarUrl && (
                <img src={`http://localhost:5000/${obj.avatarUrl}`} alt="" />
              )}
              <div className="span">
                <span>{obj.fristName + " " + obj.lastName}</span>
                <span>@{obj.username}</span>
              </div>
            </div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};

export default FollwersCard;
