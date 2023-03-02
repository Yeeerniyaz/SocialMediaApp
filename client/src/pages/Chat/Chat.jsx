import React, { useEffect } from "react";
import axios from "../../axios";

import "./style.scss";

const Chat = () => {
  const [chats, setChats] = React.useState([]);

  useEffect(() => {
    axios.get("/chat/63fb5d81109ca7f6e38c9766").then(({ data }) => {
      setChats(data);
      console.log(chats);
    });
  }, []);

  return (
    <div className="container">
      <div className="Chat">
        <div>
          <h1>Мессенджер</h1>
        </div>
        <div>d</div>
      </div>
    </div>
  );
};

export default Chat;
