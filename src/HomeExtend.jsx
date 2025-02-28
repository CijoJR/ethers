import "./HomeExtend.css";
import { useState, useEffect } from "react";

export default function HomeExtend() {
  const [firstCard, setFirstCard] = useState(0);
  let paragraph = {
    FirstCard: [
      {
        header: "What is ETHERED",
        content:
          "ETHERED is a community-driven website designed to revitalize the Web3 experience for the Ether project. Inspired by the passion and creativity within the Web3 community, this platform aims to expand the digital interaction with Ether's NFTs.",
        image: './assets/'
      },
      {
        header: "Development",
        content:
          "This website is built and continuously updated by a dedicated community member. As development progresses, new features will be introduced, ranging from small updates to large-scale projects that will enhance the Ether experience.",
      },
      {
        header: "Updates",
        content:
          "Stay up to date with the latest website developments by following @CijoSenpai on Twitter/X. You can also find the most recent updates directly on the website. Additionally, announcements and progress updates are shared in Ether's Discord server via the Social Hub channel.",
      },
    ],
    SecondCard: [
      {
        header:'Site Launch',
        content:'The ETHERED website has launched! Feel free to explore the website and play around with what the site has to offer.\n\n More features and coming soon!'
      },
      {
        header: "The Gallery",
        content:
          "The first feature available on the site is the Avatar Gallery. This allows users to explore and view the entire collection of Ether Avatars—something not available on the third iteration of Ether's official website. The Gallery offers a more immersive way to inspect and appreciate every avatar in the collection.",
      },
    ],
  };

  return (
    <div className="HomeExtend">
      {/* <div className="Border"></div> */}
      <div className="SecOne Sec">
        <div className="SectionContent">
          <h2>{paragraph.FirstCard[firstCard].header}</h2>
          <p>{paragraph.FirstCard[firstCard].content}</p>
          <div></div>
          <div></div>
        </div>
        <div className="SectionMedia">
          <img src="./assets/1c.jpg" alt="" />
        </div>
      </div>

      <div className="SecTwo Sec">
        <div className="SectionContent">
          <h2>{paragraph.SecondCard[firstCard].header}</h2>
          <p>{paragraph.SecondCard[firstCard].content}</p>
        </div>
        <div className="SectionMedia">
          <img src="" alt="" />a
        </div>
      </div>
    </div>
  );
}
