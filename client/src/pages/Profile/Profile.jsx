import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Profile.scss";
import Left from "../../components/HomeLeft/HomeLeft.jsx";
import Center from "../../components/ProfileCenter/ProfileCenter.jsx";
import Right from "../../components/RightCenter/RightCenter.jsx";

import { fetchGetUser } from "../../redux/slices/user";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchGetUser(username));
  }, [dispatch, username]);

  return (
    <div className="container">
      <div className="Profile">
        <Left />
        <Center />
        <Right />
      </div>
    </div>
  );
};

export default Profile;
