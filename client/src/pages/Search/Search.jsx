import React from "react";
import SearchUser from "../../components/Search/Search";

import "./style.scss";

export function Search() {
  return (
    <div className="Search">
      <h1>Пойск</h1>
      <SearchUser />
    </div>
  );
}
