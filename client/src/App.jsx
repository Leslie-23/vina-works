import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Blog from "./pages/user/Blog";
import Donations from "./pages/user/Donations";
import Events from "./pages/user/Events";
import News from "./pages/user/News";
import SingleBlog from "./pages/user/SingleBlog";
import SingleEvent from "./pages/user/SingleEvent";
import SingleNews from "./pages/user/SingleNews";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOTP from "./pages/auth/VerifyOTP";

import HomeDash from "./pages/dashboard/HomeDash";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/dashboard" element={<HomeDash />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/events" element={<Events />} />
          <Route path="/home" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/single-blog" element={<SingleBlog />} />
          <Route path="/single-event" element={<SingleEvent />} />
          <Route path="/single-news" element={<SingleNews />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
