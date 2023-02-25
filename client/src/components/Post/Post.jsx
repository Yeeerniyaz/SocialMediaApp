import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { UilComment } from "@iconscout/react-unicons";
import { UilHeart } from "@iconscout/react-unicons";
import { UilMessage } from "@iconscout/react-unicons";
import redHeard from "../../image/redHeard.png";
import { fileSorter } from "../../Utils/sorter";

import axios from "../../axios";
import "./post.scss";
import Comments from "../Comments/Comments.jsx";

const Post = ({ obj }) => {
  const user = useSelector((state) => state.auth.data);
  const isLikes = Boolean(obj.likes.find(() => user._id));
  const [likeCount, setIsCount] = React.useState(obj.likes.length);
  const [isLiked, setIsLiked] = React.useState(isLikes);
  const [text, setText] = React.useState("");
  const navigate = useNavigate();

  const LikeButton = () => {
    if (isLiked) {
      setIsLiked(false);
      setIsCount(likeCount - 1);
    } else {
      setIsLiked(true);
      setIsCount(likeCount + 1);
    }
    axios.get(`post/like/${obj._id}`);
  };

  const CommentCreate = () => {
    axios.post(`post/comment/${obj._id}`, text);
  };

  return (
    <div className="post">
      <div className="author">
        {obj.author?.avatarUrl && <img src={obj.user.avatarUrl} alt="" />}
        <div className="text">
          <span>{obj.author.fristName + " " + obj.author.lastName}</span>
          <span onClick={() => navigate(`/profile/${obj.author.username}`)}>
            @{obj.author.username}
          </span>
        </div>
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

      <div className="postReact"></div>

      <div className="postDetail">
        <div onClick={LikeButton}>
          {isLiked ? <img src={redHeard} alt="" /> : <UilHeart />}
          <span>{likeCount} </span>
        </div>
        <div>
          <UilComment />
          <span>{obj.comments.length} </span>
        </div>
      </div>
      {obj.comments.map((obj) => {
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
