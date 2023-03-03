import React from "react";
import { useParams } from "react-router-dom";

import "./style.scss";
import PostShare from "../PostShare/PostShare.jsx";
import Posts from "../Posts/Posts.jsx";
import axios from "../../axios";

const Center = () => {
  const { tags } = useParams();
  const [isFollow, setIsFollow] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState("loading");
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    if (isFollow) {
      axios.get("/post/following").then((res) => {
        setData(res.data);
        setIsLoading("loaded");
      });
    }
  }, [isFollow]);

  return (
    <div className="homeCenter">
      <PostShare />
      {tags ? (
        <Posts post={data} isLoading={isLoading} />
      ) : (
        <div className="toggleFollower">
          <div
            className={`toggleFollower__item ${!isActive && "isActive"}`}
            onClick={() => {
              setIsFollow(false);
              setIsActive(false);
            }}
          >
            популярное
          </div>
          <div
            className={`toggleFollower__item ${isActive && "isActive"} `}
            onClick={() => {
              setIsFollow(true);
              setIsActive(true);
            }}
          >
            подписки
          </div>
        </div>
      )}
      {isFollow ? <Posts post={data} isLoading={isLoading} /> : <Posts />}
    </div>
  );
};

export default Center;
