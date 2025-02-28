import "./Home.css";
import bg from "./assets/Sims cat break-dancing.mp4";

function Home() {
  return (
    <div className="HomeSection">
      {/* background */}
      <video src={bg} className="BgVideo" loop autoPlay muted />
      {/* top */}
      <div className="HomeHeader">
        <div className="Title">
          <h1>ETHERED</h1>
          <p className="SubTitle">made by the community.</p>
        </div>
        <div className="NavigationWrapper">
          <button className="NavigationButton">Profile</button>
          <button className="NavigationButton">Gallery</button>
          <button className="NavigationButton">Roadmap</button>
          <button className="NavigationButton">About</button>
        </div>
      </div>
      {/* middle */}
      <div className="Body">
        <div className="GridWrapper">
          <div className="GridItem G1">Gallery</div>
          <div className="GridItem G1">INVENTORY</div>
          <div className="GridItem G2">RAIDS V2</div>
        </div>
      </div>
      {/* bottom */}
      <button className="EnterButton"> Enter The ETHER </button>
    </div>
  );
}

export default Home;
