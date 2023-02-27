import { useRef, useState } from "react";
import { Modal } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import "./ProfileEditModal.scss";
import axios from "../../axios";
import { fetchUpdate } from "../../redux/slices/auth";

function ProfileEditModal({ setOpenedModal, openedModal }) {
  const user = useSelector((state) => state.auth.data);
  const [status, setStatus] = useState(user?.status || "");
  const [username, setUsername] = useState(user?.username || "");
  const [fristName, SetFristName] = useState(user?.fristName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [social, setSocial] = useState(user?.social || "");
  const [location, setLocation] = useState(user?.location || "");
  const [profession, setProfesion] = useState(user?.profession || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const avatarRef = useRef();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    setOpenedModal(false);
    dispatch(
      fetchUpdate({
        status,
        username,
        fristName,
        lastName,
        social,
        location,
        profession,
        avatarUrl,
      })
    );
  };

  const handleChangeFileOne = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("file", file);
      await axios.post("/send", formData).then(({ data }) => {
        setAvatarUrl(data);
      });
    } catch (err) {
      console.error(err);
    }
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
          {avatarUrl ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                avatarRef.current.value = "";
                setAvatarUrl("");
              }}
            >
              Удалить аватар
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                avatarRef.current.click();
              }}
            >
              Загрузить аватар
            </button>
          )}

          <div className="image">
            <div>
              {avatarUrl && (
                <img
                  src={`http://localhost:5000/${avatarUrl}`}
                  alt=""
                  className="image2"
                />
              )}
            </div>
            <div className="twospan">
              <p>{fristName + " " + lastName} </p>
              <p>@{username || user.username}</p>
            </div>
          </div>

          <input
            type="file"
            ref={avatarRef}
            onChange={handleChangeFileOne}
            hidden
          />

          <button onClick={onSubmit} className="button modalbtn">
            Сохранить
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ProfileEditModal;
