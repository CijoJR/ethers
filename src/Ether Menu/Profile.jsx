import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { WindowScroller, AutoSizer, Grid } from "react-virtualized";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  useTransform,
  useMotionValue,
  animate,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import "./Profile.css";
import ColorThief from "colorthief";

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

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isPastTarget, setIsPastTarget] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  const topRef = useRef(null);
  const [gridKey, setGridKey] = useState(Date.now());
  const [scrollTopOverride, setScrollTopOverride] = useState(0);
  const gridRef = useRef(null);

  const [showGrid, setShowGrid] = useState(false);
  const targetRef = useRef(null);
  const { scrollY } = useScroll(); // scrollY is a MotionValue

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (targetRef.current) {
      const targetHeight = targetRef.current.offsetHeight;
      const triggerPoint = targetHeight;
      setIsPastTarget(latest >= triggerPoint - (window.innerHeight - 450));
    }
  });

  useEffect(() => {
    if (!slug) {
      // Force scroll to top BEFORE showing grid
      window.scrollTo(0, 0);

      // Delay mount to allow WindowScroller to measure from top
      setTimeout(() => setShowGrid(true), 50);
    } else {
      setShowGrid(false);
    }
  }, [slug]);

  useEffect(() => {
    if (!slug) {
      // Reset scroll to top to force grid to measure
      window.scrollTo(0, 0);
      setScrollTopOverride(0);

      // Delay to let layout settle, then recompute
      setTimeout(() => {
        gridRef.current?.recomputeGridSize();
        gridRef.current?.forceUpdateGrids?.();
      }, 50);
    }
  }, [slug]);

  // Call this when you return to the grid view
  useEffect(() => {
    if (!slug) {
      setGridKey(Date.now()); // force new key
    }
  }, [slug]);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      const path =
        "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/users/profile";

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
          console.log("PData: ", data);
          setProfiles(data.profileCollection);
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
    if (!slug) setProfile(null);
    else setProfile(slug);
  }, [slug]);

  const handleClick = useCallback(
    (profileName, profileid) => {
      setProfile(profileName);
      if (profileid != -1) {
        navigate(`/Profile/${profileName}`);
      } else {
        navigate(`/Profile/wallet/${profileName}`);
      }
    },
    [navigate]
  );

  return (
    <AnimatePresence>
      {profile != null || slug != undefined ? (
        <motion.div
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
          }}
          key="statseuno"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, delay: 0.5 },
          }}
        >
          <SpecificProfile
            user={profile}
            navigate={navigate}
            setProfile={setProfile}
          />
        </motion.div>
      ) : (
        <motion.div
          ref={targetRef}
          className="ProfileSelectorWrapper"
          key="state2"
          exit={{
            opacity: 0,
            transition: {
              delay: 1,
              duration: 1,
            },
          }}
        >
          {/* <img
            style={{
              opacity: profiles.length == 0 ? 1 : 1,
              zIndex: isPastTarget == true ? -1 : 0,
            }}
            className="BGPSW"
            // src="https://pbs.twimg.com/media/G1SPX1QbQAIs0LA?format=jpg&name=large"
            src="../src/assets/ASDAC.png"
            alt=""
          /> */}
          <motion.div
            className="P100"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0, transition: { delay: 2, duration: 0 } }}
            transition={{
              duration: 2,
              ease: [0, 0.71, 0.5, 1],
            }}
          >
            <h1>Profile</h1>
            <p>Select a collector profile to view</p>
          </motion.div>
          {profiles.length == 0 ? (
            <div className="LoaderWrapper">
              <div className="loader" />
              <p>Loading</p>
            </div>
          ) : (
            <div className="ProfileSelectorGrid">
              {!slug && showGrid && (
                <WindowScroller>
                  {({
                    height,
                    isScrolling,
                    scrollTop = { scrollTopOverride },
                  }) => (
                    <AutoSizer disableHeight>
                      {({ width }) => {
                        // Ultra responsive column calculation with smooth transitions
                        if (!width || !height || isNaN(width) || isNaN(height))
                          return null;
                        let width2 = width - 32;
                        let columnCount = 4;
                        let minColumnWidth = 350; // Minimum width for good image display
                        let maxColumnWidth = 1500; // Maximum width to prevent items from being too large

                        // Calculate actual column width within min/max bounds
                        let columnWidth = Math.floor(width2 / columnCount);

                        // Ensure column width stays within bounds
                        if (columnWidth < minColumnWidth) {
                          columnCount = Math.floor(width2 / minColumnWidth);
                          columnWidth = Math.floor(width2 / columnCount);
                        } else if (columnWidth > maxColumnWidth) {
                          columnCount = Math.ceil(width2 / maxColumnWidth);
                          columnWidth = Math.floor(width2 / columnCount);
                        }

                        // Dynamic row height based on column width (maintaining aspect ratio)
                        const aspectRatio = 7 / 12; // Adjust this to change card proportions
                        const rowHeight = Math.floor(columnWidth * aspectRatio);

                        // Calculate grid dimensions
                        const gridWidth = columnCount * columnWidth;
                        const rowCount = Math.ceil(
                          profiles.length / columnCount
                        );

                        // Dynamic padding based on screen size
                        const padding =
                          width2 <= 300
                            ? "0.15rem"
                            : width2 <= 200
                            ? "0.15rem"
                            : "0.15rem";

                        return (
                          <div
                            ref={topRef}
                            style={{
                              width: "95vw",
                              display: "flex",
                              justifyContent: "center",
                              overflow: "visible",
                              // backgroundColor: 'cyan',
                              // padding: "0 0.5rem 0 0.5rem",
                            }}
                          >
                            <Grid
                              ref={gridRef}
                              key={gridKey}
                              autoHeight
                              height={height}
                              width={gridWidth}
                              scrollTop={scrollTop}
                              isScrolling={isScrolling}
                              rowCount={rowCount}
                              rowHeight={rowHeight + 16}
                              columnCount={columnCount}
                              columnWidth={columnWidth}
                              overscanRowCount={width2 <= 768 ? 2 : 3} // Fewer overscanned rows on mobile
                              style={{
                                overflow: "visible",
                                position: "relative",
                                contain: "none",
                                willChange: "auto", // disables transform: translate
                              }}
                              containerStyle={{
                                overflow: "visible",
                              }}
                              cellRenderer={({
                                columnIndex,
                                rowIndex,
                                key,
                                style,
                              }) => {
                                const index =
                                  rowIndex * columnCount + columnIndex;
                                const item = profiles[index];
                                if (!item) return null;

                                return (
                                  <div
                                    key={key}
                                    style={{
                                      ...style,
                                      padding: "0.5rem",
                                      boxSizing: "border-box",
                                      transition: "all 0.3s ease", // Smooth transitions
                                      // backgroundColor: 'red',
                                      overflow: "visible",
                                    }}
                                  >
                                    <ProfileGridItem
                                      handleClick={handleClick}
                                      index={index}
                                      key={`profile-${item.username || index}`}
                                      ether={item}
                                    />
                                  </div>
                                );
                              }}
                            />
                          </div>
                        );
                      }}
                    </AutoSizer>
                  )}
                </WindowScroller>
              )}
            </div>
          )}
        </motion.div>
      )}
      {/* <div className="BGBlack"/> */}
    </AnimatePresence>
  );
}

const ProfileGridItem = React.memo(({ ether, handleClick }) => {
  // const color = useMemo(() => {
  //   const heroColor = ether.profilecolor;

  //   switch (heroColor) {
  //     case "Pink":
  //       return "var(--SP)";
  //     case "Blue":
  //       return "var(--SB)";
  //     case "Red":
  //       return "var(--SR)";
  //     case "Yellow":
  //       return "var(--SY)";
  //     case "Black":
  //       return "var(--SBB)";
  //     case "White":
  //       return "var(--SG)";
  //     default:
  //       return "var(--SG)";
  //   }
  // }, [ether.profilecolor]);\

  const [color, setColor] = useState(null);
  const imgRef = useRef(null);
  const timerRef = useRef(null);
  const typingRef = useRef(null);
  const [length, setLength] = useState(0);
  const [entered, setEntered] = useState(false);

  const onEnter = () => {
    timerRef.current = setTimeout(() => {
      setLength(0);
      setEntered(true);
    }, 1500);
  };

  const onLeave = () => {
    clearTimeout(timerRef.current);
    clearTimeout(typingRef.current); // 🔥 HARD STOP
    typingRef.current = null;

    setEntered(false);
    setLength(0);
  };

  useEffect(() => {
    if (!entered) return;

    const bio = ether.profilebio ?? "I have nothing to say...";
    const pauses = new Set(["!", ".", "?"]);

    if (length >= bio.length) return;

    const delay =
      length > 0 && pauses.has(bio[length - 1]) && !pauses.has(bio[length])
        ? 250
        : 30;

    typingRef.current = setTimeout(() => {
      setLength((l) => l + 1);
    }, delay);

    return () => {
      clearTimeout(typingRef.current);
    };
  }, [entered, length, ether.profilebio]);

  useEffect(() => {
    console.log(length);
  }, [length]);

  useEffect(() => {
    function luminance(r, g, b) {
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function ensureNotDark(r, g, b, min = 120) {
      let lum = luminance(r, g, b);

      if (lum >= min) return [r, g, b];

      const factor = min / lum;

      return [
        Math.min(255, Math.round(r * factor)),
        Math.min(255, Math.round(g * factor)),
        Math.min(255, Math.round(b * factor)),
      ];
    }
    if (!imgRef.current) return;

    const img = imgRef.current;
    const colorThief = new ColorThief();

    const handleLoad = () => {
      const [r, g, b] = colorThief.getColor(img, 30);
      const [nr, ng, nb] = ensureNotDark(r, g, b, 130);

      setColor(`rgb(${nr}, ${ng}, ${nb})`);
    };

    if (img.complete) handleLoad();
    else img.addEventListener("load", handleLoad);

    return () => img.removeEventListener("load", handleLoad);
  }, [ether]);

  const tokenId = useMemo(() => {
    return ether.profiletoken ?? 1999;
  }, [ether.profiletoken]);

  const imageUrl = useMemo(() => {
    return `https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${tokenId}`;
  }, [tokenId]);

  return (
    <motion.div
      className="ProfileSelectorGridItem ClickableOn"
      // initial={{ y: 50, opacity: 0 }}
      // whileInView={{ y: 0, opacity: 1 }}
      // transition={{
      //   duration: 0.5,
      //   ease: [0, 0.71, 0.5, 1.25],
      //   delay: 0,
      // }}
      // viewport={{ amount: 0, once: true }}

      onClick={() => handleClick(ether.username ?? "cee", ether.userid ?? -1)}
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
    >
      <div
        className="PPGP"
        style={{
          border: `0.25rem solid ${color}`,
        }}
      >
        {/* <div
          className="PGHeaderBlock2"
          style={{ background: color == "var(--SBB)" ? "var(--SG)" : color }}
        ></div> */}
        <img
          src={imageUrl}
          alt=""
          className="PGIPP"
          decoding="async"
          ref={imgRef}
          crossOrigin="anonymous"
        />
      </div>

      <motion.div
        className="PBoxWrapper"
        style={
          {
            // border: `solid 0.1rem ${color == "var(--SBB)" ? "var(--SG)" : color}`,
          }
        }
        // whileHover={{ boxShadow: `0 0 0.5rem 0.05rem ${color}` }}
      >
        {/* <svg
          className="PBOut"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color == "var(--SBB)" ? "var(--SG)" : color}
          strokeWidth="2"
          >
          <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
          <path d="m21 3-9 9" />
          <path d="M15 3h6v6" />
          </svg> */}
        <div className="PGIHeader">
          {/* <div className="AccentHover">
            <IdleAnimation color={color} z="1" h="40%" s="1.5s" />
            </div> */}
          <div
            className="PGHeaderBlock"
            style={{ background: color == "var(--SBB)" ? "var(--SG)" : color }}
          ></div>
          <div
            className="PBoxWrapperAccent"
            style={{
              background: color == "var(--SBB)" ? "var(--SG)" : color,
              maskImage: `url("../src/assets/Icons/${tokenId % 13}.png")`,
            }}
          />
          <div
            className="PBoxWrapperAccentx"
            style={{
              background: color == "var(--SBB)" ? "var(--SG)" : color,
              maskImage: ``,
            }}
          />
          <img
            src="https://pbs.twimg.com/media/GrT0OeOW4AAkHlr?format=jpg&name=large"
            // src="https://pbs.twimg.com/media/G5y3spja0AITsLW?format=jpg&name=large"
            // src="https://pbs.twimg.com/media/G_k-_RRX0AAlKyX?format=jpg&name=4096x4096"
            alt=""
            decoding="async"
          />
        </div>
        <div className="PGIDialogue">
          <div>
            {" "}
            {ether.profilebio?.slice(0, length) ??
              "I have nothing to say...".slice(0, length)}{" "}
          </div>
          <div className="PGIDialogueName">{ether.username?.slice(0, 15)}</div>
        </div>
        <div className="PGIInfo">
          <h3>{ether.username?.slice(0, 15)}</h3>
          <p>{ether.profiletitle ?? "Newbie"}</p>
        </div>
      </motion.div>
    </motion.div>
  );
});

ProfileGridItem.displayName = "ProfileGridItem";

function SpecificProfile({ navigate, user, setProfile }) {
  console.log("props: ", navigate);
  console.log("props: ", user);
  console.log("props: ", setProfile);

  const [profileData, setProfileData] = useState(null);
  const [entered, setEntered] = useState(false);
  const location = useLocation().pathname.slice(0, 16);
  console.log("loc: ", location);
  const path = `https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/users/profile/${
    location == "/Profile/wallet/" ? "wallet/" : ""
  }${user}`;
  console.log("path: ", path);
  const BG = useRef(null);

  useEffect(() => {
    let isCancelled = false;
    console.log("USER: ", user);

    const fetchData = async () => {
      const path = `https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/users/profile/${
        location == "/Profile/wallet/" ? "wallet/" : ""
      }${user}`;
      console.log("path: ", path);
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
          setProfileData(data.data[0]);
          console.log("PData: ", data.data);
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
  }, [user, location]);

  const tokenId = useMemo(() => {
    return profileData?.profiletoken ?? profileData?.ethers?.[0]?.tokenid ?? 0;
  }, [profileData?.profiletoken, profileData?.ethers]);
  console.log("PDATAHH: ", profileData);

  const color = useMemo(() => {
    const heroColor =
      profileData?.ethers?.[0] == null
        ? ""
        : profileData?.ethers?.[0]?.profilecolor;

    switch (heroColor) {
      case "Pink":
        return "var(--SP)";
      case "Blue":
        return "var(--SB)";
      case "Red":
        return "var(--SR)";
      case "Yellow":
        return "var(--SY)";
      case "Black":
        return "var(--SBB)";
      case "White":
        return "var(--SG)";
      default:
        return "var(--SG)";
    }
  }, [profileData]);

  const handleExit = () => {
    setProfile(null);
    navigate(`/Profile/`);
  };

  const throttledMoveCursor = useCallback(
    throttle((event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      if (BG.current) {
        const bgX = (-clientX + innerWidth / 2) / 5;
        const bgY = (-clientY + innerHeight / 2) / 5;
        BG.current.style.transform = `translate(${bgX}px, ${bgY}px)`;
      }
    }, 8),
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", throttledMoveCursor);
    return () => window.removeEventListener("mousemove", throttledMoveCursor);
  }, [throttledMoveCursor]);

  // console.log(user)

  return (
    <AnimatePresence>
      {profileData === null || profileData === undefined ? (
        <motion.div
          className="PLWrapper"
          key="loading"
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.5 } }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: 0.25,
          }}
        >
          <div className="EtherLoader"></div>
        </motion.div>
      ) : (
        <motion.div
          className="PWrapper"
          key="state1"
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, transition: { duration: 1, delay: 1 } }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: 0.25,
          }}
          onClick={handleExit}
        >
          <TitleScreen
            setEntered={setEntered}
            username={profileData.username}
            profileTitle={profileData.profiletitle}
            title={profileData.story?.title}
            description={profileData.story?.description}
          />
          <div className="Profile">
            <div className="ProfileBackButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
              </svg>
              <p>Click anywhere to exit!</p>
            </div>

            <div className="PGHeaderBlock"> </div>

            <div
              className="ProfileMenu"
              style={{
                // background: `linear-gradient(${color} -25rem ,rgba(0,0,0,0.85) 25rem, rgba(0,0,0,0.85) calc(100% - 10rem), ${color} calc(100% + 50rem))`,
                borderTop: `${color} 0.1rem solid`,
                // display: 'none'
              }}
            >
              {/* <div
                className="ProfileMenuAccent"
                style={{
                  // maskImage: `url("../assets/Icons/${tokenId % 13}.png")`,
                  maskImage: `url("../src/assets/Icons/${tokenId % 13}.png")`,
                  maskSize: "contain",
                  // maskImage: `url("/home/user/ethers/src/assets/Icons/0.png")`,
                }}
              /> */}

              <div className="PPPDotsProfileMenu" />
              {/* <img
                className="PMBG"
                // src="https://pbs.twimg.com/media/GmUin4ragAAx9uZ?format=jpg&name=large"
                // src="https://pbs.twimg.com/media/GrT0OeOW4AAkHlr?format=jpg&name=large"
                src="./assets/AC1.png"
                alt=""
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="var(--Base)"
                viewBox="0 0 16 16"
              >
                <path d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                <path d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
              </svg>

              <motion.div
                className="ProfileMenuHeader"
                // initial={{ y: 150 }}
                // whileInView={{ y: 0 }}
                // transition={{
                //   ease: [0, 0.71, 0.5, 1],
                //   duration: 0.5,
                //   once: true,
                // }}
                // viewport={{ once: true }}
              >
                {/* <div
                  className="BehindImage"
                  style={{
                    background: `linear-gradient(225deg,transparent 35%,${color} 50%,transparent 65%)`,
                  }}
                /> */}
                <div className="PMSocialWrapper">
                  <div
                    className={
                      profileData.twitter?.length > 0 ||
                      profileData.twitter != null
                        ? " PMSocialButton PMSocialButtonAvailable"
                        : "PMSocialButton"
                    }
                  >
                    {profileData.twitter?.length > 0 ||
                    profileData.twitter != null ? (
                      <div className="PMSocialButtonFloater">
                        @{profileData.twitter}
                      </div>
                    ) : null}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="var(--SG)"
                    >
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                  </div>
                  <div
                    className={
                      profileData.twitter?.length > 0 ||
                      profileData.twitter != null
                        ? "PMSocialButton PMSocialButtonAvailable"
                        : "PMSocialButton"
                    }
                  >
                    {profileData.instagram?.length > 0 ||
                    profileData.instagram != null ? (
                      <div className="PMSocialButtonFloater">
                        @{profileData.instagram}
                      </div>
                    ) : null}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 16 16"
                      fill="var(--SG)"
                    >
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                  </div>
                  <div
                    className={
                      profileData.twitter?.length > 0 ||
                      profileData.twitter != null
                        ? "PMSocialButton PMSocialButtonAvailable"
                        : "PMSocialButton"
                    }
                  >
                    {profileData.website?.length > 0 ||
                    profileData.website != null ? (
                      <div className="PMSocialButtonFloater">
                        @{profileData.website}
                      </div>
                    ) : null}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 16 16"
                      fill="var(--SG)"
                    >
                      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                    </svg>
                  </div>
                </div>

                <img
                  src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${tokenId}`}
                  loading="lazy"
                  decoding="async"
                  style={{
                    border: `${
                      color == "var(--SBB)" ? "var(--SG)" : color
                    } 0.1rem solid`,
                  }}
                />
                <div
                  className="BioBubble"
                  style={{
                    border: `${
                      color == "var(--SBB)" ? "var(--SG)" : color
                    } 0.1rem solid`,
                    color: color == "var(--SBB)" ? "var(--SG)" : color,
                  }}
                >
                  <p>ETHER #{tokenId}</p>
                  <p className="BBT">{profileData.profilebio}</p>
                </div>
                <div
                  className="ProfileMenuHeaderBG"
                  style={{
                    border: `${
                      color == "var(--SBB)" ? "var(--SG)" : color
                    } 0.1rem solid`,
                  }}
                >
                  <div className="ProfileMenuHeaderID">
                    <h2>{profileData?.username.slice(0, 25)}</h2>
                    <p
                      style={{
                        color: color == "var(--SBB)" ? "var(--SG)" : color,
                      }}
                    >
                      {profileData.profiletitle}
                    </p>
                    <p
                      style={{
                        color: color == "var(--SBB)" ? "var(--SG)" : color,
                        opacity: 0.5,
                      }}
                    >
                      {profileData.walletaddress == "" ||
                      profileData.walletaddress == null
                        ? "No wallet address added"
                        : profileData.walletaddress}
                    </p>
                  </div>
                  <img
                    // src="https://pbs.twimg.com/media/GmUin4ragAAx9uZ?format=jpg&name=large"
                    // src="https://pbs.twimg.com/media/GrT0OeOW4AAkHlr?format=jpg&name=large"
                    src="https://pbs.twimg.com/media/G5y3spja0AITsLW?format=jpg&name=large"
                    alt=""
                  />
                </div>
                {/* <div className="BehindImage">
                  <div
                    className="ShineLayer"
                    style={{
                      background: `linear-gradient(225deg, transparent 35%, ${color} 50%, transparent 65%)`,
                    }}
                  />
                </div> */}
              </motion.div>
              <div
                className="ProfileStats"
                style={{ color: color == "var(--SBB)" ? "var(--SG)" : color }}
              >
                <div className="ProfileStatsItem">
                  <h3>#26</h3>
                  <h2>Collector Ranking</h2>
                </div>
                <div className="ProfileStatsItem">
                  <h3>{profileData.lens}</h3>
                  <h2>Avatars Collected</h2>
                </div>
                <div className="ProfileStatsItem">
                  <h3>{profileData.badgecount}</h3>
                  <h2>Achievements</h2>
                </div>
                <div className="ProfileStatsItem">
                  <h3>{profileData.traitcount}</h3>
                  <h2>Traits Collected</h2>
                </div>
                <div className="ProfileStatsItem">
                  <h3>
                    {(
                      (100 * profileData.traitcount) /
                      profileData.traittotal
                    ).toFixed(2)}
                    %
                  </h3>
                  <h2>Traits Completion</h2>
                </div>
              </div>
              {profileData.equippedbadges == null ? null : (
                <div
                  className="ProfileStats ProfileStats2"
                  style={{ color: color == "var(--SBB)" ? "var(--SG)" : color }}
                  // style={{
                  //   background: `linear-gradient(rgba(255, 255, 255, 0.1) 5rem,transparent min(20rem, 20%),transparent min(calc(100% - 20rem), 80%),rgba(255, 255, 255, 0.1) calc(100% - 5rem)
                  //   )`
                  // }}
                >
                  <h2>Featured Badges</h2>
                  <div className="BadgeGrid">
                    {profileData.equippedbadges.map((el, i) => (
                      <BadgeItem
                        key={i}
                        name={el.badgename}
                        description={el.badgedescription}
                        c={color == "var(--SBB)" ? "var(--SG)" : color}
                        link={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/badge/${el.badgeid}`}
                      />
                    ))}
                  </div>
                </div>
              )}
              {profileData.ethers[0] == null ? null : (
                <div className="ProfileAvatarGrid">
                  <div
                    className="ProfileAvatarGridBG"
                    style={{
                      color: color == "var(--SBB)" ? "var(--SG)" : color,
                    }}
                  >
                    <h2>
                      {profileData.ethers[0] != null ? "Avatar Collection" : ""}
                    </h2>
                  </div>
                  {profileData.ethers[0] != null
                    ? profileData.ethers.map((avatar, index) => (
                        <AvatarItem
                          key={index}
                          c={color == "var(--SBB)" ? "var(--SG)" : color}
                          c2={avatar.background}
                          link={avatar.tokenid}
                        />
                      ))
                    : null}
                </div>
              )}

              <div className="BehindImage2">
                <div
                  className="ShineLayer"
                  style={{
                    background: `linear-gradient(225deg, transparent 35%, ${color} 50%, transparent 65%)`,
                  }}
                />
              </div>
              <div
                className="ProfileMenuAccent"
                style={{
                  // maskImage: `url("../assets/Icons/${tokenId % 13}.png")`,
                  // maskImage: `url("../src/assets/Icons/${tokenId % 11}.png")`,
                  // maskSize: "contain",
                  // maskImage: `url("/home/user/ethers/src/assets/Icons/0.png")`,
                }}
              />
            </div>

            <div className="ProfileWrapper">
              <div className="ProfileHeaderWrapper">
                <div className="ProfileHeader">
                  {profileData?.story &&
                  profileData?.story?.characters &&
                  profileData?.story?.dialogues ? (
                    <VisualNovel
                      color={color}
                      story={profileData.story}
                      entered={entered}
                    />
                  ) : profileData?.ethers[0] != null ? (
                    <VisualNovelWallet
                      entered={entered}
                      color={color}
                      avatars={profileData.ethers}
                    />
                  ) : null}
                  <div className="HeaderBG">
                    <img
                      src="https://pbs.twimg.com/media/G5y3spja0AITsLW?format=jpg&name=large"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      ref={BG}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="ProfileGapperDiv">
              <p>Collection End</p>
            </div> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const TitleScreen = React.memo(
  ({ title, description, username, profileTitle, setEntered }) => {
    const [flag, setFlag] = useState(false);

    const handleClick = (e) => {
      e.stopPropagation();
      setEntered(true);
      setFlag(true);
      window.scrollTo(0, 0);
      console.log(flag);
    };

    return (
      <AnimatePresence>
        {flag == false ? (
          <motion.div
            key="1111"
            className="ProfileTitleScreen"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            // transition={{
            //   duration: 0.25,
            //   delay: 3,
            // }}
            //style={flag ? { opacity: 0, display: "none" } : { opacity: 1 }}
            onClick={handleClick}
          >
            {title ? (
              <>
                <h3>-Story by {username}-</h3>
                <h1>{title || ""}</h1>
                <h2>{description || ""}</h2>
              </>
            ) : (
              <>
                <h3>Now entering the profile of {profileTitle}'s</h3>
                <h1>{username || ""}</h1>
                <h2>{description || ""}</h2>
              </>
            )}
            <img
              src="https://pbs.twimg.com/media/G-mHRhabgAAAhls?format=jpg&name=4096x4096"
              alt=""
            />
            <div className="PSTClick">
              <div className="EtherLoader"></div>
              <p>Click anywhere to continue</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
  }
);

TitleScreen.displayName = "TitleScreen";

const VisualNovel = React.memo(({ color, story, entered }) => {
  const [page, setPage] = useState(0);
  const [length, setLength] = useState(0);
  const PFP = useRef(null);
  const list = new Set(["!", ".", "?"]);

  const nextPage = (e) => {
    e.stopPropagation();

    if (length != story.dialogues[page].dialogue.length) {
      setLength(story.dialogues[page].dialogue.length);
      return;
    }

    setLength(0);
    console.log("clicked");
    setPage((prevPage) => {
      if (prevPage < story.dialogues.length - 1) {
        return prevPage + 1;
      } else {
        return 0;
      }
    });
  };

  useEffect(() => {
    if (!entered) return;

    if (length < story.dialogues[page].dialogue.length) {
      const timer = setTimeout(
        () => setLength(length + 1),
        list.has(story.dialogues[page].dialogue[length - 1]) &&
          !list.has(story.dialogues[page].dialogue[length])
          ? 250
          : 30
      );
      return () => clearTimeout(timer);
    }
  }, [page, length, story.dialogues, entered, list]);

  const throttledMoveCursor = useCallback(
    throttle((event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      if (PFP.current) {
        const pfpX = (clientX - innerWidth / 2) / 40 - innerHeight / 4;
        const pfpY = (clientY - innerHeight / 2) / 10;
        PFP.current.style.transform = `translate(${pfpX}px, ${pfpY}px) scale(1.5) `;
      }
    }, 8),
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", throttledMoveCursor);
    return () => window.removeEventListener("mousemove", throttledMoveCursor);
  }, [throttledMoveCursor]);

  return (
    <>
      <motion.div
        layout
        className="ProfilePFP"
        style={{
          border: `solid 0.1rem ${color == "var(--SBB)" ? "var(--SG)" : color}`,
          boxShadow: `0 0 0.5rem 0rem ${
            color == "var(--SBB)" ? "var(--SG)" : color
          }`,
          position: "absolute",
          left: story.dialogues[page].left
            ? "calc(1.25vw + 3.75vh)"
            : "calc(100vw - 30vh - 1.25vw - 3.75vh)",
        }}
        onClick={nextPage}
      >
        <motion.div
          animate={{ scaleX: story.dialogues[page].left ? 1 : -1 }}
          style={{ width: "100%", height: "100%", transition: { duration: 0 } }}
        >
          <div
            className="ProfilePFPMultiply"
            style={{
              backgroundColor: color == "var(--SBB)" ? "var(--SG)" : color,
            }}
          />
          <img
            src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${
              story.characters[story.dialogues[page].character].tokenid
            }`}
            alt=""
            ref={PFP}
            loading="lazy"
            decoding="async"
            // style={story.dialogues[page].left ? {scaleX: -1} : {scaleX: -1}}
          />
        </motion.div>
      </motion.div>

      <div
        className="ProfileIdentity"
        style={{
          left: story.dialogues[page].left
            ? "calc(30vh + 1.25vw + 3.75vh + 3.75vh)"
            : "calc(3.75vh + 1.25vw)",
          alignItems: story.dialogues[page].left ? "start" : "end",
        }}
      >
        <div
          style={{
            textShadow: `0 0 0.5rem ${
              color == "var(--SBB)" ? "var(--SG)" : color
            }, 0 0 0.5rem var(--SG)`,
            textAlign: story.dialogues[page].left ? "left" : "right",
          }}
          className="ProfileName"
          // style={{ textShadow: `0rem 0rem 2rem ${color}` }}
        >
          {story.characters[story.dialogues[page].character].name ||
            `ETHER#${
              story.characters[story.dialogues[page].character].tokenid
            }`}
        </div>
        <div
          style={{
            textShadow: `0 0 0.5rem ${
              color == "var(--SBB)" ? "var(--SG)" : color
            }, 0 0 0.5rem var(--SG)`,
            textAlign: story.dialogues[page].left ? "left" : "right",
          }}
          className="Title"
          // style={{ textShadow: `0 0 2rem ${color}` }}
        >
          {story.characters[story.dialogues[page].character].title || "????"}
        </div>
      </div>
      <div
        className="ProfileAchievements"
        style={{
          border: `solid 0.1rem ${color == "var(--SBB)" ? "var(--SG)" : color}`,
          boxShadow: `0 0 0.5rem 0rem ${
            color == "var(--SBB)" ? "var(--SG)" : color
          }`,
        }}
      >
        {/* <div className="ProfileMenuAccent" /> */}
        <div
          className="BouncingOrb"
          style={{
            background: `radial-gradient(var(--Base), ${
              color == "var(--SBB)" ? "var(--SG)" : color
            } 75%)`,
            opacity: length == story.dialogues[page].dialogue.length ? 1 : 0,
          }}
        />
        <div
          className="AchievementGrid"
          style={{
            padding: story.dialogues[page].left
              ? "2.5vh 5vh 5vh calc(30vh + 1.25vw + 3.75vh + 2vh)"
              : "2.5vh calc(30vh + 1.25vw + 3.75vh + 2vh) 5vh 5vh ",
          }}
          onClick={nextPage}
        >
          {story.dialogues[page].dialogue.slice(0, length)}
        </div>
      </div>
    </>
  );
});

VisualNovel.displayName = "VisualNovel";

const VisualNovelWallet = React.memo(({ color, avatars, entered }) => {
  const [page, setPage] = useState(0);
  const [length, setLength] = useState(0);
  const PFP = useRef(null);
  const list = new Set(["!", ".", "?"]);

  const dialogues = ["Can you shut up?", "Dont look at me bro..", "asd", "ddd"];

  const isLeft = avatars[page].tokenid % 2 === 1; // ODD = left, EVEN = right

  const nextPage = (e) => {
    e.stopPropagation();

    if (length !== dialogues[page].length) {
      setLength(dialogues[page].length);
      return;
    }

    setLength(0);
    setPage((prev) => (prev < dialogues.length - 1 ? prev + 1 : 0));
  };

  // --- Auto typing ---
  useEffect(() => {
    if (!entered) return;

    if (length < dialogues[page].length) {
      const timer = setTimeout(
        () => setLength(length + 1),
        list.has(dialogues[page][length - 1]) &&
          !list.has(dialogues[page][length])
          ? 250
          : 30
      );
      return () => clearTimeout(timer);
    }
  }, [page, length, dialogues, list, entered]);

  // --- Mouse PFP parallax ---
  const throttledMoveCursor = useCallback(
    throttle((event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      if (PFP.current) {
        const pfpX = (clientX - innerWidth / 2) / 40 - innerHeight / 4;
        const pfpY = (clientY - innerHeight / 2) / 10;
        PFP.current.style.transform = `translate(${pfpX}px, ${pfpY}px) scale(1.5)`;
      }
    }, 8),
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", throttledMoveCursor);
    return () => window.removeEventListener("mousemove", throttledMoveCursor);
  }, [throttledMoveCursor]);

  const accentColor = color === "var(--SBB)" ? "var(--SG)" : color;

  return (
    <>
      {/* PROFILE PICTURE */}
      <motion.div
        layout
        className="ProfilePFP"
        style={{
          border: `solid 0.1rem ${accentColor}`,
          boxShadow: `0 0 0.5rem 0rem ${accentColor}`,
          position: "absolute",
          left: isLeft
            ? "calc(1.25vw + 3.75vh)"
            : "calc(100vw - 30vh - 1.25vw - 3.75vh)",
        }}
        onClick={nextPage}
      >
        <motion.div
          animate={{ scaleX: isLeft ? 1 : -1 }}
          style={{ width: "100%", height: "100%" }}
        >
          <div
            className="ProfilePFPMultiply"
            style={{
              backgroundColor: accentColor,
            }}
          />
          <img
            src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${avatars[page].tokenid}`}
            alt=""
            ref={PFP}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </motion.div>

      {/* NAME + TITLE */}
      <div
        className="ProfileIdentity"
        style={{
          left: isLeft
            ? "calc(30vh + 1.25vw + 3.75vh + 3.75vh)"
            : "calc(3.75vh + 1.25vw)",
          alignItems: isLeft ? "start" : "end",
        }}
      >
        <div
          className="ProfileName"
          style={{
            textShadow: `0 0 0.5rem ${accentColor}, 0 0 0.5rem var(--SG)`,
            textAlign: isLeft ? "left" : "right",
          }}
        >
          ETHER #{avatars[page].tokenid}
        </div>

        <div
          className="Title"
          style={{
            textShadow: `0 0 0.5rem ${accentColor}, 0 0 0.5rem var(--SG)`,
            textAlign: isLeft ? "left" : "right",
          }}
        >
          {avatars[page].base}
        </div>
      </div>

      {/* DIALOGUE BOX */}
      <div
        className="ProfileAchievements"
        style={{
          border: `solid 0.1rem ${accentColor}`,
          boxShadow: `0 0 0.5rem 0rem ${accentColor}`,
        }}
      >
        <div
          className="BouncingOrb"
          style={{
            background: `radial-gradient(var(--Base), ${accentColor} 75%)`,
            opacity: length === dialogues[page].length ? 1 : 0,
          }}
        />

        <div
          className="AchievementGrid"
          style={{
            padding: isLeft
              ? "2.5vh 5vh 5vh calc(30vh + 1.25vw + 3.75vh + 2vh)"
              : "2.5vh calc(30vh + 1.25vw + 3.75vh + 2vh) 5vh 5vh",
            textAlign: isLeft ? "left" : "right",
          }}
          onClick={nextPage}
        >
          {dialogues[page].slice(0, length)}
        </div>
      </div>
    </>
  );
});

VisualNovelWallet.displayName = "VisualNovelWallet";

export function BadgeItem({ link, c, name, description }) {
  const containerRef = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [30, -30]);
  const rotateY = useTransform(x, [0, 1], [-30, 30]);
  const minrotateY = useTransform(y, [0, 1], [-30, 30]);

  const frame = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const newX = (e.clientX - rect.left) / rect.width;
        const newY = (e.clientY - rect.top) / rect.height;
        x.set(newX);
        y.set(newY);
      });
    },
    [x, y]
  );

  const handleMouseLeave = () => {
    animate(x, 0.5, { type: "spring", stiffness: 300, damping: 40 });
    animate(y, 0.5, { type: "spring", stiffness: 300, damping: 40 });
  };
  return (
    <motion.div
      className="BadgeGridItem"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        border: `${c} 0.1rem solid`,
        textShadow: `
      0 0 5px #fff,
      0 0 10px #0ff,
      0 0 20px #0ff,
      0 0 40px #0ff
      `,
      }}
      // whileHover={{ background : `linear-gradient(var(--BB),${c} 10%, var(--BB))` }}
    >
      {link == null ? null : (
        <motion.div
          className="BadgeItemImage"
          style={{
            rotateX,
            rotateY,
            translateX: rotateY,
            translateY: minrotateY,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 40 }}
        >
          <img decoding="async" src={link} className="HeroImage" />
        </motion.div>
      )}
      <div className="HeroImageBG">
        <img decoding="async" src={link} />
      </div>
      <h3 style={{ border: `${c} 0.1rem solid` }}>
        {name && name.length > 0 ? name.toUpperCase() : "BETA SPIRIT BADGE"}
      </h3>
      <p style={{ border: `${c} 0.1rem solid` }}>
        {description?.length != 0
          ? description
          : "This Badge was given to beta testers"}
      </p>
    </motion.div>
  );
}

function AvatarItem({ link, c, c2 }) {
  const color = useMemo(() => {
    const heroColor = c2 ?? "";

    switch (heroColor) {
      case "Pink":
        return "var(--SP)";
      case "Blue":
        return "var(--SB)";
      case "Red":
        return "var(--SR)";
      case "Yellow":
        return "var(--SY)";
      case "Black":
        return "var(--SG)";
      case "White":
        return "var(--SG)";
      default:
        return "var(--SG)";
    }
  }, []);

  return (
    <div
      className="ProfileAvatarGridItem"
      style={{
        border: `${c} 0.1rem solid`,
        //   textShadow: `
        // 0 0 5px #fff,
        // 0 0 10px #0ff,
        // 0 0 20px #0ff,
        // 0 0 40px #0ff
        // `,
      }}
    >
      <img
        decoding="async"
        src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${link}`}
        className="HeroImage"
      />
      <div
        className="ProfileAvatarGridImage"
        style={{ border: `${color} 0.1rem solid` }}
      >
        {/* <p style={{color: c}}>ETHER #4456</p> */}
        {/* <h3>ETHER</h3> */}
        <p
          // style={{ color: color}}
          className="ProfileAvatarGridImageName"
        >
          ETHER #{link}
        </p>
        <p style={{ opacity: 0.75 }}>
          What are you looking at? Don't look at me.
        </p>
      </div>
    </div>
  );
}
