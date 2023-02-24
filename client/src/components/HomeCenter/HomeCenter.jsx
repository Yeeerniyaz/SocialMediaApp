import React from "react";

import "./style.scss";
import PostShare from "../PostShare/PostShare.jsx";
import Posts from "../Posts/Posts.jsx";

const Center = () => {
  return (
    <div className="homeCenter">
      <PostShare />
      <Posts/>
    </div>
  );
};

export default Center;
