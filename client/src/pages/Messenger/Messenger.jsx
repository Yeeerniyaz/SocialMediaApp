import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import axios from "../../axios";
import { SelectIsAuth } from "../../redux/slices/auth";
import Convrsatsations from "../../components/Conversations/Conversations.jsx";
import Message from "../../components/Message/Message.jsx";
import ChatOnline from "../../components/ChatOnline/ChatOnline.jsx";

export function Messenger() {
  const me = useSelector((state) => state.auth.data);
  const meStatus = useSelector((state) => state.auth.status);
  const [conversations, setConversations] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const scrollRef = React.useRef();

  const isAuth = useSelector(SelectIsAuth);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/im");
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);

  React.useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/message/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  async function handleSubmit(e) {
    e.preventDefault();
    const message = {
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

          {conversations.map((c) => (
            <div
              key={c._id}
              onClick={() => {
                setCurrentChat(c);
              }}
            >
              <Convrsatsations
                conversation={c}
                currentUser={me}
                currentUserStatus={meStatus}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div key={m._id} ref={scrollRef}>
                    <Message message={m} own={m.sender === me._id} />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button onClick={handleSubmit}>Send</button>
              </div>
            </>
          ) : (
            <span className="noConvarsationText">
              Откройте чат, чтобы начать чат
            </span>
          )}
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
