import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { TrendConvenor } from "../../Utils/sorter";
import ShareModal from "../ShareModal/ShareModal.jsx";
import Skeleton from "../Skeleton/Skeleton";
import "./trendCard.scss";

const TrendCard = () => {
  const [openedModal, setOpenedModal] = React.useState(false);
  const tags = useSelector((state) => state.post.tags);
  const status = useSelector((state) => state.post.tagStatus);

  if (status !== "loaded") {
    return (
      <div style={{ height: "600px" }}>
        <Skeleton />
      </div>
    );
  }


  return (
    <div className="trendCard">
      <h3>Популярные</h3>

      {tags.slice(0,8).map((obj, index) => {
   return (
     <Link to={`/tags/${obj._id}`} className="trend" key={index}>
       <span>#{obj._id}</span>
       <span>{TrendConvenor(obj.count)} публикаций</span>
     </Link>
   );
      })}

      <div
        className="button r-button"
        onClick={() => {
          setOpenedModal(true);
        }}
      >
        Share
      </div>
      <ShareModal openedModal={openedModal} setOpenedModal={setOpenedModal} />
    </div>
  );
};

export default TrendCard;
