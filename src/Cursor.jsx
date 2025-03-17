import React from "react";
import { useEffect, useRef, useState } from "react";
import "./Cursor.css";
import { debounce } from "lodash"; 

const Cursor = React.forwardRef((props, ref) => {
 const cursorRef = useRef(null);
  const guide1Ref = useRef(null);
  const guide2Ref = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;

    const moveCursor = (event) => {
      // Instead of directly modifying DOM, update the state
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleMouseMove = (event) => {
      // Only update the cursor position on the next frame
      animationFrameId = requestAnimationFrame(() => moveCursor(event));
    };

    // Add mousemove event listener to window
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up event listener and cancel animation frame on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Use state to apply cursor movement
  useEffect(() => {
    if (cursorRef.current && guide1Ref.current && guide2Ref.current) {
      cursorRef.current.style.transform = `translate(${position.x - 8}px, ${position.y - 8}px)`;

      guide1Ref.current.style.transform = `translate(${position.x - 4}px, ${position.y - 4}px)`;

      guide2Ref.current.style.transform = `translate(${position.x - 4}px, ${position.y - 4}px)`;
    }
  }, [position]); // Re-run effect when position changes

  return (
    <>
      <div ref={cursorRef} className="Cursor">
        <div className="Orb " ref={ref} />
      </div>
      <div ref={guide1Ref} className="OrbText">
        <div className="OrbTextDot"></div>
      </div>
      <div ref={guide2Ref} className="OrbText OrbAlt">
        <div className="OrbTextDot "></div>
      </div>
    </>
  );
});

Cursor.displayName = "Cursor";
export default Cursor;
