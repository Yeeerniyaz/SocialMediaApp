import React from "react";
import { UilSearch } from "@iconscout/react-unicons";

import "./style.scss";
const Search = () => {
  return (
    <div className="search">
      <input type="text" placeholder="Найти" />
      <UilSearch />
    </div>
  );
};

export default Search;
