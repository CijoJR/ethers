import "./Header.css";
import { NavLink } from "react-router-dom";
import React from "react";

 const Header = React.memo(({setCursorTooltip}) => {
  return (
    <div className="Header">
      {/* <div className="HeaderMotto">ETHER LABS. BORN TO CREATE. CREATE TO INSPIRE.</div> */}
      <div className="HeaderButtonWrapper">
        <NavLink className={({ isActive }) => "HeaderButton deco" + (isActive ? " Activated" : " ")} to="/"        onMouseEnter={()=>setCursorTooltip('Home')}    onMouseLeave={() => setCursorTooltip(null)}>Home</NavLink>
        <NavLink className={({ isActive }) => "HeaderButton deco" + (isActive ? " Activated" : " ")} to="/Gallery" onMouseEnter={()=>setCursorTooltip('Gallery')} onMouseLeave={() => setCursorTooltip(null)}>Gallery</NavLink>
        <NavLink className={({ isActive }) => "HeaderButton deco" + (isActive ? " Activated" : " ")} to="/Roadmap" onMouseEnter={()=>setCursorTooltip('Roadmap')} onMouseLeave={() => setCursorTooltip(null)}>Roadmap</NavLink>
        <NavLink className={({ isActive }) => "HeaderButton deco" + (isActive ? " Activated" : " ")} to="/Profile" onMouseEnter={()=>setCursorTooltip('Profile')} onMouseLeave={() => setCursorTooltip(null)}>Profile</NavLink>
        <NavLink className={({ isActive }) => "HeaderButton deco" + (isActive ? " Activated" : " ")} to="/Connect" onMouseEnter={()=>setCursorTooltip('Connect')} onMouseLeave={() => setCursorTooltip(null)}>Connect</NavLink>
      </div>
    </div>
  );
});

Header.displayName = "Header";
export default Header