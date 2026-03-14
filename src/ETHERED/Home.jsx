import "./Home.css";
// import bg from "./assets/Sims cat break-dancing.mp4";
import { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import HomeExtend from "./HomeExtend.jsx";
import { motion, AnimatePresence } from "motion/react";
import IdleAnimation from "../Components/IdleAnimation.jsx";

function Home({ delayNav }) {
  const BG = useRef(0);
  const etherButton = useRef(0);
  const [flipped, setFlipped] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const moveCursor = (event) => {
      if (BG.current) {
        BG.current.style.transform = `translate(calc((-${event.clientX}px + 50vw ) / 20), 
          calc((-${event.clientY}px + 50vh) / 20)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const handleFlipped = () => {
    setClicked(true);
    setTimeout(() => {
      setFlipped(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!flipped ? (
        <motion.div
          className="HomeSection"
          exit={{ opacity: 0 }}
          transition={{
            duration: 2,
            ease: [1, 0.71, 0.5, 1.25],
          }}
          key="home-section"
        >
          {/* <div className="TweetWrapper">

          </div> */}
          {/* <div style={{maxHeight:'5rem',maxWidth:'2.5rem', overflow: 'visible', position:'absolute', top:0, left:0}}>
            <Tweet id="1905928867597930596" />
          </div> */}

          {/* background */}
          {/* <img
            ref={BG}
            src="https://pbs.twimg.com/media/FuPv3X7WYAEzMAo?format=jpg&name=large"
            className="BgVideo"
          /> */}
          {/* top */}
          <div className="HomeHeader">
            <div className="HomeTitle">
              <p className="SubTitle">Community Made</p>
              <h1>ETHERED</h1>
              <p className="SubTitle">powered by ether</p>
            </div>
            <div className="NavigationWrapper">
              <div
                className="NavigationButton"
                onClick={() => delayNav("/Profile")}
              >
                Profile
              </div>
              <div
                className="NavigationButton"
                onClick={() => delayNav("/Gallery")}
              >
                Gallery
              </div>
              <div
                className="NavigationButton"
                onClick={() => delayNav("/Roadmap")}
              >
                Roadmap
              </div>
              <div
                className="NavigationButton"
                onClick={() => delayNav("/About")}
              >
                About
              </div>
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
          {/* <div className="HomeLine">
          </div> */}
          <div className="HomeAni" />
          <button
            className="EnterButton"
            ref={etherButton}
            onClick={() => handleFlipped()}
            style={
              clicked == true
                ? {
                    height: "200%",
                    width: "200%",
                    bottom: "-50%",
                    borderRadius: "100%",
                  }
                : {}
            }
          >
            <p style={clicked ? { opacity: 0 } : { opacity: 1 }}>
              {" "}
              Enter The ETHER{" "}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </button>
          {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="var(--B)"
              viewBox="0 0 16 16"
            >
              <path
                d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"
              />
            </svg> */}
          <div className="BottomWrapper"></div>
        </motion.div>
      ) : (
        // <motion.div
        //    exit={{ y: "-100%" }}
        //    transition={{
        //      duration: 1,
        //      ease: [1, 0.71, 0.5, 1.25],
        //    }}
        // >

        // </motion.div>
        <HomeExtend />
      )}
    </AnimatePresence>
  );
}
export default Home;
