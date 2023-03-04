import React from "react";

import "./style.scss";

export default function Message({ own }) {
  return (
    <div className={`message ${!!own && "own"}`}>
      <div className="messageTop">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhitQVLQJtOb8dGKFNaw12COEeSBCEMT6iIQ&usqp=CAU"
          alt=""
          className="messageImg"
        />
        <div>
          <span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo fuga
            illum quis eum alias incidunt, sit voluptatum magni porro, dolorem
            expedita illo aperiam soluta quod dolore velit quisquam quos
            provident?
          </span>
          <span>1 hour ago</span>
        </div>
      </div>
    </div>
  );
}
