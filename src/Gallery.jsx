import "./Gallery.css";
import React, { useState, useEffect, useRef } from "react";

export default function Gallery({ setCursorTooltip, cursorTooltip }) {
  const a = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
  ];
  const [hero, setHero] = useState(null);

  return (
    <div className="GalleryPage">
      <GalleryHero hero={hero} setHero={setHero} />
      {/* HEADER */}
      <div className="GalleryHeader">
        <h1>Gallery</h1>
        <p>A collection of 5,555 ether Avatars</p>
      </div>

      {/* GALLERY */}
      <div className="GalleryBody">
        <div className="GalleryWrapper">
          <div className="RosterWrapper">
            <div className="GapperDiv" />
            <div className="RosterImageWrapper">
              {a.map((item, i) => (
                <ImageCard
                  key={i}
                  etherNumber={item}
                  setHero={setHero}
                  setCursorTooltip={setCursorTooltip}
                  cursorTooltip={cursorTooltip}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <GalleryButton />

      <div className="GapperDiv GapperDivBottom">
        <p>COLLECTION END</p>
      </div>
    </div>
  );
}

const ImageCard = React.memo((props) => {
  const { etherNumber, setHero, setCursorTooltip } = props;
  const path = `./src/assets/${etherNumber}.json`;
  const [ethers, setEthers] = useState(null);
  const [img, setImg] = useState(new Image());
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef(0);
  const wrapperRef = useRef(0);
  const loaderRef = useRef(0);

  useEffect(() => {
    const moveImage = () => {
      if (imgRef.current && wrapperRef.current) {
        const { top, height } = wrapperRef.current.getBoundingClientRect();
        imgRef.current.style.transform = `translateY(${
          (top -   height) 
        }px) scale(1.25)`;
      }
    };

    window.addEventListener("scroll", moveImage);
    return () => window.removeEventListener("scroll", moveImage);
  }, []);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      loaderRef.current.style.transform = "translateY(100%)";
    }
  }, [isImageLoaded]);

  useEffect(() => {
    fetch(path)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEthers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Error handling
      });
  }, [path]);

  useEffect(() => {
    if (ethers?.image) {
      const img = new Image();
      img.src = ethers.image;
      img.onload = () => setIsImageLoaded(true); // Mark image as loaded when it's ready
    }
  }, [ethers]);

  return ethers ? (
    <div
      className="RosterCard"
      onClick={() => setHero(ethers)}
      onMouseEnter={() => {
        // setCursorTooltip(
        //   `Open\n${"0".repeat(4 - etherNumber.toString().length) + etherNumber}`
        // );
      }}
      onMouseLeave={() => {
        setCursorTooltip(null);
      }}
    >
      <div key={ethers.tokenId} className="RosterItem" ref={wrapperRef}>
        <div className="Loader" ref={loaderRef} />
        {!isImageLoaded ? null : (
          <img
            loading="eager"
            src={ethers.image}
            alt={`Avatar ${ethers.tokenId}`}
            ref={imgRef}
            onLoad={() => setIsImageLoaded(true)}
            className={`transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`} // Smooth fade-in
          />
        )}
      </div>
      <div className="RosterInfo">
        <div className="RosterInfoEther">ETHER</div>
        <div className="RosterInfoToken">{ethers.tokenId}</div>
        {ethers.attributes.map((item, i) => (
          <div key={i} className="RosterInfoBase">
            {item.trait_type === "BASE" ? (
              <p>{item.value.toUpperCase()}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  ) : null;
});
ImageCard.displayName = "ImageCard";

function GalleryHero({ hero, setHero }) {
  const [color, setColor] = useState(null);
  const maskRef = useRef(0);

  useEffect(() => {
    if (hero === null) return;
    let heroColor = null;
    hero.attributes.map((item) => {
      if (item.trait_type === "BACKGROUND") {
        heroColor = item.value;
      }
    });

    setColor(() => {
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
    });

    if (maskRef.current) {
      maskRef.current.style.clipPath =
        "polygon(50% 0%, 50% 0% ,50% 100%, 50% 100%)";
      setTimeout(() => {
        maskRef.current.style.clipPath =
          "polygon(0% 0%, 100% 0% ,100% 100%, 0% 100%)";
      }, 0);
    }
  }, [hero]);

  const closeHero = (e) => {
    if (maskRef.current) {
      maskRef.current.style.clipPath =
        "polygon(0% 0%, 100% 0% ,100% 100%, 0% 100%)";
      setTimeout(() => {
        maskRef.current.style.clipPath =
          "polygon(50% 0%, 50% 0% ,50% 100%, 50% 100%)";
      }, 0);
    }
    setTimeout(() => {
      setHero(null);
      console.log(e.clientX);
    }, 1000);
  };

  console.log(hero);
  return hero ? (
    <>
      <div onClick={closeHero} className="HeroWrapper" ref={maskRef}>
        <div className="HeroImg">
          <div className="HeroImgSpace">
            <img src={hero.image} alt="" />
          </div>
          <div className="HeroImgSpace"></div>
        </div>
        <div className="TransDiv">
          <p className="TDMotto" style={{ color: color }}>
            ETHER LABS. Born to create. Create to inspire
          </p>
          <div className="TDLine" style={{ backgroundColor: color }}></div>

          <div
            className="TDHeader"
            style={{
              backgroundColor: color,
              boxShadow: `0rem 0rem 0.25rem ${color}`,
            }}
          ></div>
          <div className="TDTop">
            <div className="TDTLeft"></div>
            <div className="TDTRight">
              <div className="TDEther" style={{ color: color }}>
                ETHER
              </div>
              <div className="TDToken" style={{ color: color }}>
                {"0".repeat(4 - hero.tokenId.toString().length) + hero.tokenId}
              </div>
              <div className="TDOwner">
                Owned by: 0x8387564834657637465834675
              </div>
              <div className="TDTraitsWrapper">
                {hero.attributes.map((items, i) => {
                  return (
                    <div
                      className="TDTrait"
                      key={i}
                      style={{ backgroundColor: color }}
                    >
                      <div className="TDTraitName">{items.trait_type}</div>
                      <div className="TDTraitValue">{items.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

function GalleryButton() {
  const [activated, setActivated] = useState("");

  function activate() {
    setActivated(activated === "Active" ? "" : "Active");
    console.log(activated);
  }

  return (
    <div className={"GalleryButtons " + activated}>
      <div className="TDMotto">
        ETHER LABS. Born to create. Create to inspire
      </div>
      <span className="material-symbols-sharp" onClick={activate}>
        filter_list
      </span>
    </div>
  );
}

// function GalleryHero({ hero }) {
//   return hero != null ? (
//     <div className="Hero">
//       <p>ETHER</p>
//       <p>{hero.tokenId}</p>
//       <div className="HeroImage">
//         <img src={hero.image} alt={`Avatar ${hero.tokenId}`} />
//       </div>
//     </div>
//   ) : (
//     <div className="PlaceHolder"></div>
//   );
// }
