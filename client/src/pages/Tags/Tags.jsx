import React from "react";

import "./Tags.scss";
import Left from "../../components/HomeLeft/HomeLeft.jsx";
import Center from "../../components/HomeCenter/HomeCenter.jsx";
import Right from "../../components/RightCenter/RightCenter.jsx";

const Home = () => {
  return (
    <div className="container">
      <div className="home">
        <Left />
        <Center />
        <Right/>
      </div>
    </div>
  );
};

export default Home;
