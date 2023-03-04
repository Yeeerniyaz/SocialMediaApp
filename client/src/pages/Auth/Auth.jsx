import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../../components/Login/Login.jsx";
import Register from "../../components/Register/Register.jsx";
import { SelectIsAuth } from "../../redux/slices/auth.js";
import "./styles.scss";

const Auth = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = React.useState(false);
  const isAuth = useSelector(SelectIsAuth);

  if (isAuth) {
    navigate("/");
  }

  return (
    <div className="auth">
      <div className="auth-c">
        {toggle ? (
          <Register toggle={toggle} setToggle={setToggle} />
        ) : (
          <Login toggle={toggle} setToggle={setToggle} />
        )}
      </div>
    </div>
  );
};

export default Auth;
