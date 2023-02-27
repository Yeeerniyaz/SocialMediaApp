import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";
const FollwersCard = () => {
  const followers = useSelector((state) => state.user.followers);
  const isloading = useSelector((state) => state.user.status.followers);

  if (isloading === "loading") {
    return <div>loading</div>;
  }

  return (
    <div className="FollwersCard">
      <h3>Подписчики</h3>
      {followers.map((obj) => {
        return (
          <div className="users" key={obj._id}>
            <div>
              <div>
                <img src={obj.avatarUrl} alt="" />
              </div>
              <div>
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
