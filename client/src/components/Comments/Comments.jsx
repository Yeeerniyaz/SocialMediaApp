import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ru";

import { UilUserPlus } from "@iconscout/react-unicons";
import { UilUserMinus } from "@iconscout/react-unicons";
import { UilTrash } from "@iconscout/react-unicons";

import "./style.scss";
import { fetchdeleteComment } from "../../redux/slices/post";
import { fetchAddFollow, fetchRemoveFollow } from "../../redux/slices/auth";

const Comments = ({ obj, postId }) => {
  const user = useSelector((state) => state.auth.data);
  const isFollow = user.follows;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const date = new moment(obj.date);

  function buttonSubscribe() {
    if (isFollow.some((e) => e === obj.author._id)) {
      dispatch(fetchRemoveFollow(obj.author._id));
    } else {
      dispatch(fetchAddFollow(obj.author._id));
    }
  }

  async function commentDelete() {
    dispatch(fetchdeleteComment({ postId, id: obj._id }));
  }

  return (
    <div className="comment">
      <div className="author">
        <div>
          <img src={`http://localhost:5000/${obj.author.avatarUrl}`} alt="" />
          <div className="text">
            <span onClick={() => navigate(`/profile/${obj.author.username}`)}>
              {obj.author.fristName + " " + obj.author.lastName}
            </span>
            <span>{date.calendar()}</span>
          </div>
        </div>

        {user._id !== obj.author._id ? (
          isFollow.some((e) => e === obj.author._id) ? (
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
