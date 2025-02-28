import "./Gallery.css";
import { useState, useEffect } from "react";

export default function Gallery() {
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
                <ImageCard key={i} etherNumber={item} setHero={setHero} />
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

function ImageCard(props) {
  const path = `./src/assets/${props.etherNumber}.json`;
  const [ethers, setEthers] = useState(null);

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

  return ethers ? (
    <div className="RosterCard" onClick={() => props.setHero(ethers)}>
      <div key={ethers.tokenId} className="RosterItem">
        <img src={ethers.image} alt={`Avatar ${ethers.tokenId}`} />
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
}

function GalleryHero({ hero, setHero }) {
  const [color, setColor] = useState(null);

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

  }, [hero]);

  console.log(hero);
  return hero ? (
    <div onClick={() => setHero(null)}>
      <div className="HeroImg">
        <div className="HeroImgSpace">
          <img src={hero.image} alt="" />
        </div>
        <div className="HeroImgSpace"></div>
      </div>

      <div className="TransDiv" >
        <p className="TDMotto" style={{ color: color }}>
          ETHER LABS. Born to create. Create to inspire
        </p>
        <div className="TDLine" style={{ backgroundColor: color }}></div>
        <div className="TDHeader" style={{ backgroundColor: color }}></div>
        <div className="TDTop">
          <div className="TDTLeft"></div>
          <div className="TDTRight">
            <div className="TDEther" style={{ color: color }}>
              ETHER
            </div>
            <div className="TDToken" style={{ color: color }}>
              {"0".repeat(4 - hero.tokenId.toString().length) + hero.tokenId}
            </div>
            <div className="TDOwner">Owned by: 0x8387564834657637465834675</div>
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
