import React from "react";
import { useSelector } from "react-redux";

import "./Posts.scss";
import Post from "../Post/Post.jsx";
import Skeleton from '../Skeleton/Skeleton';

const Posts = ({ post, isLoading }) => {
  const PostData = useSelector((state) => state.post.data);
  const isloadingP = useSelector((state) => state.post.status);
  const isloadingA = useSelector((state) => state.auth.status);

  if (isloadingP !== "loaded" || isloadingA !== "loaded") {
    return (
      <div style={{ height: "1000px" }}>
        <Skeleton />
      </div>
    );
  }

  if (post) {
    if (isLoading === "loaded") {
      return (
        <div className="posts">
          {post.map((obj) => {
            return <Post obj={obj} key={obj._id} />;
          })}
        </div>
      );
    } else {
      return (
        <div style={{ height: "300px" }}>
          <Skeleton />
        </div>
      );
    }
  }

  return (
    <div className="posts">
      {PostData.map((obj) => {
        return <Post obj={obj} key={obj._id} />;
      })}
    </div>
  );
};

export default Posts;
