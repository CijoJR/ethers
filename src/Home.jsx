import "./Home.css";
// import bg from "./assets/Sims cat break-dancing.mp4";
import { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Home() {
  const BG = useRef(0);
  const etherButton = useRef(0);
  const [section, setSection] = useState(0);

  const enterEther = () => {
    setSection(1);
    etherButton.current.style.display = "none";
    
  };

  useEffect(() => {
    const moveCursor = (event) => {
      if (BG.current) {
        BG.current.style.transform = `translate(calc((-${event.clientX}px + 50vw ) / 2), 
          calc((-${event.clientY}px + 50vh) / 2)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return section === 0 ? (
    <div className="HomeSection">
      {/* background */}
      <img
        ref={BG}
        src="https://pbs.twimg.com/media/Gk-4d5ZbQAQvbLl?format=jpg&name=large"
        className="BgVideo"
      />
      {/* top */}
      <div className="HomeHeader">
        <div className="HomeTitle">
          <h1>ETHERED</h1>
          <p className="SubTitle">community made</p>
        </div>
        <div className="NavigationWrapper">
          <NavLink className="NavigationButton" to="/Profile">
            Profile
          </NavLink>
          <NavLink className="NavigationButton" to="/Gallery">
            Gallery
          </NavLink>
          <NavLink className="NavigationButton" to="/Roadmap">
            Roadmap
          </NavLink>
          <NavLink className="NavigationButton" to="/About">
            About
          </NavLink>
        </div>
      </div>
      {/* middle */}
      {/* <div className="Body">
        <div className="GridWrapper">
          <div className="GridItem G1">Gallery</div>
          <div className="GridItem G1">INVENTORY</div>
          <div className="GridItem G2">RAIDS V2</div>
        </div>
      </div> */}
      {/* bottom */}
      <button className="EnterButton" ref={etherButton}> Enter The ETHER </button>
    </div>
  ) : null;
}

export default Home;
