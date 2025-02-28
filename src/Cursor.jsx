import { useEffect, useState, useRef } from "react";
import "./Cursor.css";

export default function Cursor() {
  const [coor, changeCoor] = useState([0, 0]);

  const cursorRef = useRef(null);
  const guide1Ref = useRef(null);
  const guide2Ref = useRef(null);

  useEffect(() => {
    const moveCursor = (event) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${
          event.clientX - 8
        }px, ${event.clientY - 8}px)`;
        guide1Ref.current.style.transform = `translate(${event.clientX - 4}px, ${
          event.clientY - 4
        }px)`;
        guide2Ref.current.style.transform = `translate(${event.clientX - 4}px, ${
          event.clientY - 4
        }px)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <div ref={guide1Ref} className="OrbText">
        <div className="OrbTextDot"></div>
      </div>
      <div ref={guide2Ref} className="OrbText OrbAlt">
        <div className="OrbTextDot "></div>
      </div>
      {/* <div>click to exit</div> */}
      <div ref={cursorRef} className="Cursor">
        <div className="Orb " />
        {/* <div className="Line"></div>
        <div className="Line"></div>
        <div className="Line"></div>
        <div className="Line"></div> */}
      </div>
    </>
  );
}
