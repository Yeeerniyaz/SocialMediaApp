import React from "react";

import { TrendConvenor } from "../../Utils/sorter";
import ShareModal from "../ShareModal/ShareModal.jsx";
import "./trendCard.scss";

const TrendCard = () => {
  const [openedModal, setOpenedModal] = React.useState(false);
  return (
    <div className="trendCard">
      <h3>Популярные</h3>

      <div className="trend">
        <span>#region </span>
        <span>{TrendConvenor(150)} публикаций</span>
      </div>

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
