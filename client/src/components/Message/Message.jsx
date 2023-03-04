import React from "react";
import moment from "moment";
import "moment/locale/ru";

import "./style.scss";

export default function Message({ own, message }) {
  const date = new moment(message.createdAt);

  return (
    <div className={`message ${own && "own"}`}>
      <div className={`messageTop ${own && "ownTop"}`}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhitQVLQJtOb8dGKFNaw12COEeSBCEMT6iIQ&usqp=CAU"
          alt=""
          className="messageImg"
        />
        <div>
          <span>{message.text}</span>
          <span>{date.calendar()}</span>
        </div>
      </div>
    </div>
  );
}
