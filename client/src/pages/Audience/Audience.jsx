import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchRemoveFollow } from "../../redux/slices/auth";
import { fetchAddFollow } from "../../redux/slices/auth";

import "./style.scss";
import Skeleton from "../../components/Skeleton/Skeleton";
import { SelectIsAuth } from "../../redux/slices/auth";

export function Audience() {
  const navigate = useNavigate();
  const [toggle, setToggle] = React.useState(true);
  const isAuth = useSelector(SelectIsAuth);

  if (window.localStorage.getItem("token") && !isAuth) {
    navigate("/auth");
  }

  return (
    <div className="Audience">
      <h1>{toggle ? "Подписки" : "Подписчики"}</h1>
      <div className="toggle">
        <button
          className={toggle && "isActive"}
          onClick={() => {
            setToggle(true);
          }}
        >
          Подписки
        </button>
        <button
          className={!toggle && "isActive"}
          onClick={() => {
            setToggle(false);
          }}
        >
          Подписчики
        </button>
      </div>
      <Items toggle={toggle} />
    </div>
  );
}

function Items({ toggle }) {
  const follows = useSelector((state) => state.user.follows);
  const followers = useSelector((state) => state.user.followers);
  const isloadingFlwrs = useSelector((state) => state.user.status.follows);
  const isloadingFlws = useSelector((state) => state.user.status.followers);

  if (toggle) {
    if (isloadingFlws !== "loaded") {
      return (
        <div style={{ height: "300px" }}>
          <Skeleton />
        </div>
      );
    } else {
      if (follows.length <= 0) {
        return <div></div>;
      } else {
        return (
          <div className="items">
            {follows.slice(0, 6).map((obj) => {
              return <Card obj={obj} key={obj._id} />;
            })}
          </div>
        );
      }
    }
  }

  if (!toggle) {
    if (isloadingFlwrs !== "loaded") {
      return (
        <div style={{ height: "300px" }}>
          <Skeleton />
        </div>
      );
    } else {
      if (followers.length <= 0) {
        return <div></div>;
      } else {
        return (
          <div className="items">
            {followers.slice(0, 6).map((obj) => {
              return <Card obj={obj} key={obj._id} />;
            })}
          </div>
        );
      }
    }
  }
}

function Card({ obj }) {
  const me = useSelector((state) => state.auth.data);
  const isFollow = Boolean(me?.follows.find((e) => e === obj?._id));
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
          <img src={`http://192.168.43.127:5000/${obj.avatarUrl}`} alt="" />
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
