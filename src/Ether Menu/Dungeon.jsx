import "./Dungeon.css";
import ColorThief from "colorthief";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useMotionValue,
} from "motion/react";
import IdleAnimation from "../Components/IdleAnimation.jsx";
// import { WindowScroller, AutoSizer, Grid } from "react-virtualized";
import { AnimatePresence } from "motion/react";
import { div } from "motion/react-client";

export default function Dungeon({ sendNotif }) {
  const [menu, setMenu] = useState("Main");

  const items = [
    { name: "BINGBONG", desc: "aaa", difficulty: 5 },
    { name: "Bong Bong", desc: "lorem ipsum", difficulty: 5 },
    { name: "Bong Bong", desc: "ccc", difficulty: 5 },
  ];

  const components = {
    Main: <DungeonView sendNotif={sendNotif} />,
    Picker: <DungeonPicker sendNotif={sendNotif} />,
  };

  return (
    <div className="DungeonWrapper" style={{}}>
      {components[menu] ?? null}
    </div>
  );
}

export function DungeonView({ sendNotif }) {
  const items = "";

  return (
    <>
      <div
        className="DungeonScreen"
        style={{
          background: `url("https://pbs.twimg.com/media/GrT0OeOW4AAkHlr?format=jpg&name=large")`,
        }}
      >
        <h3>{items.name}</h3>
        <div className="MainDungeon"></div>
      </div>
      <div className="DungeonController">
        {/* <div></div> */}
        <div className="PartyView">
          <div className="PartyMember">
            <div className="PartyMemberpp">
              <img
                src="https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/1"
                alt=""
              />
            </div>
            <div className="PartyMemberInfo">
              <h2>0002</h2>
              <h3>Type - Class</h3>
              <p>Subclass</p>
            </div>
          </div>
          <div
            className="PartyMemberMates"
            style={{ borderCollapse: "collapse" }}
          >
            <div className="PartyMemberMini">
              <h3>
                0003//:Class <br />
              </h3>
              <p>Subclass</p>
              <div className="PartyMemberMinipp">
                <img
                  src="https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/3"
                  alt=""
                />
              </div>
            </div>
            <div className="PartyMemberMini">
              <h3>
                0003//:Class <br />
              </h3>
              <p>Subclass</p>
              <div className="PartyMemberMinipp">
                <img
                  src="https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/4"
                  alt=""
                />
              </div>
            </div>
            <div className="PartyMemberMini">
              <h3>
                0003//:Class <br />
              </h3>
              <p>Subclass</p>
              <div className="PartyMemberMinipp">
                <img
                  src="https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/5"
                  alt=""
                />
              </div>
            </div>
            <div className="PartyMemberMini">
              <h3>
                0003//:Class <br />
              </h3>
              <p>Subclass</p>
              <div className="PartyMemberMinipp">
                <img
                  src="https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/6"
                  alt=""
                />
              </div>
            </div>
            <div className="PartyMemberMini">
              <h3>
                0003//:Class <br />
              </h3>
              <p>Subclass</p>
              <div className="PartyMemberMinipp">
                <img
                  src="https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/6"
                  alt=""
                />
              </div>
            </div>
            <div className="PartyMemberMini"></div>
          </div>
        </div>
        <div className="DungeonControllerButtonWrapper">
          <div className="DungeonControllerButton">Dungeons</div>
          <div className="DungeonControllerButton">Items</div>
          <div className="DungeonControllerButton">Rest</div>
          <div className="DungeonControllerButton">Retire</div>
          <div style={{ display: "flex", gap: "0.25rem", flex: 1.5 }}>
            <div className="DungeonControllerButton" style={{ flex: 0.3 }}>
              Passive
            </div>
            <div className="DungeonControllerButton" style={{ flex: 0.3 }}>
              Neutral
            </div>
            <div className="DungeonControllerButton" style={{ flex: 0.4 }}>
              Aggresive
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.25rem", flex: 1 }}>
            <div className="DungeonControllerButton" style={{ flex: 0.25 }}>
              {"<"}
            </div>
            <div className="DungeonControllerButton">Roster</div>
            <div className="DungeonControllerButton" style={{ flex: 0.25 }}>
              {">"}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="DungeonScreen">
        <h3>{items.name}</h3>
        <div className="MainDungeon"></div>
      </div> */}
    </>
  );
}

export function DungeonPicker({ sendNotif }) {
  const items = [
    { name: "BINGBONG", desc: "aaa", difficulty: 5 },
    { name: "Bong Bong", desc: "lorem ipsum", difficulty: 5 },
    { name: "Bong Bong", desc: "ccc", difficulty: 5 },
  ];

  return (
    <div className="DungeonWrapper" style={{}}>
      <div className="DungeonBentoLine">
        {items.map((item, i) => {
          console.log(item);
          return (
            <div className="DungeonBento" key={i}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="DungeonBentoStarWrapper">
                {items.map((item, i) => (
                  <div className="DungeonBentoStar" key={i}></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
