import { useRef } from "react";
import { motion } from "motion/react";
import IdleAnimation from "../Components/IdleAnimation.jsx";

import "./Roadmap.css";

const Roadmap = () => {
  const content = [
    {
      ID: 1,
      title: "GENESIS",
      image:
        "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/2676",
      paragraphs:
        "The ETHERED website is now live, offering users access to an evolving digital world. New features and updates will be rolled out frequently. Users can create accounts from day one, explore the platform, and check out the roadmap for upcoming functionalities and improvements.",
      locked: false,
    },
    {
      ID: 2,
      title: "GALLERY",
      image:
        "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/170",
      paragraphs:
        "The gallery showcases an extensive collection of digital art and character designs. Users can browse through unique visuals, discover new aesthetics, and explore an evolving artistic universe filled with vibrant creations, each telling its own story within the ETHERED ecosystem.",
      locked: false,
    },
    {
      ID: 3,
      title: "PROFILES",
      image:
        "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/1268",
      paragraphs:
        "User profiles serve as digital identities within ETHERED. Customize your avatar, track progress, showcase achievements, and connect with other users. Profiles are the gateway to personalizing your experience, interacting with the community, and unlocking exclusive platform features.",
      locked: false,
    },
    {
      ID: 4,
      title: "STORIES",
      image:
        "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/1031",
      paragraphs:
        "Dive into immersive narratives that expand the ETHERED universe. Stories bring characters to life, unravel mysteries, and shape the lore of the platform. Whether exploring myths, adventures, or historical accounts, each tale enriches the experience and deepens the world-building.",

      locked: true,
    },
    {
      ID: 5,
      title: "DUNGEONS",
      image:
        "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/1778",
      paragraphs:
        "Challenge yourself in dungeons filled with enemies, traps, and treasures. These perilous journeys test your skills, strategy, and teamwork. Brave the unknown, defeat formidable foes, and claim valuable rewards as you progress through ever-changing and dangerous environments.",
      locked: true,
    },
    {
      ID: 6,
      title: "RANKINGS",
      image:
        "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/1280",
      paragraphs:
        "Compete with other players and climb the leaderboards. Rankings showcase the top performers in various categories, from battle prowess to achievements. Strive for the top spot, earn recognition, and prove your dominance in the ETHERED universe.",
      locked: true,
    },
    {
      ID: 7,
      title: "INVENTORY",
      image:
        "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/2139",
      paragraphs:
        "Manage your collected items, weapons, and gear in your personal inventory. From rare artifacts to powerful enhancements, your inventory plays a crucial role in shaping your gameplay. Keep track of your possessions and optimize your setup for upcoming challenges.",
      locked: true,
    },
    {
      ID: 8,
      title: "WARDROBE",
      image:
        "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/2627",
      paragraphs:
        "Customize your character’s appearance with a variety of outfits, accessories, and cosmetics. The wardrobe allows for full personalization, letting you stand out with unique styles while exploring the world of ETHERED. Unlock new items and express your individuality.",
      locked: true,
    },
  ];

  const chapterRef = useRef([]);

  return (
    <div className="RoadmapWrapper">
      <img
        src="../src/assets/uhfvggvuvu.png"
        // src="https://pbs.twimg.com/media/GH6A7CrakAAQHrq?format=jpg&name=large"
        alt=""
      />
      <div className="RoadmapHeader">
        <div className="RoadmapTitle"> Roadmap </div>
        <div className="RoadmapSubtitle">
          Future features that will be released. Check the cards to see what is
          in the works!
        </div>
      </div>
      <div className="RoadmapRailContainer">
        <div className="RoadmapRail">
          {content.map((content, index) => {
            return (
              <motion.div
                ref={(el) => (chapterRef.current[index] = el)}
                key={content.ID}
                className="RoadmapRailItem"
                initial={{ y: "100vh" }}
                animate={{ opacity: 1, y: "0" }}
                transition={{
                  duration: 0.25,
                  delay: (index / 7) * 2 + 1.5,
                }}
              >
                <div className="RailItemChapter"> Chapter {content.ID} </div>
                <div className="RailItemTitle"> {content.title} </div>
                <div className="RailItemLayer" />
                <div
                  className="RailItemLayer RailItemLayer2"
                  style={{
                    backgroundColor:
                      content.locked === true ? "var(--BB)" : "var(--SBB)",
                  }}
                />
                <img className="RailItemImage" src={content.image} />
                {content.locked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="RoadmapLock"
                  >
                    <path d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="RoadmapLock"
                  >
                    <path d="M12 0a4 4 0 0 1 4 4v2.5h-1V4a3 3 0 1 0-6 0v2h.5A2.5 2.5 0 0 1 12 8.5v5A2.5 2.5 0 0 1 9.5 16h-7A2.5 2.5 0 0 1 0 13.5v-5A2.5 2.5 0 0 1 2.5 6H8V4a4 4 0 0 1 4-4M2.5 7A1.5 1.5 0 0 0 1 8.5v5A1.5 1.5 0 0 0 2.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 9.5 7z" />
                  </svg>
                )}

                <div className="RailItemContent">
                  {content.locked ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="8"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3" />
                    </svg>
                  ) : null}
                  <div className="RailItemChapterInner">
                    {" "}
                    Chapter {content.ID}{" "}
                  </div>
                  <div className="RailItemTitleInner"> {content.title} </div>
                  <div className="RailItemDescription">
                    {" "}
                    {content.paragraphs}{" "}
                  </div>
                  {content.locked ? (
                    <div className="RailItemDescription RailItemDev">
                      Currently in Development
                    </div>
                  ) : (
                    <div
                      className="RailItemDescription RailItemDev"
                      style={{ color: "var(--SB)" }}
                    >
                      Feature Already Available
                    </div>
                  )}
                </div>
                <div className="RailItemEffect">
                  <IdleAnimation
                    z="1"
                    color={content.locked === true ? "var(--SR)" : "var(--SY)"}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* <div className="RoadmapProgressBar"></div> */}
    </div>
  );
};

export default Roadmap;
