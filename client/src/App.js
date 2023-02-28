import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import { fetchAuth } from "./redux/slices/auth.js";
import { fetchGetPost } from "./redux/slices/post";
import { fetchFollowers } from "./redux/slices/user";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchGetPost());
    dispatch(fetchFollowers());
  }, [dispatch]);



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
