import { useState } from "react";
import { Modal } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import "./ProfileEditModal.scss";

import oblojka from "../../image/oblojka.jpg";
import ProfileImage from "../../image/ProfileImage.png";
import { fetchUpdate } from "../../redux/slices/auth";

function ProfileEditModal({ setOpenedModal, openedModal }) {
  const user = useSelector((state) => state.auth.data);
  const [status, setStatus] = useState(user?.status || "");
  const [username, setUsername] = useState("");
  const [fristName, SetFristName] = useState(user?.fristName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [social, setSocial] = useState(user?.social || "");
  const [location, setLocation] = useState(user?.location || "");
  const [profession, setProfesion] = useState(user?.profession || "");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchUpdate({
        status,
        username,
        fristName,
        lastName,
        social,
        location,
        profession,
      })
    );
  };

  return (
    <Modal
      padding={-5}
      radius={"1.1rem"}
      withCloseButton={false}
      size="60%"
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={openedModal}
      onClose={() => {
        setOpenedModal(false);
      }}
    >
      <div className="ProfileEditModal">
        <form className="infoForm">
          <h3>@{user.username}</h3>
          <input
            type="text"
            placeholder="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <div>
            <input
              type="text"
              placeholder="FristName"
              value={fristName}
              onChange={(e) => SetFristName(e.target.value)}
            />
            <input
              type="text"
              placeholder="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div>
            <input
              type="text"
              placeholder="instagram"
              value={social}
              onChange={(e) => setSocial(e.target.value)}
            />
            <input
              type="text"
              placeholder="Profesion"
              value={profession}
              onChange={(e) => setProfesion(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div>
            <button>Загрузить аватар</button>
            <button>Загрузить обложку</button>
          </div>

          <div className="image">
            <div>
              <img src={oblojka} alt="" className="image1" />
              <img src={ProfileImage} alt="" className="image2" />
            </div>
            <span>{fristName + " " + lastName} </span>
            <span>@{username || user.username}</span>
          </div>

          <input type="file" hidden />
          <input type="file" hidden />
          <button onClick={onSubmit} className="button modalbtn">
            Сохранить
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ProfileEditModal;
