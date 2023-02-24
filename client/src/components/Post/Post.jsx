import React from "react";
import { fileSorter } from "../../Utils/sorter";

import "./post.scss";

const Post = ({ obj }) => {
  return (
    <div className="post">
      <div className="author">
        {obj.author?.avatarUrl && <img src={obj.user.avatarUrl} alt="" />}
        <div className="text">
          <span>{obj.author.fristName + " " + obj.author.lastName}</span>
          <span>@{obj.author.username}</span>
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

      <span>{obj.likes.length} likes</span>
    </div>
  );
};

export default Post;
