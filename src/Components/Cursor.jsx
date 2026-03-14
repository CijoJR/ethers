import React, { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import "./Cursor.css";

const Cursor = React.forwardRef((props, ref) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <>
      <motion.div
        className="Cursor"
        style={{
          translateX: x,
          translateY: y,
        }}
      >
        
        <div className="Orb" ref={ref} />
      </motion.div>

      <motion.div
        className="OrbText"
        style={{
          translateX: x,
          translateY: y,
        }}
      >
        <div className="OrbTextDot" />
      </motion.div>

      <motion.div
        className="OrbText OrbAlt"
        style={{
          translateX: x,
          translateY: y,
        }}
      >
        <div className="OrbTextDot" />
      </motion.div>
    </>
  );
});

Cursor.displayName = "Cursor";
export default Cursor;
