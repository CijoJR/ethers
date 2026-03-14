import "./HomeExtend.css";
import IdleAnimation from "../Components/IdleAnimation.jsx";
import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, useScroll, useInView, useTransform } from "motion/react";
import { Faq } from "../The Vision Menu/About.jsx";

export default function HomeExtend() {
  const divRef = useRef(null);

  const sec1Ref = useRef(null);
  const isInView1 = useInView(sec1Ref);
  const sec2Ref = useRef(null);
  const isInView2 = useInView(sec2Ref);
  const sec3Ref = useRef(null);
  const isInView3 = useInView(sec3Ref);
  const sec4Ref = useRef(null);
  const isInView4 = useInView(sec4Ref);
  const [scrollState, setScrollState] = useState(0);

  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start start", "end end"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0vw", "100vw"]);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollState(latest);
    });

    return () => unsubscribe(); // clean up when component unmounts
  }, [scrollYProgress]);

  return (
    <div className="HomeExtend" ref={divRef}>
      <div className="ProgressBarHEWrapper">
        <motion.div
          style={{ width }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="ProgressBarHE"
        />
      </div>
      <div
        className="SecWrapper SecWrapper1"
        style={
          scrollState >= 0.4
            ? { visibility: "hidden" }
            : { visibility: "visible" }
        }
      >
        {/* <img src="./src/assets/HE_HERO2.webp" alt="" /> */}
        {/* <IdleAnimation h="120vh" s="4s" color="var(--SB)" /> */}
        <motion.div className="Sec Sec1" ref={sec1Ref}>
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
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={
              isInView1
                ? {
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.4,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              y: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            Create your Identity
          </motion.h2>
          <motion.h3
            initial={{ y: 100, opacity: 0 }}
            animate={
              isInView1
                ? {
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.5,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              y: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            Unlock the full potential of our platform by creating your unique
            identity. Establishing an account grants you access to a suite of
            enhanced features designed to personalize your experience and
            connect you with our community. By taking this simple step, you'll
            be able to save your preferences, contribute to discussions, access
            exclusive content, and seamlessly interact with all that our website
            has to offer. Create your identity today and become a valued member
            of our growing network.
            {/* <div className="SecWrapper1BG" /> */}
          </motion.h3>
          <motion.div
            className="HEButtonsWrapper"
            initial={{ y: 100, opacity: 0 }}
            animate={
              isInView1
                ? {
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.6,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              y: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            <NavLink to="./Register" className="RegisterButton ClickableOn">
              Register
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg>
            </NavLink>
            <NavLink to="./Login" className="LoginButton ClickableOn ">
              Login
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg>
            </NavLink>
          </motion.div>
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={
              isInView1
                ? {
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.7,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              y: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            {" "}
            Scroll down to see other features that can be fully accessed with an
            account{" "}
          </motion.p>
        </motion.div>
      </div>
      <div className="SecGapper"></div>
      <div className="SecWrapper SecWrapper2">
        <div className="Sec2Dots" />
        {/* <div className="herosec2wrapper">
          <motion.img
            initial={{ filter: "blur(2rem)", transform: "scale(1.2)" }}
            whileInView={{
              filter: "none",
              transform: "scale(1)",
              transition: {
                duration: 0.5,
                // ease: [0, 0.25, 0.5, 1],
              },
            }}
            exit={{
              filter: "blur(2rem) grayscale(1.2)",
              transform: "scale(2)",
              transition: {
                duration: 0.5,
                // ease: [0, 0.25, 0.5, 1],
              },
            }}
            viewport={{ once: false, amount: 0.8 }}
            src="./src/assets/HE_HERO2.webp"
            alt=""
          />
        </div> */}
        <motion.div className="Sec Sec2" ref={sec2Ref}>
          {/* <img className="HE2BImg" src="./src/assets/HE_HERO2.png" alt="" /> */}

          <motion.h2
            initial={{ x: -200, opacity: 0 }}
            animate={
              isInView2
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            Ether Avatars
          </motion.h2>
          <motion.h3
            initial={{ x: -200, opacity: 0 }}
            animate={
              isInView2
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.2,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            Explore the vibrant heart of our community in the Gallery, a
            visually stunning showcase of every unique avatar within our
            5555-piece collection. Here, you can immerse yourself in the diverse
            artistry and creativity that defines project Ether. Browse through
            the entire collection, discover rare traits, and witness the full
            spectrum of Ethers digital collectible.
          </motion.h3>
          <motion.p
            initial={{ x: -200, opacity: 0 }}
            animate={
              isInView2
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.25,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            <i>&quot;All of them looks pretty. Some of them are red.&quot; </i>
            <br />
            -Ichika, Oni Guide
          </motion.p>
          <motion.div
            className="BWrapper ClickableOn"
            initial={{ x: -200, opacity: 0 }}
            animate={
              isInView2
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            <NavLink to="./Gallery" className="GalleryButton">
              View
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
      <div className="SecWrapper SecWrapper3">
          <div className="Sec3Dots" />
        <motion.div className="Sec Sec3" ref={sec3Ref}>
          {/* <div className="Sec3Shaper"/> */}
          {/* <motion.img
            initial={{
              // opacity: 0,
              filter: "blur(1rem)",
            }}
            whileInView={{
              // x: 0,
              // opacity: 1,
              filter: "none",
            }}
            exit={{
              // opacity: 0,
              filter: "blur(1rem)",
              // transition: { duration: 0, delay: 0.5 },
            }}
            transition={{
              delay: 0,
              duration: 1,
              // ease: [0, 0.25, 0.5, 1],
            }}
            src="./src/assets/HE_HERO1.webp"
            alt=""
            viewport={{ once: false, amount: 0.8 }}
          /> */}

          {/* <img className="HEBImg" src="./src/assets/HE_HERO1.webp" alt="" /> */}
          <motion.h2
            initial={{ x: 200, opacity: 0 }}
            animate={
              isInView3
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            Profiles & Achievements
          </motion.h2>
          <motion.h3
            initial={{ x: 200, opacity: 0 }}
            animate={
              isInView3
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.2,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            Dive into the heart of our community with our robust User Profiles
            section. Here, you can seamlessly search and explore the diverse
            profiles of fellow members, discovering shared interests and
            connections. Showcase your hard-earned achievements, displayed
            proudly on your profile. From milestones reached to challenges
            conquered, each badge and accolade tells a story of your engagement
            and dedication. Collect and curate your accomplishments, creating a
            dynamic representation of your progress and contributions within our
            vibrant community.
          </motion.h3>
          <motion.p
            initial={{ x: 200, opacity: 0 }}
            animate={
              isInView3
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.25,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            <i>&quot;I've met a lot of interesting people over the past century.&quot; </i>
            <br />
            -Dante, Corrupted Vampire
          </motion.p>
          <motion.div
            className="BWrapper2"
            initial={{ x: 200, opacity: 0 }}
            animate={
              isInView3
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            <NavLink href="./Profile" className="GalleryButton">
              Explore
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
      <div className="SecWrapper ">
        <motion.div className="Sec Sec2" ref={sec4Ref}>
          <motion.h2
            initial={{ x: -200, opacity: 0 }}
            animate={
              isInView4
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            What's Next?
          </motion.h2>
          <motion.h3
            initial={{ x: -200, opacity: 0 }}
            animate={
              isInView4
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.2,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            We’re actively building out the next phase of the website to better
            support our growing community, especially on the Web3 side of
            Project Ether. The upcoming updates will introduce exclusive
            features designed specifically for holders, including wallet
            integration, access to gated content, project updates, and
            interactive experiences in the ecosystem. This marks a key step in
            aligning our digital presence with the vision of Project Ether,
            ensuring that every holder has a seamless and valuable experience as
            we continue to grow.
          </motion.h3>
          <motion.p
            initial={{ x: -200, opacity: 0 }}
            animate={
              isInView4
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.25,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
           <i>&quot;We've got a plan don't you worry!&quot; </i>
            <br />
            -Chitose, Website Developer
          </motion.p>
          <motion.div
            className="BWrapper ClickableOn"
            initial={{ x: -200, opacity: 0 }}
            animate={
              isInView4
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 1,
                      ease: [0, 0.25, 0.5, 1],
                    },
                  }
                : {}
            }
            exit={{
              x: -100,
              opacity: 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            <NavLink to="./Gallery" className="GalleryButton">
              Discover
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
      <div className="SecWrapper4">
        {/* <IdleAnimation h="30rem" z="0" s="22s" color="var(--SB)" /> */}

        <div className="SocialsWrapper">
          <motion.h2 className="">Socials</motion.h2>
          <motion.p className="">
            Follow Ether and the community on their building journey
          </motion.p>
        </div>
        <div className="HESocialsWrapper">
          <motion.div className="HESocialButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
            <p>Twitter</p>
          </motion.div>
          <motion.div className="HESocialButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
            <p>Instagram</p>
          </motion.div>
          <motion.div className="HESocialButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
            </svg>

            <p>Discord</p>
          </motion.div>
          <motion.div
            style={{ gridColumn: "span 3" }}
            className="HESocialButton"
          >
            <p>Ether</p>
            <div className="placeholderEtherHE" />
          </motion.div>
        </div>
        {/* <div className="HERoadmap">
          <h2>Check out what else is in the works</h2>
          <a href="./" className="RButton">
            Peek
          </a>
        </div> */}
      </div>
      <Faq></Faq>
    </div>
  );
}
