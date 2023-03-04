import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Home.scss";
import Left from "../../components/HomeLeft/HomeLeft.jsx";
import Center from "../../components/HomeCenter/HomeCenter.jsx";
import Right from "../../components/RightCenter/RightCenter.jsx";

import { SelectIsAuth } from "../../redux/slices/auth";

const Home = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(SelectIsAuth);

  if (window.localStorage.getItem("token") && !isAuth) {
    navigate("/auth");
  }

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
