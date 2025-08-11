import "./Gallery.css";
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
import IdleAnimation from "./IdleAnimation.jsx";
import { WindowScroller, AutoSizer, Grid } from "react-virtualized";
import { AnimatePresence } from "motion/react";

export default function Gallery({ sendNotif }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({});
  const [hero, setHero] = useState(null);
  const { scrollY } = useScroll(); // scrollY is a MotionValue
  const [isPastTarget, setIsPastTarget] = useState(false);
  const divRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start start", "end end"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0vw", "100%"]);
  // const zIndex = useTransform(scrollYProgress, (val) => (val <= 0.33 ? 0 : -1));


  const bottomRef = useRef(null);
  const topRef = useRef(null);
  const targetRef = useRef(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (targetRef.current) {
      const targetHeight = targetRef.current.offsetHeight;
      const triggerPoint = targetHeight;
      setIsPastTarget(latest >= triggerPoint-705);
    }
  });
  useEffect(() => {
    console.log(filter);
  }, [filter]);

  // Fetch gallery items
  useEffect(() => {
    const fetchData = async () => {
      // if (formData.page !== 0) sendNotif("Fetching more avatars...");
      try {
        const res = await fetch(
          "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/collection/gallery",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(1112);
        setItems(data.data);
      } catch (err) {
        sendNotif("Fetch failed.");
      }
    };
    fetchData();
  }, []);

  const filteredItems = useMemo(() => {
    if (!items.length) return [];

    // If no filters are active, return all items
    const hasActiveFilters = Object.values(filter).some(
      (traitGroup) => Object.keys(traitGroup).length > 0
    );

    if (!hasActiveFilters) return items;

    // Filter items based on active filters
    return items.filter((item) => {
      // Check each filter category
      return Object.entries(filter).every(([traitType, selectedTraits]) => {
        // If no traits selected for this category, skip this filter
        if (!selectedTraits || Object.keys(selectedTraits).length === 0) {
          return true;
        }

        // Check if item has any of the selected traits for this category
        const itemTraitValue = item[traitType.toLowerCase()];
        return Object.keys(selectedTraits).some(
          (selectedTrait) =>
            itemTraitValue &&
            itemTraitValue.toLowerCase() === selectedTrait.toLowerCase()
        );
      });
    });
  }, [items, filter]);

  return (
    <div className="GalleryPage" ref={targetRef}>
      <div className="ProgressBarHEWrapper">
        <motion.div
          style={{ width }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="ProgressBarHE"
        />
      </div>

      {/* Background */}
      <motion.img
        src="https://pbs.twimg.com/media/Gvaa5bPWQAAgePH?format=jpg&name=4096x4096"
        alt=""
        className="GalleryBGimg"
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={isPastTarget ? { zIndex: -666 } : ""}
      />
      <GalleryHero hero={hero} setHero={setHero} />

      {/* Fixed Header */}
      <motion.div className="GalleryHeader">
        <h1>Gallery</h1>
        <p>A collection of 5,555 ether Avatars</p>
      </motion.div>

      {/* Virtualized Grid */}
      <div className="GapperTop"></div>
      <div className="RosterImageWrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="1rem"
          fill="var(--SG)"
          viewBox="0 0 16 16"
        >
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg>

        <WindowScroller>
          {({ height, isScrolling, scrollTop }) => (
            <AutoSizer disableHeight>
              {({ width }) => {
                // Ultra responsive column calculation with smooth transitions
                if (!width || !height || isNaN(width) || isNaN(height))
                  return null;
                let width2 = width - 32;
                let columnCount = 1;
                let minColumnWidth = 200; // Minimum width for good image display
                let maxColumnWidth = 275; // Maximum width to prevent items from being too large

                // Calculate optimal column count and width
                if (width2 <= 480) {
                  // Mobile portrait
                  columnCount = 1;
                } else if (width2 <= 768) {
                  // Mobile landscape / small tablet
                  columnCount = 2;
                } else if (width2 <= 1024) {
                  // Tablet
                  columnCount = 3;
                } else if (width2 <= 1280) {
                  // Small desktop
                  columnCount = 4;
                } else if (width2 <= 1536) {
                  // Medium desktop
                  columnCount = 5;
                } else if (width2 <= 1920) {
                  // Large desktop
                  columnCount = 6;
                } else {
                  // Ultra wide screens
                  columnCount = Math.min(
                    8,
                    Math.floor(width2 / minColumnWidth)
                  );
                }

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
                const aspectRatio = 1.1; // Adjust this to change card proportions
                const rowHeight = Math.floor(columnWidth * aspectRatio);

                // Calculate grid dimensions
                const gridWidth = columnCount * columnWidth;
                const rowCount = Math.ceil(filteredItems.length / columnCount);

                // Dynamic padding based on screen size
                const padding =
                  width2 <= 768
                    ? "0.025rem"
                    : width2 <= 1024
                    ? "0.025rem"
                    : "0.05rem";

                return (
                  <div
                    ref={topRef}
                    style={{
                      width: "100vw",
                      display: "flex",
                      justifyContent: "center",
                      // padding: "0 0.5rem 0 0.5rem",
                    }}
                  >
                    <Grid
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
                      cellRenderer={({ columnIndex, rowIndex, key, style }) => {
                        const index = rowIndex * columnCount + columnIndex;
                        const item = filteredItems[index];
                        if (!item) return null;

                        return (
                          <div
                            key={key}
                            style={{
                              ...style,
                              padding: padding,
                              boxSizing: "border-box",
                              transition: "all 0.3s ease", // Smooth transitions
                            }}
                          >
                            <ImageCard
                              ether={item}
                              kez={index}
                              setHero={setHero}
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
      </div>

      {/* Infinite load sentinel */}
      <GalleryButton
        setFilter={setFilter}
        filter={filter}
        counts={filteredItems.length}
        total={items.length}
      />


      <div ref={bottomRef} className="GapperDiv GapperDivBottom">
        <p>COLLECTION END</p>
      </div>
        <IdleAnimation s="5s" z="-1" color="var(--SBB)" sticky={true}/>
    </div>
  );
}

// THIS IS AN AVATAR
const ImageCard = React.memo((props) => {
  const { kez, ether, setHero } = props;
  const [ethers, setEthers] = useState(null);
  const [color, setColor] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (ether) {
      setEthers(ether);
    }
  }, [ether]);

  // Throttled version of moveImage for better performance

  // Set up intersection observer for scroll effects
  useEffect(() => {
    let ticking = false;

    const moveImage = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (imgRef.current && wrapperRef.current) {
            const { top, height } = wrapperRef.current.getBoundingClientRect();
            const translateY = (height - top) / 15; // Reduced parallax intensity
            imgRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.3)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttled scroll listener
    let timeoutId;
    const throttledMoveImage = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        moveImage();
        timeoutId = null;
      }, 8); // ~60fps
    };

    window.addEventListener("scroll", throttledMoveImage, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledMoveImage);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Fetch data only once when component mounts or etherNumber changes
  useEffect(() => {
    let isMounted = true;

    // Preload image
    if (ethers) {
      const img = new Image();
      img.src = `https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${ethers.tokenid}`;
    }

    return () => {
      isMounted = false;
    };
  }, [ethers]);

  const handleClick = useCallback(() => {
    setHero(ethers);
  }, [ethers, setHero]);

  return (
    <div className="RosterCard" onClick={handleClick}>
      <div className="RosterItem" ref={wrapperRef}>
        {!loaded ? (
          <>
            <div className="RosterItemBlack"> </div>
            <div className="RosterItemPlaceholder"></div>
          </>
        ) : null}
        {ethers ? (
          <img
            loading="lazy"
            src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${ethers.tokenid}`}
            ref={imgRef}
            onLoad={() => setLoaded(true)}
            decoding="async"
          />
        ) : null}
      </div>
      <div className="RosterInfo">
        <div className="RosterInfoEther">{ethers ? `ETHER #${ethers.tokenid}` : "Loading"}</div>
        {/* <div
          className="RosterInfoToken"
          style={
            ethers
              ? { transform: `translateX(0)` }
              : { visibility: "hidden", transform: `translateX(1rem)` }
          }
        >
          {ethers ? ethers.tokenid : null}
        </div> */}
        <div className="RosterInfoBase">
          <p>{ethers ? ethers.base : null}</p>
        </div>
      </div>
    </div>
  );
});

ImageCard.displayName = "ImageCard";

function GalleryHero({ hero, setHero }) {
  const [color, setColor] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const maskRef = useRef(null);

  // Motion values for tilt
  const containerRef = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [25, -25]);
  const rotateY = useTransform(x, [0, 1], [-25, 25]);

  const handleMouseMove = useCallback(
    (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    },
    [x, y]
  );

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  useEffect(() => {
    if (!hero) return;

    const backgroundMap = {
      Pink: "var(--SP)",
      Blue: "var(--SB)",
      Red: "var(--SR)",
      Yellow: "var(--SY)",
      Black: "var(--SBB)",
      White: "var(--SG)",
    };

    setColor(
      hero.gender === "CORRUPT" || hero.oneofone === "True"
        ? "var(--SBB)"
        : backgroundMap[hero.background] || "var(--SG)"
    );

    if (maskRef.current) {
      maskRef.current.style.clipPath =
        "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)";
      setTimeout(() => {
        maskRef.current.style.clipPath =
          "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      }, 0);
    }
  }, [hero]);

  const closeHero = () => {
    if (maskRef.current) {
      maskRef.current.style.clipPath =
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      setTimeout(() => {
        maskRef.current.style.clipPath =
          "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)";
      }, 0);
    }
    setTimeout(() => setHero(null), 1000);
  };

  const handleZoomedClick = () => {
    if (zoomed) {
      setZoomed(false);
    } else {
      closeHero();
    }
  };

  if (!hero) return null;

  return (
    <div
      className="HeroWrapper"
      ref={maskRef}
      style={zoomed ? { zIndex: 10 } : null}
    >
      <div className="HeroBGBlack" />

      <div
        className={
          zoomed ? "HeroImg HeroImgZoomed" : "HeroImg HeroImgNotZoomed"
        }
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          onClick={() => setZoomed(!zoomed)}
          className="HeroImgSpace"
          style={
            zoomed
              ? {
                  rotateX,
                  rotateY,
                  translateX: rotateX,
                  translateY: rotateY,
                  transformStyle: "preserve-3d",
                }
              : null
          }
          // transition={{ type: "spring", stiffness: 300, damping: 35 }}
        >
          <div className="expand">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              // stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 15 6 6" />
              <path d="m15 9 6-6" />
              <path d="M21 16v5h-5" />
              <path d="M21 8V3h-5" />
              <path d="M3 16v5h5" />
              <path d="m3 21 6-6" />
              <path d="M3 8V3h5" />
              <path d="M9 9 3 3" />
            </svg>
            <p>Click to expand</p>
          </div>
          {zoomed ? null : <div className="darkenImg" />}
          <img
            decoding="async"
            src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${hero.tokenid}`}
            className="HeroImage"
          />
        </motion.div>
      </div>
      <div
        className="HeroBGBlackZoomed"
        style={zoomed ? { opacity: 1 } : { opacity: 0 }}
        onClick={handleZoomedClick}
      />

      <div className="TransDiv">
        <p className="TDMotto" style={{ color }}>
          ETHER LABS. Born to create. Create to inspire
        </p>
        <div className="TDLine" style={{ backgroundColor: color }}></div>

        <div className="TDTop">
          <div className="TDTLeft"></div>
          <div className="TDTRight">
            <div className="TDEther" style={{ color }}>
              ETHER
            </div>
            <div className="TDToken" style={{ color }}>
              {"0".repeat(4 - hero.tokenid.toString().length) + hero.tokenid}
            </div>
            <div className="TDOwner">Owned by: <br></br> {hero.ownerwallet}</div>

            <div className="TDTraitsWrapper">
              {Object.entries(hero).map(([key, value]) => {
                if (!value || key === "tokenid" || key === "ownerwallet")
                  return null;
                return (
                  <div
                    className="TDTrait"
                    key={key}
                    style={{ background: `linear-gradient(90deg, transparent , ${color}, transparent 0.5rem, ${color}`   }}
                  >
                    <div className="TDTraitName">{key.toUpperCase()}</div>
                    <div className="TDTraitValue">
                      {value
                        .toLowerCase()
                        .split(" ")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <IdleAnimation s="3s" color={color} />
      </div>
      <p
        className="ExitGuide"
        style={
          zoomed ? { zIndex: 102, color: color } : { mixBlendMode: "multiply" }
        }
      >
        {zoomed ? "Click on the Avatar to close!" : "Click anywhere to exit!"}
      </p>

      <div
        className="TDHeader"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 0.25rem ${color}`,
        }}
      />
    </div>
  );
}

const GalleryButton = React.memo(({ setFilter, filter, counts, total }) => {
  const [activated, setActivated] = useState("");
  const [traits, setTraits] = useState([]);

  function activate() {
    setActivated(activated === "Active" ? "" : "Active");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/collection/traits",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        setTraits(data);
      } catch (err) {
        console.log("Fetch failed: ", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={"GalleryButtons " + activated}
      onClick={activated === "Active" ? null : activate}
    >
      <span className="material-symbols-sharp traitIconSVG" onClick={activate}>
        filter_list
      </span>

      <AnimatePresence>
        {activated === "Active" && (
          <>
            <motion.div className="traitCounts" 
            initial={{opacity: 0, x: 100}}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            >
              <div className="traitCountsViewer">
                {/* {traits.length > 0 &&
                  traits.map((element, i) =>
                    element.traitname.map((trait, j) => (
                      <div key={`${i}-${j}`}>{trait}</div>
                    ))
                  )} */}
              </div>
              <p>Total Avatars filtered:</p>
              <div className="TCStats">
                <p className="TCBig">{counts === 0 ? "0" : counts}</p>
                <p className="TCSmall">/{total === 0 ? "???" : total}</p>
              </div>
            </motion.div>
            <motion.div
              key="traits-list" // Add key for AnimatePresence
              className="Traitslist"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="GapperDivTL GapperDivTL1" />
              <h3>Traits List</h3>
              <div className="TraitslistLine" />

              {traits.length > 0 &&
                traits.map((element, i) => (
                  <TraitItems
                    key={`trait-${element.traittype}-${i}`} // Better key
                    element={element}
                    setFilter={setFilter}
                    flags={filter[element.traittype] ?? {}}
                  />
                ))}

              <div className="TraitslistLine2" />
              <div className="GapperDivTL GapperDivTL1" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="TDMotto">
        ETHER LABS. Born to create. Create to inspire
      </div>
    </div>
  );
});

GalleryButton.displayName = "GalleryButton";

const TraitItems = React.memo(({ element, setFilter, flags }) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(flags??false);

  const capitalizeWords = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const handleTraitClick = (traitName) => {
    setFilter((prev) => {
      const current = prev[element.traittype] || {};
      const exists = current[traitName];

      const updated = { ...current };
      if (exists) {
        delete updated[traitName];
      } else {
        updated[traitName] = true;
      }

      return {
        ...prev,
        [element.traittype]: updated,
      };
    });
  };

  return (
    <div className="TraitTab">
      <div
        className={isOpen ? "TraitTabHeaderOpen" : "TraitTabHeader"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="Coco">{capitalizeWords(element.traittype)}</div>
        <div className="Coco">{element.traitcount}</div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="TraitTabItems"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {element.traitname.map((trait, j) => (
              <LittleItem
                key={`${element.traittype}-${trait.traitname}-${j}`} // Better key
                name={capitalizeWords(trait.traitname)}
                count={trait.traitnamecount}
                click={() => handleTraitClick(trait.traitname)}
                flags={flags[trait.traitname] !== undefined}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

TraitItems.displayName = "TraitItems";

const LittleItem = React.memo(({ name, count, click, flags }) => {
  const handleClick = () => {
    click();
  };

  return (
    <motion.div
      className={flags ? "TraitTabItemOpen" : "TraitTabItem"}
      onClick={handleClick}
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      layout
    >
      <div>{name}</div>
      <div>{count}</div>
    </motion.div>
  );
});

LittleItem.displayName = "LittleItem";
