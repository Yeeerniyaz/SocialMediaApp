import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import { fetchAuth, SelectIsAuth } from "./redux/slices/auth.js";
import { fetchGetPost } from "./redux/slices/post";
import { fetchFollowers } from "./redux/slices/user";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchGetPost());
    dispatch(fetchFollowers());
  }, [dispatch]);

  const data = useSelector(SelectIsAuth);
  const token = Boolean(window.localStorage.getItem("token"));

  const isAuth = token && data;

  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
