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
import redHeard from "../../image/redHeard.png";

import "./post.scss";
import axios from "../../axios";
import Comments from "../Comments/Comments.jsx";
import { fetchCreateComment } from "../../redux/slices/post";
import { fileSorter } from "../../Utils/sorter";

const Post = ({ obj }) => {
  const date = new moment(obj.createdAt);
  const user = useSelector((state) => state.auth.data);
  const isLikes = Boolean(obj.likes.find((arr) => arr === user._id));
  const findFollow = Boolean(
    user.follows.find((arr) => arr === obj.author._id)
  );
  const [likeCount, setIsCount] = React.useState(obj.likes.length);
  const [isLiked, setIsLiked] = React.useState(isLikes);
  const [subscribe, setSubscribe] = React.useState(findFollow);
  const [text, setText] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  function buttonSubscribe() {
    if (subscribe) {
      setSubscribe(false);
    } else {
      setSubscribe(true);
    }
  }

  const CommentCreate = async () => {
    const data = await dispatch(fetchCreateComment({ id: obj._id, text }));
  };

  return (
    <div className="post">
      <div className="author">
        {obj.author?.avatarUrl && <img src={obj.user.avatarUrl} alt="" />}
        <div className="text">
          <span onClick={() => navigate(`/profile/${obj.author.username}`)}>
            {obj.author.fristName + " " + obj.author.lastName}
          </span>
          <span>{date.calendar()}</span>
        </div>
        {user._id !== obj.author._id &&
          (subscribe ? <UilUserMinus /> : <UilUserPlus />)}
      </div>

      <div className="title">
        <p>{obj.title}</p>
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

      {obj.comments.slice(0, 2).map((obj) => {
        return <Comments obj={obj} key={obj.date} />;
      })}

      <div className="commentBlock">
        <input
          type="text"
          placeholder="Написать комментарий..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <UilMessage onClick={CommentCreate} />
      </div>
    </div>
  );
};

export default Post;
