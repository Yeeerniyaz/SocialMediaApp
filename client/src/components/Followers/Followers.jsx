import React from "react";

import { Modal } from "@mantine/core";

import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

import "./style.scss";
import Skeleton from "../Skeleton/Skeleton";
import { fetchRemoveFollow, fetchAddFollow } from "../../redux/slices/auth";


function Follows({ setOpenedFollowers, openedFollowers }) {
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
    <Modal
      padding={-5}
      radius={"1.1rem"}
      withCloseButton={false}
      size="auto"
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={openedFollowers}
      onClose={() => {
        setOpenedFollowers(false);
      }}
    >
      <div className="Follows">
        <h3>Подписчики</h3>
        <div className="FollwersCard">
          {followers.map((obj) => {
            return <FollowsItem obj={obj} key={obj._id} />;
          })}
        </div>
      </div>
    </Modal>
  );
}

function FollowsItem({ obj }) {
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

export default Follows;
