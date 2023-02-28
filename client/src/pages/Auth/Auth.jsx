import React from "react";

import Login from "../../components/Login/Login.jsx";
import Register from "../../components/Register/Register.jsx";

import "./styles.scss";

const Auth = () => {
  const [toggle, setToggle] = React.useState(false);

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
