import "./About.css";
import { useState } from "react";
import IdleAnimation from "./IdleAnimation.jsx";
import { AnimatePresence, motion } from "motion/react";
import { div } from "motion/react-client";
import { initial } from "lodash";

export default function About() {
  const [page, setPage] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const handlePrev = () => {
    if (isClicked) {
      return;
    }
    setIsClicked(true);
    if (page > 0) {
      setPage(page - 1);
    } else {
      setPage(2);
    }
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };
  const handleNext = () => {
    if (isClicked) {
      return;
    }
    setIsClicked(true);

    if (page < 2) {
      setPage(page + 1);
    } else {
      setPage(0);
    }
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  return (
    <motion.div className="AboutWrapper">
      <div className="AboutContainer">
        <div className="AboutDots"></div>
        <div className="AboutButton" onClick={handlePrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
          </svg>
        </div>
        <div className="AboutContainerPager">
          <div className={page == 0 ? "ACDots ACDotsActive" : "ACDots"}></div>
          <div className={page == 1 ? "ACDots ACDotsActive" : "ACDots"}></div>
          <div className={page == 2 ? "ACDots ACDotsActive" : "ACDots"}></div>
        </div>
        <div className="AboutButton" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {page == 0 ? (
          <Page1 key="page1" />
        ) : page == 1 ? (
          <Boards key="page2" />
        ) : page == 2 ? (
          <Faq key="page3" />
        ) : null}
      </AnimatePresence>
      <div className="AboutImageContainer">
        {/* <div className="AboutImageContainerC"/> */}
        <img
          src="./src/assets/HE_HERO2.webp"
          alt=""
          // style={page != 0 ? { filter: "blur(3rem) grayscale(1)" } : {}}
        />
      </div>
      {/* <IdleAnimation s="4s" color="var(--SBB)" /> */}
    </motion.div>
  );
}

function Page1() {
  return (
    <motion.div
      className="Page1Container"
      transition={{ duration: 0.5 }}
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
    >
      <h1>ABOUT</h1>
      <p>
        Ethered is a community-driven website dedicated to Project ETHER, an
        initiative with contributions from the community. Currently under
        construction, Ethered aims to be a central hub for all things ETHER,
        with exciting new features planned for future release.
        <br />
        I made the website in hopes of bringing back the web3 side of the
        project. The community loved the way RAIDS was made. It was a fun way to
        share an experience tied to your NFTs with others and my goals with it
        is to get that same feeling with this website.
        <br />
        The website will be worked on constantly. Thank you for your support!
        -CIJO
      </p>
    </motion.div>
  );
}

function Boards() {
  return (
    <motion.div
      className="AboutTextContainer"
      transition={{ duration: 0.5 }}
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
    >
      {/* <div className="AboutGapper" /> */}
      <div className="AboutTitleAbout AboutGItem">
        <div className="AboutTitle ">ETHER</div>
        <div className="AboutDescription">
          Ethered is a community-driven website dedicated to Project ETHER, an
          initiative with contributions from the community. Currently under
          construction, Ethered aims to be a central hub for all things ETHER,
          with exciting new features planned for future release.
        </div>
      </div>
      {/* <br /> */}
      <div className=" AboutGItem">
        <div className="AboutTitle">Community</div>
        <div className="AboutDescription">
          Ethered is a community-driven website dedicated to Project ETHER, an
          initiative with significant contributions from the community.
          Currently under construction, Ethered aims to be a central hub for all
          things ETHER, with exciting new features planned for future release.
        </div>
      </div>
      {/* <br /> */}
      <div className=" AboutGItem">
        <div className="AboutTitle">Creators</div>
        <div className="AboutDescription">
          We aim to empower creators to showcase their work and connect with a
          vibrant community of enthusiasts. Whether you're an artist, designer,
          or content creator, Ethered provides a platform to share your
          creations and engage with fellow creators.
        </div>
      </div>
      {/* <br /> */}
      <div className=" AboutGItem">
        <div className="AboutTitle">Collectors</div>
        <div className="AboutDescription AboutDescriptionLast">
          Ethered is a community-driven website dedicated to Project ETHER, an
          initiative with significant contributions from the community.
          Currently under construction, Ethered aims to be a central hub for all
          things ETHER, with exciting new features planned for future release.
        </div>
      </div>
      {/* <br /> */}
      <div className=" AboutGItem">
        <div className="AboutTitle">Personalization</div>
        <div className="AboutDescription AboutDescriptionLast">
          Ethered is a community-driven website dedicated to Project ETHER, an
          initiative with significant contributions from the community.
          Currently under construction, Ethered aims to be a central hub for all
          things ETHER, with exciting new features planned for future release.
        </div>
        {/* <div className="AboutGapper" /> */}
      </div>
    </motion.div>
  );
}

function Faq() {
  const [QNA, setQNA] = useState([
    ["Why make a website?", 
      `Having a website as the center of a community helps us in many ways. There are unlimited possibilites that can be built with a website. In the case of Ether, this could be the start of a base for sharing creation and bring life into the web3 side of Ether via utilization of NFTs into a real world product (games, apps, digital products, etc)
      `],
      ["What about the official Ether website?", 
        `While there is already an official website with similar purposes, there are also benefits to having a community ran website. One of them is unlimited and unrestricted creativity and development. With the community made website, this can also be a hub for sharing creations, web3-related builds, creating digital events/experiences and any other that may not align with the roadmap of Ether right now.

        This website will also serve to be a temporary vessel for features not yet available on the official website.
        `],
    ["Why no verification on wallet addresses?", 
      `Before adding this feature, It'd be best to ask permision first from our founder, V, for this website to use a wallet connect verification. Even though we are a tight-knit community and trust each other well, it's important to be careful and get approvals for security related developments. 
      
      For now, you can add and edit your main wallet address to play around with the available features.`],
    ["What is being worked on?", 
      `In the short term, we are working on getting a staking system up and running (Dungeons/Quests), more customization and sharable-content to spread awareness of the ETHER brand via Twitter/X platform. 

      Other than the previously mentioned, we are planning to develop a shop and trade system, etc. For now, our priority is developing features that can boost the social media presence and NFT utilization of ETHER. 
      `],
    ["Are you developing a game?",
      `We do plan to make a game-like staking feature in the near future. The game will be the foundation of the system where you can earn tokens and trade them for unlockables (Something like the previous RAIDS system). The type of game and mechanics are still in the design phase as of now. We are planning to keep build on top of the game once the core system has been launched. `
    ],
    ["What are unlockables and can I trade them?", 
      `Unlockables are items such as badges, headers, accents, titles, items that are earned by various ways such as collecting certain ethers, random item drops, gacha boxes, quest rewards, participating in events, etc. These unlockables are designed so that some of them are tradable while some are not. 
      
      The end goal of the unlockables are a trading system and a shop/market system where users can freely manage the items they have earned.
      `],
    ["Why is the development taking a while?", 
      `The development of the website is taking a while because it is developed by a sole developer/artist working on little spare time. Even though we can only develop a few hours every week, we can assure you that the team is working constantly and has been for months.
      
      We do appreciate the patience and support <3`
    ],
    ["How can I contribute to the efforts?", 
      `You can contribute to the initiative by customizing and sharing your profile on social media. By downloading and sharing your personal profile card, you are already contributing to the community efforts!`],
  ]);
  return (
    <motion.div
      className="FAQContainer"
      transition={{ duration: 0.5 }}
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      layout
    >
      <div>
        <h1>Frequently asked questions</h1>
        <p>
          Below are some answers for frequently asked questions that may
          interest you.
        </p>
      </div>
      <div className="FAQWrapper"> 
        {QNA.map((element, i) => {
          return <FAQItem key={i} q={element[0]} a={element[1]} d={i} />;
        })}
      </div>
    </motion.div>
  );
}

function FAQItem({ q, a, d }) {
  const [open, setOpen] = useState(d==0?true:false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <motion.div
      className="FAQItem"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25, delay: d / 10 + 0.25 }}
      layout
    >
      <motion.div
        className="FAQTitle"
        onClick={() => handleOpen()}
        animate={{
          backgroundPosition: ["0% 100%", "100% 100%", "0% 100%"],
        }}
        transition={{
          duration: 1,
          ease: [0.95, 0.05, 0.795, 0.035],
          repeat: Infinity,
          delay: d / 10,
        }}
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="FAQTarrow"
        >
          ↓
        </motion.div>
        {q}
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="FAQBody"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="FAQBodyDots"></div>
            <p style={{ whiteSpace: "pre-line" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
