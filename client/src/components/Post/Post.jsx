import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";

import { UilComment } from "@iconscout/react-unicons";
import { UilHeart } from "@iconscout/react-unicons";
import { UilMessage } from "@iconscout/react-unicons";
import { UilUserPlus } from "@iconscout/react-unicons";
import { UilUserMinus } from "@iconscout/react-unicons";
import { UilTrash } from "@iconscout/react-unicons";
import redHeard from "../../image/redHeard.png";

import "./post.scss";
import axios from "../../axios";
import Comments from "../Comments/Comments.jsx";
import { fetchCreateComment, fetchDeletePost } from "../../redux/slices/post";
import {
  fetchAddFollow,
  fetchRemoveFollow,
  removePost,
} from "../../redux/slices/auth";
import { fileSorter } from "../../Utils/sorter";

const Post = ({ obj }) => {
  const date = new moment(obj.createdAt);
  const user = useSelector((state) => state.auth.data);
  const isLikes = Boolean(obj.likes.find((arr) => arr === user._id));
  const [likeCount, setIsCount] = React.useState(obj.likes.length);
  const [isLiked, setIsLiked] = React.useState(isLikes);
  const [text, setText] = React.useState("");
  const [showAll, setShowAll] = React.useState(false);
  const isFollow = user.follows;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function buttonSubscribe() {
    if (isFollow.some((e) => e === obj.author._id)) {
      dispatch(fetchRemoveFollow(obj.author._id));
    } else {
      dispatch(fetchAddFollow(obj.author._id));
    }
  }

  function postDelete() {
    dispatch(fetchDeletePost(obj._id));
    dispatch(removePost(obj._id));
  }

  function likeButton() {
    if (isLiked) {
      setIsLiked(false);
      setIsCount(likeCount - 1);
    } else {
      setIsLiked(true);
      setIsCount(likeCount + 1);
    }
    axios.get(`post/like/${obj._id}`);
  }

  async function commentCreate() {
    setText("");
    await dispatch(fetchCreateComment({ id: obj._id, text }));
  }

  return (
    <div className="post">
      <div className="author">
        <div className="text">
          {obj.author?.avatarUrl && (
            <img src={`http://localhost:5000/${obj.author.avatarUrl}`} alt="" />
          )}
          <div>
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
          <UilTrash onClick={postDelete} />
        )}
      </div>

      <hr />

      <div className="title">
        <p>{obj.title}</p>
        {obj.tags.map((t) => (
          <span
            key={t}
            onClick={() => {
              navigate(`/tag/${t}`);
            }}
          >
            #{t}
          </span>
        ))}
      </div>

      {obj.file && (
        <img src={`http://192.168.43.127:5000/${obj.file}`} alt="" />
      )}

      {fileSorter(obj.file)?.type === "video" && (
        <video
          src={`http://192.168.43.127:5000/${obj.file}`}
          controls
          preload="on"
          alt=""
        />
      )}

      {fileSorter(obj.file)?.type === "audio" && (
        <audio src={`http://192.168.43.127:5000/${obj.file}`} alt="" controls />
      )}

      <div className="postDetail">
        <div onClick={likeButton}>
          {isLiked ? <img src={redHeard} alt="" /> : <UilHeart />}
          <span>{likeCount} </span>
        </div>
        <div>
          <UilComment />
          <span>{obj.comments.length} </span>
        </div>
      </div>
      <div className="Comments">
        {showAll &&
          obj.comments.map((com) => {
            return <Comments obj={com} postId={obj._id} key={com.date} />;
          })}
      </div>

      {obj.comments.length > 0 && (
        <div
          className="showAll"
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          {showAll ? "Скрыть комментарий" : "Показать комментарий"}
        </div>
      )}

      <div className="commentBlock">
        <input
          type="text"
          placeholder="Написать комментарий..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <UilMessage onClick={commentCreate} />
      </div>
    </div>
  );
};

export default Post;
