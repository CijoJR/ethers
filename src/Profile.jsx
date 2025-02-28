import { useEffect, useRef } from "react";
import "./Profile.css";

export default function Profile() {
  const BG = useRef(0);

  useEffect(() => {
    const moveCursor = (event) => {
      if (BG.current) {
        BG.current.style.transform = `translate(calc((-${event.clientX}px + 50vw ) / 2), 
          calc((-${event.clientY}px + 50vh) / 2)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="Profile">
      {/* HEADER */}
      <div className="ProfileWrapper">
        <div className="ProfileHeaderWrapper">
          <div className="ProfileHeader">
            {/* PFP */}
            <div className="ProfilePFP">
              <img src="https://images.ether.site/avatar/1994.png" alt="" />
            </div>
            {/* IDENTITY */}
            <div className="ProfileIdentity">
              <div className="ProfileName">CeeHoe</div>
              <div className="Title">Day One</div>
            </div>
            {/* ACHIEVEMENTS */}
            <div className="ProfileAchievements">
              <div className="AchievementGrid"></div>
            </div>

            <div ref={BG} className="HeaderBG">
              <img
                src="https://pbs.twimg.com/media/FzkO7x_akAAgUzJ?format=jpg&name=large"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* HEROES */}
        <div className="ProfileBody">
          <div className="ProfileBodyBump" />
          <div className="ProfileHeroes">
            <div className="ProfileHero">
              <div className="ProfileHero">
                <div className="ProfileHeroLayer" />
                <img src="https://images.ether.site/avatar/1999.png" alt="" />
              </div>
            </div>
            <div className="ProfileHero">
              <div className="ProfileHeroLayer" />
              <img src="https://images.ether.site/avatar/1992.png" alt="" />
            </div>
            <div className="ProfileHero">
              <div className="ProfileHeroLayer" />
              <img src="https://images.ether.site/avatar/2001.png" alt="" />
            </div>
            <div className="ProfileHero">
              <div className="ProfileHeroLayer" />
              <img src="https://images.ether.site/avatar/666.png" alt="" />
            </div>
            <div className="ProfileHero">
              <div className="ProfileHeroLayer" />
              <img src="https://images.ether.site/avatar/8.png" alt="" />
            </div>
          </div>

          {/* COLLECTION */}
          <div className="ProfileCollection">
            <div className="ProfileCollectionHeader">
              <p className="ProfileCollectionTitle">PRIVATE COLLECTION</p>
              <p>CeeHoe collects 52 Ethers</p>
            </div>
            <div className="ProfileCollectionBody">
              <div className="ProfileCollectionGrid">
                <div className="ProfileCollectionCard">
                  <img src="https://images.ether.site/avatar/1999.png" alt="" />
                </div>
                <div className="ProfileCollectionCard">
                  <img src="https://images.ether.site/avatar/1999.png" alt="" />
                </div>
                <div className="ProfileCollectionCard">
                  <img src="https://images.ether.site/avatar/1999.png" alt="" />
                </div>
                <div className="ProfileCollectionCard">
                  <img src="https://images.ether.site/avatar/1999.png" alt="" />
                </div>
                <div className="ProfileCollectionCard">
                  <img src="https://images.ether.site/avatar/1999.png" alt="" />
                </div>
                <div className="ProfileCollectionCard">
                  <img src="https://images.ether.site/avatar/1999.png" alt="" />
                </div>
                <div className="ProfileCollectionCard">
                  <img src="https://images.ether.site/avatar/1999.png" alt="" />
                </div>
                <div className="ProfileCollectionCard">
                  <img src="https://images.ether.site/avatar/1999.png" alt="" />
                </div>
                <div className="ProfileCollectionCard">
                  <img src="https://images.ether.site/avatar/1999.png" alt="" />
                </div>
                <div className="ProfileCollectionCard">
                  <img src="https://images.ether.site/avatar/1999.png" alt="" />
                </div>
              </div>
              <div className="ProfileGapperDiv">
                <p>Collection End</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
