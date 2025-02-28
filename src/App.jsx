import { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import "./App.css";

import Home from "./Home.jsx";
import HomeExtend from "./HomeExtend.jsx";
import Gallery from "./Gallery.jsx";
import Profile from "./Profile.jsx";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Cursor from "./Cursor.jsx";
import Menu from "./Menu.jsx";

function App() {
  const [page, changePage] = useState("Home");
  const [menu, changeMenu] = useState(false);

  return (
    <div className="AppWrapper">
      <Cursor />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
