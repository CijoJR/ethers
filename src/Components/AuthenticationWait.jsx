import { motion } from "motion/react";
import "./AuthenticationWait.css";
import IdleAnimation from "./IdleAnimation.jsx";
import { useEffect, useState } from "react";

const AuthenticationWait = ({ registered, setChecking, text1, text2 }) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (registered == true) {
      setTimeout(() => {
        setChecking(false);
      }, 2000);
    }
  }, [registered, setChecking]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === 3 ? 0 : prevDots + 1));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      trantition={{ duration: 3 }}
      className="AWWrapper"
    >
      {!registered ? (
        <div className="AWCenter">
          <div className="loader" />
          <h2>{text1 != null ? text1 : "Creating account"}</h2>
          <h3>NOW LOADING{".".repeat(dots)}</h3>
          <p>
            Tip: You can check out and shop ETHER's latest clothing line at{" "}
            <a href="https://ether.site/shop"> ETHER.SITE/SHOP</a>
          </p>
        </div>
      ) : (
        <div className="AWCenter">
          <h2>{text2 != null ? text2 : "Account Created"}</h2>
          <h3>Redirecting to profile{".".repeat(dots)}</h3>
          <p>
            Tip: You can check out and shop ETHER's latest clothing line at{" "}
            <a href="https://ether.site/shop"> ETHER.SITE/SHOP</a>
          </p>
        </div>
      )}
      <IdleAnimation s="2s" color={registered?"var(--SB)":"var(--SBB)"} />
    </motion.div>
  );
};

export default AuthenticationWait;
