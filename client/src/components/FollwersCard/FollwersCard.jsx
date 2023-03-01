import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,  useNavigate } from "react-router-dom";

import "./style.scss";
import Skeleton from "../Skeleton/Skeleton";
import { fetchRemoveFollow, fetchAddFollow } from "../../redux/slices/auth";

const FollwersCard = () => {
  const followers = useSelector((state) => state.user.followers);
  const isloading = useSelector((state) => state.user.status.followers);

  if (isloading !== "loaded") {
    return (
      <div style={{ height: "300px" }}>
        <Skeleton />
      </div>
    );
  }

  if (followers.length <= 0) {
    return <div></div>;
  }

  return (
    <div className="FollwersCard">
      <h3>Подписчики</h3>
      {followers.slice(0, 6).map((obj) => {
        return <Card obj={obj} key={obj._id} />;
      })}

      {followers.length >= 6 && <Link to="/fiends">показать всех</Link>}
    </div>
  );
};

function Card({ obj }) {
  const me = useSelector((state) => state.auth.data);
  const isFollow = Boolean(me.follows.find((e) => e === obj?._id));

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function buttonSubscribe() {
    if (isFollow) {
      dispatch(fetchRemoveFollow(obj._id));
    } else {
      dispatch(fetchAddFollow(obj._id));
    }
  }

  return (
    <div className="users">
      <div
        onClick={() => {
          navigate("/profile/" + obj.username);
        }}
      >
        {obj?.avatarUrl && (
          <img src={`http://localhost:5000/${obj.avatarUrl}`} alt="" />
        )}
        <div className="span">
          <span>{obj.fristName + " " + obj.lastName}</span>
          <span>@{obj.username}</span>
        </div>
      </div>
      <div className="button button-m" onClick={buttonSubscribe}>
        {isFollow ? <div>отписаться</div> : <div>подписатся</div>}
      </div>
    </div>
  );
}

export default FollwersCard;
