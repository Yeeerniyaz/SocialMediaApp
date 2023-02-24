import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import { fetchAuth } from "./redux/slices/auth.js";
import { fetchGetPost } from "./redux/slices/post";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchGetPost());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
