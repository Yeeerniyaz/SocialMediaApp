import React from "react";

import "./style.scss";
import axios from "../../axios";
export default function Conversations({
  conversation,
  currentUser,
  currentUserStatus,
}) {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const fullname = user?.fristName + " " + user?.lastName;
  const avatarUrl =
    user?.avatarUrl ||
    "files/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg";

  React.useEffect(() => {
    if (currentUserStatus === "loaded") {
      const friendId = conversation.members.find((m) => m !== currentUser._id);
      const getUser = async () => {
        try {
          await axios("/user/" + friendId).then(({ data }) => {
            setUser(data);
            setIsLoading(false);
          });
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }
  }, [currentUserStatus, conversation.members, currentUser._id]);

  if (isLoading) {
    return (
      <div className="conversations skeleton" style={{ height: "60px" }}></div>
    );
  }

  return (
    <div className="conversations">
      <img src={"http://localhost:5000/" + avatarUrl} alt="" />
      <div>
        <span>{fullname}</span>
      </div>
    </div>
  );
}
