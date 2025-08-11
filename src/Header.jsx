import "./Header.css";
import { useLocation } from "react-router-dom";
import React from "react";


 const Header = React.memo(({delayNav, user, logout}) => {
  const loc= useLocation();
  console.log(loc);

  const handleLogout = () =>{
    delayNav('/Login');
    logout();
  } 

  return (
    <div className="Header">
      {/* <div className="HeaderMotto">ETHER LABS. BORN TO CREATE. CREATE TO INSPIRE.</div> */}
      <div className="HeaderButtonWrapper">
        <div className={"HeaderButton deco" + (loc.pathname=='/' ? " Activated" : " ")} onClick={()=>delayNav('/')}      >Home</div>
        <div className={"HeaderButton deco" + (loc.pathname=='/Profile' ? " Activated" : " ")} onClick={()=>delayNav('/Profile')}   >Profile</div>
        <div className={"HeaderButton deco" + (loc.pathname=='/Gallery' ? " Activated" : " ")} onClick={()=>delayNav('/Gallery')}   >Gallery</div>
        <div className={"HeaderButton deco" + (loc.pathname=='/Roadmap' ? " Activated" : " ")} onClick={()=>delayNav('/Roadmap')}   >Roadmap</div>
        <div className={"HeaderButton deco" + (loc.pathname=='/About' ? " Activated" : " ")} onClick={()=>delayNav('/About')}   >About</div>
        {user ? null: <div className={"HeaderButton deco" + (loc.pathname=='/Profile/Edit' ? " Activated" : " ")} onClick={()=>delayNav('/Profile/Edit')}>Edit</div>}
        {user ? <div className={"HeaderButton deco" + (loc.pathname=='/Profile/Edit' ? " Activated" : " ")} onClick={()=>delayNav('/Profile/Edit')}>{user}</div> : null}
        {user ? null : <div className={"HeaderButton deco" + (loc.pathname=='/Login' ? " Activated" : " ")} onClick={()=>delayNav('/Login')}>Login</div>}
        {user ? <div className={"HeaderButton deco" } onClick={()=>handleLogout()}>Logout</div> : null}
      </div>
      <div className="HeaderBGColor" />
    </div>
  );
});

Header.displayName = "Header";
export default Header