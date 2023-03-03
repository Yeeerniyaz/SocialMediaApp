import React from "react";

import "./Tags.scss";
import Left from "../HomeLeft/HomeLeft.jsx";
import Center from "../HomeCenter/HomeCenter.jsx";
import Right from "../RightCenter/RightCenter.jsx";

const Home = () => {
  return (
    <div className="container">
      <div className="home">
        <Left />
        <Center />
        <Right />
      </div>
    </div>
  );
};

export default Home;
