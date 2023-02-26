import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ru";

import { UilUserPlus } from "@iconscout/react-unicons";
import { UilUserMinus } from "@iconscout/react-unicons";
import { UilTrash } from "@iconscout/react-unicons";

import "./style.scss";
import axios from "../../axios";

const Comments = ({ obj, postId }) => {
  const user = useSelector((state) => state.auth.data);
  const findFollow = Boolean(
    user.follows.find((arr) => arr === obj.author._id)
  );
  const [subscribe, setSubscribe] = React.useState(findFollow);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const date = new moment(obj.date);

  function buttonSubscribe() {
    if (subscribe) {
      setSubscribe(false);
      axios.patch(`/user/un/${obj.author._id}`);
    } else {
      setSubscribe(true);
      axios.patch(`/user/i/${obj.author._id}`);
    }
  }

  async function commentDelete() {
    axios.get(`/post/comment/${postId}/${obj._id}`);
  }


  return (
    <div className="comment">
      <div className="author">
        {obj.author?.avatarUrl && <img src={obj.user.avatarUrl} alt="" />}
        <div className="text">
          <span onClick={() => navigate(`/profile/${obj.author.username}`)}>
            {obj.author.fristName + " " + obj.author.lastName}
          </span>
          <span>{date.calendar()}</span>
        </div>
        {user._id !== obj.author._id ? (
          subscribe ? (
            <UilUserMinus onClick={buttonSubscribe} />
          ) : (
            <UilUserPlus onClick={buttonSubscribe} />
          )
        ) : (
          <UilTrash onClick={commentDelete} />
        )}
      </div>
      <hr />
      <p>{obj.text}</p>
    </div>
  );
};

export default Comments;
