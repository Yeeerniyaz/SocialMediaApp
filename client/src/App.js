import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Tags from "./components/Tags/Tags";
import Profile from "./pages/Profile/Profile";
import { fetchAuth } from "./redux/slices/auth.js";
import { fetchGetPost, fetchPopularTags } from "./redux/slices/post";
import { fetchFollowers, fetchFollows } from "./redux/slices/user";
import { Navbar } from "./components/media/MediaNavabr";
import { Search } from "./pages/Search/Search";
import { Audience } from "./pages/Audience/Audience";
import { Messenger } from './pages/Messenger/Messenger';

function App() {
  const dispatch = useDispatch();
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchGetPost());
    dispatch(fetchFollowers());
    dispatch(fetchFollows());
    dispatch(fetchPopularTags());
  }, [dispatch]);

  

  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });

  
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags/:tags" element={<Tags />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/chat" element={<Messenger />} />
          {width <= 965 && <Route path="/search" element={<Search />} />}
          {width <= 965 && <Route path="/audience" element={<Audience />} />}
        </Routes>
        {window.location.pathname !== "/auth" && <Navbar />}
      </BrowserRouter>
    );
}

export default App;
