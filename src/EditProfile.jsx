import "./EditProfile.css";
import IdleAnimation from "./IdleAnimation.jsx";
import { BadgeItem } from "./Profile.jsx";
import { useEffect, useRef, useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export default function EditProfile() {
  const BG = useRef(null);
  const [userdata, setUserdata] = useState(null);
  const [select, setSelect] = useState("avatar");

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      const path =
        "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/users/profile/edit/cijo";

      try {
        const response = await fetch(path, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (!isCancelled) {
          setUserdata(data.data);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to fetch profiles:", err);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    console.log(userdata);
  }, [userdata]);

  const throttledMoveCursor = useCallback(
    throttle((event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      if (BG.current) {
        const bgX = (-clientX + innerWidth / 2) / 25;
        const bgY = (-clientY + innerHeight / 2) / 25;
        BG.current.style.transform = `translate(${bgX}px, ${bgY}px)`;
      }
    }, 8),
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", throttledMoveCursor);
    return () => window.removeEventListener("mousemove", throttledMoveCursor);
  }, [throttledMoveCursor]);

  return (
    <div className="ProfileEdit">
      <div className="PETopWrapper">
        <div className="PEPreview">
          <div className="PEPGridBG" />
          <div className="PEPHeader">
            <img
              src="https://pbs.twimg.com/media/GmUin4ragAAx9uZ?format=jpg&name=medium"
              alt=""
              loading="lazy"
              decoding="async"
              ref={BG}
            />
            <div className="PEPSWrapper">
              <div className="PEPSItem">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 16 16"
                  fill="var(--SG)"
                >
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </div>
              <div className="PEPSItem">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 16 16"
                  strokeWidth="3"
                  fill="var(--SG)"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg>
              </div>
              <div className="PEPSItem">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="var(--SG)"
                  strokeWidth="3"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                </svg>
              </div>
              {/* <div className="PEPSItem"></div> */}
            </div>
          </div>
          <div className="PEPPP">
            <img
              src={
                "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/1999"
              }
              alt=""
            />
          </div>
          <div className="PEPContent">
            <IdleAnimation z="1" h="50%" s="4s" color="var(--SBB)" />
            <div className="PEPSave">
              <p>Save</p>
            </div>
            <div className="PEPInfo">
              <h3>{(userdata?.[0]?.username || "Loading").toUpperCase()}</h3>
              <h4>
                {(userdata?.[0]?.profiletitle || "Loading").toUpperCase()}
              </h4>
              <p>{(userdata?.[0]?.walletaddress || "Loading").toUpperCase()}</p>
            </div>
            <div className="PEPInfo2">
              <p>{(userdata?.[0]?.profilebio || "").toUpperCase()}</p>
            </div>
            <p>Featured Badges</p>
            <div className="PEPGrid">
              {[...Array(12)].map((_, i) => (
                <BadgeItem
                  key={i}
                  c={"var(--SG)"}
                  link={
                    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fbec1116-f54d-4716-932f-800f4893b918/d50fme3-6902c223-4cdb-43e1-9e90-b51af27bf7dc.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZiZWMxMTE2LWY1NGQtNDcxNi05MzJmLTgwMGY0ODkzYjkxOFwvZDUwZm1lMy02OTAyYzIyMy00Y2RiLTQzZTEtOWU5MC1iNTFhZjI3YmY3ZGMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.8RkPh__s1bdV0BI6h5aZCVb9dv69wsqQFjrGlZBO4HM"
                  }
                />
              ))}
            </div>
            <div className="PEPGap"></div>
          </div>
        </div>

        <div className="PEControls">
          <AnimatePresence mode="wait">
            {select === "avatar" && (
              <ControllerAvatar key="avatar" ethers={userdata?.[0]?.avatars} />
            )}
            {select === "bio" && (
              <ControllerBio key="bio" titles={userdata?.[0]?.titles} />
            )}
            {select === "background" && (
              <ControllerBackground key="background" />
            )}
            {select === "badge" && <ControllerBadge key="badge" />}
            {select === "accent" && <ControllerAccent key="accent" />}
          </AnimatePresence>
        </div>
        <div className="PEButtonWrapper">
          <div
            className={
              select === "avatar" ? "PEButton PEButtonActive" : "PEButton"
            }
            onClick={() => setSelect("avatar")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="var(--SG)"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
            </svg>
            <p>Avatar</p>
          </div>
          <div
            className={
              select === "bio" ? "PEButton PEButtonActive" : "PEButton"
            }
            onClick={() => setSelect("bio")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="var(--SG)"
              viewBox="0 0 16 16"
            >
              <path d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.17 4.17 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.5 3.5 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.17 4.17 0 0 1-2.06-.566A5 5 0 0 1 8 13.65a5 5 0 0 1-.44.285 4.17 4.17 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.5 3.5 0 0 0-.436-.294A3.17 3.17 0 0 0 5.5 2.5.5.5 0 0 1 5 2" />
              <path d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
            </svg>
            <p>Bio</p>
          </div>
          <div
            className={
              select === "background" ? "PEButton PEButtonActive" : "PEButton"
            }
            onClick={() => setSelect("background")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="var(--SG)"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5z" />
            </svg>
            <p>Background</p>
          </div>
          <div
            className={
              select === "badge" ? "PEButton PEButtonActive" : "PEButton"
            }
            onClick={() => setSelect("badge")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="var(--SG)"
              viewBox="0 0 16 16"
            >
              <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
              <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
            </svg>
            <p>Badge</p>
          </div>
          <div
            className={
              select === "accent" ? "PEButton PEButtonActive" : "PEButton"
            }
            onClick={() => setSelect("accent")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="var(--SG)"
              viewBox="0 0 16 16"
            >
              <path d="M8 4.5a7 7 0 0 0-7 7 .5.5 0 0 1-1 0 8 8 0 1 1 16 0 .5.5 0 0 1-1 0 7 7 0 0 0-7-7m0 2a5 5 0 0 0-5 5 .5.5 0 0 1-1 0 6 6 0 1 1 12 0 .5.5 0 0 1-1 0 5 5 0 0 0-5-5m0 2a3 3 0 0 0-3 3 .5.5 0 0 1-1 0 4 4 0 1 1 8 0 .5.5 0 0 1-1 0 3 3 0 0 0-3-3m0 2a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 4 0 .5.5 0 0 1-1 0 1 1 0 0 0-1-1" />
            </svg>
            <p>Accent</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ControllerAvatar({ ethers }) {
  const backgroundMap = {
    Pink: "var(--SP)",
    Blue: "var(--SB)",
    Red: "var(--SR)",
    Yellow: "var(--SY)",
    Black: "var(--SG)",
    White: "var(--SG)",
  };

  return (
    <motion.div
      className="PECwrapper"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%", transition: { duration: 0.25 } }}
      transition={{ duration: 0.5 }}
    >
      <div className="PECHeader"/>
      <div className="PECHeader2"/>
      <div className="PECHeaderI">
        <h2>Selection Screen</h2>
        <h3>Avatars</h3>
      </div>
      <div className="PECGrid">
        {ethers?.length > 0 ? (
          ethers.map((ether, i) => (
            <div key={i} className="PECWItem">
              <div className="PECWItemwrapper">
                <img
                  src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${ether.tokenid}`}
                  alt="a"
                />
              </div>
              <div className="PECWIDescription" style={{color: backgroundMap[ether.background]}}>{ether.tokenid}</div>
            </div>
          ))
        ) : (
          <p>No avatars available</p> // fallback if ethers is null or empty
        )}
      </div>
    </motion.div>
  );
}

function ControllerBio(titles) {
  return (
    <motion.div
      className="PECwrapper" 
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%", transition: { duration: 0.25 } }}
      transition={{ duration: 0.5 }}
      // transition={{ damping: 50, stiffness: 100 }}
    >
      {" "}
      <div className="PECHeader"/>
      <div className="PECHeader2"/>
      <div className="PECHeaderI">
        <h2>Selection Screen</h2>
        <h3>Avatars</h3>
      </div>
      <div className="PECBio">
        <div className="PECBioItem">
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" name="bio" defaultValue="Default Text."></textarea>
        </div>
        <div className="PECBioItem">
          <label htmlFor="twitter">Twitter/X</label>
          <input type="text" id="bio" name="bio" />
        </div>
        <div className="PECBioItem">
          <label htmlFor="bio">Instagram</label>
          <input type="text" id="bio" name="bio" />
        </div>
        <div className="PECBioItem">
          <label htmlFor="bio">Website</label>
          <input type="text" id="bio" name="bio" />
        </div>
        {/* <div className="PECBioItem">
          <label htmlFor="bio">Title</label>
          <input type="text" id="bio" name="bio" />
        </div> */}
        <label htmlFor="bio">Title</label>
        <div className="TitleGrid">
          {console.log(titles.titles)}
          {titles?.titles?.length > 0 ? (
            titles.titles.map((element, i) => {
              return (
                <>
                  <div key={i} className="TitleItem">
                    {element.titlename}
                    <div className="TitleDescription">
                      {element.titledescription}
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <p>No titles available</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ControllerBackground() {
  return (
    <motion.div
      className="PECwrapper"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%", transition: { duration: 0.25 } }}
      transition={{ duration: 0.5 }}
    >
      {" "}
      <div className="PECHeader">
        <h2>Selection Screen</h2>
        <h3>Background</h3>
      </div>
      <div className="PECGrid">
        <div className="PECWItem">
          <img
            src={
              "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/1999"
            }
            alt=""
          />
        </div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
      </div>
    </motion.div>
  );
}

function ControllerBadge() {
  return (
    <motion.div
      className="PECwrapper"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%", transition: { duration: 0.25 } }}
      transition={{ duration: 0.5 }}
    >
      {" "}
      <div className="PECHeader">
        <h2>Selection Screen</h2>
        <h3>Badge</h3>
      </div>
      <div className="PECGrid">
        <div className="PECWItem">
          <img
            src={
              "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/1999"
            }
            alt=""
          />
        </div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
      </div>
    </motion.div>
  );
}

function ControllerAccent() {
  return (
    <motion.div
      className="PECwrapper"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%", transition: { duration: 0.25 } }}
      transition={{ duration: 0.5 }}
    >
      {" "}
      <div className="PECHeader">
        <h2>Selection Screen</h2>
        <h3>Accent</h3>
      </div>
      <div className="PECGrid">
        <div className="PECWItem">
          <img
            src={
              "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/1999"
            }
            alt=""
          />
        </div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
        <div className="PECWItem"></div>
      </div>
    </motion.div>
  );
}
