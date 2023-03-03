import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { UilX } from "@iconscout/react-unicons";
import { UilSearch } from "@iconscout/react-unicons";

import "./style.scss";
import { fetchRemoveFollow, fetchAddFollow } from "../../redux/slices/auth";
import axios from "../../axios";

const Search = () => {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const me = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    if (search.length > 1) {
      setTimeout(() => {
        axios.get(`/user/users/${search}`).then(({ data }) => {
          setData(data);
        });
      }, 1000);
    } else setData([]);
  }, [search]);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Найти"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search ? (
        <UilX
          onClick={() => {
            setSearch("");
            setData([]);
          }}
        />
      ) : (
        <UilSearch />
      )}

      {data.length > 0 && (
        <div className="FollwersCard SearchCard ">
          {data
            .filter(({ _id }) => _id !== me._id)
            .map((obj) => {
              return <Card obj={obj} key={obj._id} />;
            })}
        </div>
      )}
    </div>
  );
};

function Card({ obj }) {
  const me = useSelector((state) => state.auth.data);
  const isFollow = Boolean(me.follows.find((e) => e === obj?._id));

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function buttonSubscribe() {
    if (isFollow) {
      dispatch(fetchRemoveFollow(obj._id));
    } else {
      dispatch(fetchAddFollow(obj._id));
    }
  }

  return (
    <div className="users SearchCard">
      <div
        onClick={() => {
          navigate("/profile/" + obj.username);
        }}
      >
        {obj?.avatarUrl && (
          <img src={`http://192.168.43.127:5000/${obj.avatarUrl}`} alt="" />
        )}
        <div className="span ">
          <span>{obj.fristName + " " + obj.lastName}</span>
          <span>@{obj.username}</span>
        </div>
      </div>
      <div className="button button-m" onClick={buttonSubscribe}>
        {isFollow ? <div>отписаться</div> : <div>подписатся</div>}
      </div>
    </div>
  );
}

export default Search;
