import React from "react";

import "./Home.scss";
import Left from "../../components/HomeLeft/HomeLeft.jsx";
import Center from "../../components/HomeCenter/HomeCenter.jsx";

const Home = () => {
  return (
    <div className="container">
      <div className="home">
        <Left />
        <Center />
        <div>R</div>
      </div>
    </div>
  );
};

export default Home;
