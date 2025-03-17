import { useState, useCallback, useRef } from "react";
import { Routes, Route } from 'react-router-dom';

import "./App.css";

import Home from "./Home.jsx";
// import HomeExtend from "./HomeExtend.jsx";
import Gallery from "./Gallery.jsx";
import Roadmap from "./Roadmap.jsx";
import Profile from "./Profile.jsx";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Cursor from "./Cursor.jsx";
// import Menu from "./Menu.jsx";

function App() {
  const CRef = useRef(0);

  function tooltipEdit(message){
    if (message === null){
      CRef.current.className = 'Orb'
    } else{
      CRef.current.className = 'Orb Bloated'
    }
    CRef.current.innerText = message;
  }

  return (
    <div className="AppWrapper">
      
      <Cursor ref={CRef}/>
      {/* <Header  setCursorTooltip={tooltipEdit}/>   */}
      <Routes>
        <Route path="/" element={<Home setCursorTooltip={tooltipEdit} /> } />
        <Route path="/gallery" element={<Gallery setCursorTooltip={tooltipEdit} />} />
        <Route path="/Roadmap" element={<Roadmap setCursorTooltip={tooltipEdit} />} />
        <Route path="/profile" element={<Profile setCursorTooltip={tooltipEdit} />} />
      </Routes>
      <Footer  setCursorTooltip={tooltipEdit}/>
    </div>
  );
}

export default App;
