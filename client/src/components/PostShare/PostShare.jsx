import React from "react";
import { UilPaperclip, UilMessage, UilX } from "@iconscout/react-unicons";

import "./style.scss";
import { fileSorter } from "../../Utils/sorter";
import { useDispatch } from "react-redux";
import { fetchCreatePost } from "../../redux/slices/post";
import { addPost } from "../../redux/slices/auth";
import axios from "../../axios";

const PostShare = () => {
  const dispatch = useDispatch();
  const [fileUrl, setFileUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const fileRef = React.useRef("");

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("file", file);
      await axios.post("/send", formData).then(({ data }) => {
        setFileUrl(data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const RemoveFile = () => {
    setFileUrl("");
    fileRef.current.value = null;
    const filename = fileUrl.split("/").pop();
    axios.delete(`/send/${filename}`);
  };

  const onSubmit = async () => {
    const data = await dispatch(fetchCreatePost({ file: fileUrl, title }));
    console.info(data);
    dispatch(addPost(data.payload));
    setTitle("");
    setFileUrl("");
    fileRef.current.value = null;
  };

  return (
    <div className="postShare">
      <div>
        <input type="file" ref={fileRef} onChange={handleChangeFile} hidden />
        <input
          type="text"
          placeholder="Что у вас нового?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <UilPaperclip
          onClick={() => {
            fileRef.current.click();
          }}
        />
        <UilMessage onClick={onSubmit} />
      </div>

      {fileUrl && (
        <div className="file">
          <img src={`http://192.168.43.127:5000/${fileUrl}`} alt="" />
          <UilX onClick={RemoveFile} />
        </div>
      )}

      {fileSorter(fileUrl)?.type === "video" && (
        <div className="file">
          <video
            src={`http://192.168.43.127:5000/${fileUrl}`}
            controls
            preload="on"
            alt=""
          />
          <UilX
            onClick={() => {
              setFileUrl("");
              fileRef.current.value = null;
            }}
          />
        </div>
      )}

      {fileSorter(fileUrl)?.type === "audio" && (
        <div className="file">
          <audio
            src={`http://192.168.43.127:5000/${fileUrl}`}
            alt=""
            controls
          />
          <UilX onClick={RemoveFile} />
        </div>
      )}
    </div>
  );
};

export default PostShare;
