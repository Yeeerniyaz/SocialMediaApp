import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { SelectIsAuth } from "../../redux/slices/auth";
import Convrsatsations from "../../components/Conversations/Conversations.jsx";
import Message from "../../components/Message/Message.jsx";
import ChatOnline from "../../components/ChatOnline/ChatOnline.jsx";

export function Messenger() {
  const navigate = useNavigate();
  const isAuth = useSelector(SelectIsAuth);

  if (!window.localStorage.getItem("token") && !isAuth) {
    navigate("/auth");
  }

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input
            type="text"
            placeholder="Search for friends"
            className="chatMenuInput"
          />
          <Convrsatsations />
          <Convrsatsations />
          <Convrsatsations />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message />
            <Message own={true} />
            <Message />
            <Message />
            <Message own={true} />
            <Message />
            <Message />
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="write something..."
            ></textarea>
            <button>Send</button>
          </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
		  <ChatOnline />
		</div>
      </div>
    </div>
  );
}
