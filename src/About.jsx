import "./About.css";
import IdleAnimation from "./IdleAnimation.jsx";
import { AnimatePresence, motion } from "motion/react";

export default function About() {
  return (
    <AnimatePresence>
      <motion.div className="AboutWrapper">
        <motion.div
          className="AboutTextContainer"
          initial={{ y: "100%" }}
          animate={{ y: "0" }} 
          transition={{ duration: 2 }}
        >
          <div className="AboutGapper" />
          <div className="AboutTitle">About</div>
          <div className="AboutDescription">
            Ethered is a community-driven website dedicated to Project ETHER, an
            initiative with contributions from the community. Currently under
            construction, Ethered aims to be a central hub for all things ETHER,
            with exciting new features planned for future release.
          </div>
          <br />
          <div className="AboutTitle">Community</div>
          <div className="AboutDescription">
            Ethered is a community-driven website dedicated to Project ETHER, an
            initiative with significant contributions from the community.
            Currently under construction, Ethered aims to be a central hub for
            all things ETHER, with exciting new features planned for future
            release.
          </div>
          <br />
          <div className="AboutTitle">Creators</div>
          <div className="AboutDescription">
            We aim to empower creators to showcase their work and connect with a
            vibrant community of enthusiasts. Whether you're an artist,
            designer, or content creator, Ethered provides a platform to share
            your creations and engage with fellow creators.
          </div>
          <br />
          <div className="AboutTitle">Collectors</div>
          <div className="AboutDescription AboutDescriptionLast">
            Ethered is a community-driven website dedicated to Project ETHER, an
            initiative with significant contributions from the community.
            Currently under construction, Ethered aims to be a central hub for
            all things ETHER, with exciting new features planned for future
            release.
          </div>
          <br />
          <div className="AboutTitle">Personalization</div>
          <div className="AboutDescription AboutDescriptionLast">
            Ethered is a community-driven website dedicated to Project ETHER, an
            initiative with significant contributions from the community.
            Currently under construction, Ethered aims to be a central hub for
            all things ETHER, with exciting new features planned for future
            release.
          </div>
          <div className="AboutGapper" />
        </motion.div>
        <div className="AboutImageContainer">
          <img
            src="https://pbs.twimg.com/media/Gm8GY3FWYAASX1z?format=jpg&name=large"
            alt=""
          />
        </div>
        <IdleAnimation z='10' s='4s' color='var(--SBB)' />
      </motion.div>
    </AnimatePresence>
  );
}
