import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";

import "./style.scss";

const Comments = ({ obj }) => {
  const navigate = useNavigate();
  const date = new moment(obj.date);

  return (
    <div className="comment">
      <div className="CmmetAuthor">
        {obj.author?.avatarUrl && <img src={obj.user.avatarUrl} alt="" />}
        <p
          className="username"
          onClick={() => navigate(`/profile/${obj.author.username}`)}
        >
          @{obj.author.username}
        </p>
        <p>{date.calendar()}</p>
      </div>
      <p>{obj.text}</p>
    </div>
  );
};

export default Comments;
