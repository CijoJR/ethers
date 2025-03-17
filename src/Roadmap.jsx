import { useRef } from "react";
import "./Roadmap.css";

const Roadmap = () => {
  window.scrollTo(0, 0);

  const content = [
    {
        ID: 1,
        title: "GENESIS",
        image: "https://images.ether.site/avatar/2676.png",
        paragraphs: "The ETHERED website is now live, offering users access to an evolving digital world. New features and updates will be rolled out frequently. Users can create accounts from day one, explore the platform, and check out the roadmap for upcoming functionalities and improvements."
    },
    {
        ID: 2,
        title: "GALLERY",
        image: "https://images.ether.site/avatar/170.png",
        paragraphs: "The gallery showcases an extensive collection of digital art and character designs. Users can browse through unique visuals, discover new aesthetics, and explore an evolving artistic universe filled with vibrant creations, each telling its own story within the ETHERED ecosystem."
    },
    {
        ID: 3,
        title: "PROFILES",
        image: "https://images.ether.site/avatar/1268.png",
        paragraphs: "User profiles serve as digital identities within ETHERED. Customize your avatar, track progress, showcase achievements, and connect with other users. Profiles are the gateway to personalizing your experience, interacting with the community, and unlocking exclusive platform features."
    },
    {
        ID: 4,
        title: "STORIES",
        image: "https://images.ether.site/avatar/1031s.png",
        paragraphs: "Dive into immersive narratives that expand the ETHERED universe. Stories bring characters to life, unravel mysteries, and shape the lore of the platform. Whether exploring myths, adventures, or historical accounts, each tale enriches the experience and deepens the world-building."
    },
    {
        ID: 5,
        title: "DUNGEONS",
        image: "https://images.ether.site/avatar/1778.png",
        paragraphs: "Challenge yourself in dungeons filled with enemies, traps, and treasures. These perilous journeys test your skills, strategy, and teamwork. Brave the unknown, defeat formidable foes, and claim valuable rewards as you progress through ever-changing and dangerous environments."
    },
    {
        ID: 6,
        title: "RANKINGS",
        image: "https://images.ether.site/avatar/1280.png",
        paragraphs: "Compete with other players and climb the leaderboards. Rankings showcase the top performers in various categories, from battle prowess to achievements. Strive for the top spot, earn recognition, and prove your dominance in the ETHERED universe."
    },
    {
        ID: 7,
        title: "INVENTORY",
        image: "https://images.ether.site/avatar/2139.png",
        paragraphs: "Manage your collected items, weapons, and gear in your personal inventory. From rare artifacts to powerful enhancements, your inventory plays a crucial role in shaping your gameplay. Keep track of your possessions and optimize your setup for upcoming challenges."
    },
    {
        ID: 8,
        title: "WARDROBE",
        image: "https://images.ether.site/avatar/2627.png",
        paragraphs: "Customize your character’s appearance with a variety of outfits, accessories, and cosmetics. The wardrobe allows for full personalization, letting you stand out with unique styles while exploring the world of ETHERED. Unlock new items and express your individuality."
    }
];

  const chapterRef = useRef([]);

  // function open(id) {
  //   if (
  //     chapterRef.current[id] &&
  //     chapterRef.current[id].className == "RoadmapRailItem"
  //   ) {
  //     chapterRef.current[id].className = "RoadmapRailItem RoadmapRailItemOpen";
  //   } else {
  //     chapterRef.current[id].className = "RoadmapRailItem";
  //   }
  // }

  

  return (
    <div className="RoadmapWrapper">
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
              <div
                ref={(el) => (chapterRef.current[index] = el)}
                key={content.ID}
                className="RoadmapRailItem"
                onClick={() => open(index)}
              >
                <div className="RailItemChapter"> chapter {content.ID} </div>
                <div className="RailItemTitle"> {content.title} </div>
                <div className="RailItemLayer" />
                <div className="RailItemDescription"> {content.paragraphs} </div>
                <img className="RailItemImage" src={content.image} />
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="RoadmapProgressBar"></div> */}
    </div>
  );
};

export default Roadmap;
