import React from "react";
import { useSelector } from "react-redux";

import "./Posts.scss";
import axios from "../../axios";
import Post from "../Post/Post.jsx";
import Skeleton from "../Skeleton/Skeleton";
import { useParams } from "react-router-dom";

const Posts = ({ post, isLoading }) => {
  const PostData = useSelector((state) => state.post.data);
  const isloadingP = useSelector((state) => state.post.status);
  const isloadingA = useSelector((state) => state.auth.status);

  const [isLoadingTags, setIsloadingTags] = React.useState(false);
  const [dataTags, setDataTags] = React.useState(undefined);
  const { tags } = useParams();

  React.useEffect(() => {
    setIsloadingTags(false);
    if (tags) {
      axios.get(`/post/${tags}`).then((tags) => {
        setDataTags(tags.data);
        setIsloadingTags(true);
      });
    }
  }, [tags]);

  if (isloadingP !== "loaded" || isloadingA !== "loaded") {
    return (
      <div style={{ height: "1000px" }}>
        <Skeleton />
      </div>
    );
  }

  if (tags) {
    if (isLoadingTags) {
      return (
        <div className="posts">
          {dataTags.map((obj) => {
            return <Post obj={obj} key={obj._id} />;
          })}
        </div>
      );
    } else {
      return (
        <div style={{ height: "620px" }}>
          <Skeleton />
        </div>
      );
    }
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
        <div style={{ height: "590px" }}>
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
