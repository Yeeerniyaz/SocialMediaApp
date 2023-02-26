import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import { fetchAuth, SelectIsAuth } from "./redux/slices/auth.js";
import { fetchGetPost } from "./redux/slices/post";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchGetPost());
  }, [dispatch]);

  const data = useSelector(SelectIsAuth);
  const token = window.localStorage.getItem("token");

  const isAuth = data || token;

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
