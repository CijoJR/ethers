import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { WindowScroller, AutoSizer, Grid } from "react-virtualized";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTransform, useMotionValue, animate } from "motion/react";

import "./Profile.css";

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
  const [profiles, setProfiles] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  const topRef = useRef(null);
  const [gridKey, setGridKey] = useState(Date.now());
  const [scrollTopOverride, setScrollTopOverride] = useState(0);
  const gridRef = useRef(null);

  const [showGrid, setShowGrid] = useState(false);

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
    if (slug != null && profile == null && profiles == undefined) {
      let isCancelled = false;

      const fetchData = async () => {
        const path = `https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/users/profile/${slug}`;

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
            setProfile(data.data);
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
          setProfiles(data.data);
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
    (profileName) => {
      setProfile(profileName);
      navigate(`/Profile/${profileName}`);
    },
    [navigate]
  );

  return (
    <AnimatePresence>
      {profile != null || slug != undefined ? (
        <SpecificProfile
          setProfile={setProfile}
          user={profiles?.find((user) => user.username === profile) ?? {}}
          navigate={navigate}
        />
      ) : (
        <motion.div
          className="ProfileSelectorWrapper"
          key="state2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              delay: 0.1,
              duration: 0.2,
            },
          }}
        >
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
            <h2>Profile Explore</h2>
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
                              width: "90vw",
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
                                      handleClick={() =>
                                        handleClick(item.username ?? "cee")
                                      }
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
  const color = useMemo(() => {
    const heroColor = ether.ethers?.[0]?.background;

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
  }, [ether.ethers]);

  const tokenId = useMemo(() => {
    return ether.profiletoken ?? ether.ethers?.[0]?.tokenid ?? 0;
  }, [ether.profiletoken, ether.ethers]);

  const imageUrl = useMemo(() => {
    return `https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${tokenId}`;
  }, [tokenId]);

  return (
    <motion.div
      className="ProfileSelectorGridItem ClickableOn"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        ease: [0, 0.71, 0.5, 1.25],
        delay: 0.1,
      }}
      // viewport={{ amount: 0, once: true }}
      onClick={handleClick}
    >
      <div
        className="PPGP"
        style={{
          border: `0.1rem solid ${color == "var(--SBB)" ? "var(--SG)" : color}`,
        }}
      >
        <div
          className="PGHeaderBlock2"
          style={{ background: color == "var(--SBB)" ? "var(--SG)" : color }}
        ></div>
        <img src={imageUrl} alt="" className="PGIPP" decoding="async" />
      </div>

      <motion.div
        className="PBoxWrapper"
        style={{
          border: `solid 0.1rem ${color == "var(--SBB)" ? "var(--SG)" : color}`,
        }}
        // whileHover={{ boxShadow: `0 0 0.5rem 0.05rem ${color}` }}
      >
        <svg
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
        </svg>
        <div className="PGIHeader">
          {/* <div className="AccentHover">
            <IdleAnimation color={color} z="1" h="40%" s="1.5s" />
            </div> */}
          <div className="PGHeaderBlock" style={{ background: color }}></div>
          <img
            src="https://pbs.twimg.com/media/GrT0OeOW4AAkHlr?format=jpg&name=large"
            alt=""
            decoding="async"
          />
        </div>
      </motion.div>
      <div className="PGIInfo">
        <h3>{ether.username?.slice(0, 5)}</h3>
        <p>{ether.walletaddress?.slice(0, 5) ?? "Newbie"}</p>
      </div>
    </motion.div>
  );
});

ProfileGridItem.displayName = "ProfileGridItem";

function SpecificProfile({ navigate, user, setProfile }) {
  const BG = useRef(null);
  const PFP = useRef(null);

  const tokenId = useMemo(() => {
    return user.profiletoken ?? user.ethers?.[0]?.tokenid ?? 0;
  }, [user.profiletoken, user.ethers]);
  console.log(user);

  const color = useMemo(() => {
    const heroColor = user.ethers?.[0]?.background ?? "";

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
  }, [user]);

  const handleExit = () => {
    navigate(`/Profile/`);
    setProfile(null);
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

  // console.log(user)

  return (
    <AnimatePresence>
      {Object.keys(user).length === 0 ? (
        <motion.div
          className="PLWrapper"
          key="state1"
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: 0.25,
          }}
        ></motion.div>
      ) : (
        <motion.div
          className="PWrapper"
          key="state1"
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: 0.25,
          }}
          onClick={handleExit}
          >
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

            <div
              className="ProfileMenu"
              style={{
                background: `linear-gradient(${color} -25rem ,rgba(0,0,0,0.85) 25rem, rgba(0,0,0,0.85) calc(100% - 10rem), ${color} calc(100% + 50rem))`,
                borderTop: `${color} 0.1rem solid`,
              }}
            >
              {/* <img
                className="PMBG"
                // src="https://pbs.twimg.com/media/GmUin4ragAAx9uZ?format=jpg&name=large"
                src="https://pbs.twimg.com/media/GrT0OeOW4AAkHlr?format=jpg&name=large"
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
                initial={{ y: 150 }}
                whileInView={{ y: 0 }}
                transition={{
                  ease: [0, 0.71, 0.5, 1],
                  duration: 0.5,
                  once: true,
                }}
                viewport={{ once: true }}
              >
                {/* <div
                  className="BehindImage"
                  style={{
                    background: `linear-gradient(225deg,transparent 35%,${color} 50%,transparent 65%)`,
                  }}
                /> */}
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
                  <p className="BBT">Howdy Partner!</p>
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
                    <h2>{user?.username.slice(0, 25)}</h2>
                    <p
                      style={{
                        color: color == "var(--SBB)" ? "var(--SG)" : color,
                      }}
                    >
                      Vampire Hunter
                    </p>
                    <p
                      style={{
                        color: color == "var(--SBB)" ? "var(--SG)" : color,
                        opacity: 0.5,
                      }}
                    >
                      {user?.walletaddress}
                    </p>
                  </div>
                  <img
                    // src="https://pbs.twimg.com/media/GmUin4ragAAx9uZ?format=jpg&name=large"
                    src="https://pbs.twimg.com/media/GrT0OeOW4AAkHlr?format=jpg&name=large"
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
                  <h3>{user.ethers.length}</h3>
                  <h2>Avatars Collected</h2>
                </div>
                <div className="ProfileStatsItem">
                  <h3>0</h3>
                  <h2>Achievements</h2>
                </div>
                <div className="ProfileStatsItem">
                  <h3>0%</h3>
                  <h2>Traits Completion</h2>
                </div>
              </div>
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
                  {[...Array(12)].map((_, i) => (
                    <BadgeItem
                      key={i}
                      c={color == "var(--SBB)" ? "var(--SG)" : color}
                      link={
                        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fbec1116-f54d-4716-932f-800f4893b918/d50fme3-6902c223-4cdb-43e1-9e90-b51af27bf7dc.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZiZWMxMTE2LWY1NGQtNDcxNi05MzJmLTgwMGY0ODkzYjkxOFwvZDUwZm1lMy02OTAyYzIyMy00Y2RiLTQzZTEtOWU5MC1iNTFhZjI3YmY3ZGMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.8RkPh__s1bdV0BI6h5aZCVb9dv69wsqQFjrGlZBO4HM"
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="ProfileAvatarGrid">
                <div
                  className="ProfileAvatarGridBG"
                  style={{ color: color == "var(--SBB)" ? "var(--SG)" : color }}
                >
                  <h2>Avatar Collection</h2>
                </div>
                {user.ethers.map((avatar, index) => (
                  <AvatarItem
                    key={index}
                    c={color == "var(--SBB)" ? "var(--SG)" : color}
                    c2={avatar.background}
                    link={avatar.tokenid}
                  />
                ))}
              </div>
              <div className="BehindImage2">
                <div
                  className="ShineLayer"
                  style={{
                    background: `linear-gradient(225deg, transparent 35%, ${color} 50%, transparent 65%)`,
                  }}
                />
              </div>
            </div>
            <div className="PGHeaderBlock" style={{ background: color }}></div>

            <div className="ProfileWrapper">
              <div className="ProfileHeaderWrapper">
                <div className="ProfileHeader">
                  <div
                    className="ProfilePFP"
                    style={{
                      border: `solid 0.1rem ${
                        color == "var(--SBB)" ? "var(--SG)" : color
                      }`,
                      boxShadow: `0 0 0.5rem 0rem ${
                        color == "var(--SBB)" ? "var(--SG)" : color
                      }`,
                    }}
                  >
                    <div
                      className="ProfilePFPMultiply"
                      style={{
                        backgroundColor:
                          color == "var(--SBB)" ? "var(--SG)" : color,
                      }}
                    />
                    <img
                      src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${tokenId}`}
                      alt=""
                      ref={PFP}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="ProfileIdentity">
                    <div
                      style={{
                        textShadow: `0 0 0.5rem ${
                          color == "var(--SBB)" ? "var(--SG)" : color
                        }, 0 0 0.5rem var(--SG)`,
                      }}
                      className="ProfileName"
                      // style={{ textShadow: `0rem 0rem 2rem ${color}` }}
                    >
                      {user.username.slice(0, 25)}
                    </div>
                    <div
                      style={{
                        textShadow: `0 0 0.5rem ${
                          color == "var(--SBB)" ? "var(--SG)" : color
                        }, 0 0 0.5rem var(--SG)`,
                      }}
                      className="Title"
                      // style={{ textShadow: `0 0 2rem ${color}` }}
                    >
                      Vampire Hunter
                    </div>
                  </div>
                  <div
                    className="ProfileAchievements"
                    style={{
                      border: `solid 0.1rem ${
                        color == "var(--SBB)" ? "var(--SG)" : color
                      }`,
                      boxShadow: `0 0 0.5rem 0rem ${
                        color == "var(--SBB)" ? "var(--SG)" : color
                      }`,
                    }}
                  >
                    <div
                      className="BouncingOrb"
                      style={{
                        background: `radial-gradient(var(--Base), ${
                          color == "var(--SBB)" ? "var(--SG)" : color
                        } 75%)`,
                      }}
                    />
                    <div className="AchievementGrid">
                      Have you heard about the vampire living in the alleys? No?
                      Well I'm gonna run.
                    </div>
                  </div>

                  <div className="HeaderBG">
                    <img
                      src="https://pbs.twimg.com/media/GrT0OeOW4AAkHlr?format=jpg&name=large"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      ref={BG}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="ProfileGapperDiv">
              <p>Collection End</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function BadgeItem({ link, c }) {
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
        <img
          decoding="async"
          src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/badge/BADGE1`}
          className="HeroImage"
        />
      </motion.div>
      <h3>BETA SPIRIT BADGE</h3>
      <p style={{ border: `${c} 0.1rem solid` }}>
        This Badge was given to beta testers
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
