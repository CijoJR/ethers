import "./Header.css";
import { NavLink } from "react-router-dom";


export default function Header() {
  return (
    <div className="Header">
      {/* <div className="HeaderMotto">ETHER LABS. BORN TO CREATE. CREATE TO INSPIRE.</div> */}
      <div className="HeaderButtonWrapper">
        <NavLink className="HeaderButton deco" to="/">Home</NavLink>
        <NavLink className="HeaderButton deco" to="/Gallery">Gallery</NavLink>
        <NavLink className="HeaderButton deco" to="/Roadmap">Roadmap</NavLink>
        <NavLink className="HeaderButton deco" to="/Profile">Profile</NavLink>
        <NavLink className="HeaderButton deco" to="/Connect">Connect</NavLink>
      </div>
    </div>
  );
}
