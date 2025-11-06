import "./EditProfile.css";
// import IdleAnimation from "./IdleAnimation.jsx";
import AuthenticationWait from "./AuthenticationWait.jsx";
import { BadgeItem } from "./Profile.jsx";
import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { AnimatePresence, m, motion } from "motion/react";
import React from "react";
import debounce from "lodash.debounce";

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

export default function EditProfile() {
  const [isUpdatingPP, setIsUpdatingPP] = useState(false);
  const [userdata, setUserdata] = useState({
    profiletoken: "",
    profiletitle: "",
    profiletitleid: "",
    profileheader: "",
    profileaccent: "",
    profilebio: "",
    walletaddress: "",
    twitter: "",
    instagram: "",
    website: "",
    story: { title: "", description: "", characters: [], dialogues: [] },
    equippedbadges: [],
    avatars: [],
    badges: [],
    headers: [],
    titles: [],
    accents: [],
  });
  const [select, setSelect] = useState("avatar");

  const login = useCallback(async (e) => {
    e.preventDefault();
    const path =
      "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/users/profile";
    const {
      profiletoken,
      profiletitleid,
      profileheader,
      profileaccent,
      profilebio,
      walletaddress,
      equippedbadges,
      twitter,
      instagram,
      website,
      story,
    } = userdata;
    const payload = {
      profiletoken,
      profiletitleid,
      profileheader,
      profileaccent,
      profilebio,
      walletaddress,
      equippedbadges,
      twitter,
      instagram,
      website,
      story,
    };

    setFetching(true);

    const response = await fetch(`${path}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify that you're sending JSON data
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const data = await response.json();
    
    if (response.ok) {
      setUpdated(true);
      setTimeout(() => {
        setUpdated(false);
      }, 2100);
    } else {
      setTimeout(() => {
        setFetching(false);
        console.log(data);
      }, 1000);
    }
  }, [userdata]);

  const updateUserData = useCallback(
    (key, value) => {
      if (isUpdatingPP && key === "profiletoken") return;
      if (key === "profiletoken") setIsUpdatingPP(true);
      if (key === "equippedbadges" && userdata?.equippedbadges?.length == 12) {
        return;
      }
      setUserdata((prev) => ({
        ...prev,
        [key]: typeof value === "function" ? value(prev[key]) : value,
      }));

      if (key === "profiletoken") {
        setTimeout(() => setIsUpdatingPP(false), 1100);
      }
    },
    [isUpdatingPP, userdata?.equippedbadges?.length]
  );

  const updateUserStory = useCallback((list, key, index, objkey, value) => {
    if (list === true) {
      setUserdata((prev) => {
        const updatedStory = {
          ...prev.story,
          [key]: prev.story[key].map((item, i) =>
            i === index
              ? { ...item, [objkey]: value } // update only the object we need
              : item
          ),
        };

        return { ...prev, story: updatedStory };
      });
    } else {
      setUserdata((prev) => {
        const updatedStory = {
          ...prev.story,
          [key]: value,
        };

        console.log("-----UPDATED STORY: ", updatedStory);

        return { ...prev, story: updatedStory };
      });
    }
  }, []);

  const replaceUserStory = useCallback((key, index, value) => {
    setUserdata((prev) => {
      const current = prev.story?.[key] || [];
      const updated = [...current];
  
      // If index exists → replace, else append at that position
      if (index < updated.length) {
        updated[index] = value;
      } else {
        updated[index] = value; // this automatically fills gaps with empty slots if index > length
      }
  
      return {
        ...prev,
        story: {
          ...prev.story,
          [key]: updated,
        },
      };
    });
  }, []);

  const deleteUserStoryItem = useCallback((key, index) => {
    setUserdata((prev) => {
      const current = prev.story?.[key] || [];
  
      // make a shallow copy
      const updated = [...current];
  
      // remove the element at the given index
      updated.splice(index, 1);
  
      return {
        ...prev,
        story: {
          ...prev.story,
          [key]: updated,
        },
      };
    });
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      const path =
        "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/users/profile/edit/cijo";

      try {
        const response = await fetch(path, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        console.log('THE GENESIS: ',data)
        if (!isCancelled) {
          if (data.data[0].story==null){
            let x = data.data[0];
            x.story = { title: "", description: "", characters: [], dialogues: [] }
            setUserdata(x);
          }else{
            setUserdata(data.data[0]);
          }
          console.log("PPP: ", data.data[0]);
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

  // useEffect(() => {
  //   console.log("userdata: ", userdata);
  // }, [userdata]);

  const [fetching, setFetching] = useState(false);
  const [updated, setUpdated] = useState(false);

  return (
    <div className="ProfileEdit">
      <AnimatePresence>
        {fetching && (
          <AuthenticationWait
            text1={`Updating ${userdata?.username}'s Profile`}
            text2="Profile Updated Successfully"
            setChecking={setFetching}
            registered={updated}
          />
        )}
      </AnimatePresence>
      <div className="PETopWrapper">
        {/* <ProfilePreview
          username={userdata?.username}
          profiletoken={userdata?.profiletoken}
          profiletitle={userdata?.profiletitle}
          walletaddress={userdata?.walletaddress}
          profilebio={userdata?.profilebio}
          twitter={userdata?.twitter}
          instagram={userdata?.instagram}
          website={userdata?.website}
          equippedbadges={userdata?.equippedbadges}
        /> */}

        <div className="PEControls">
          {/* <div className="PECDots" /> */}

          <ControllerUI setSelect={setSelect} select={select} login={login} />

          <AnimatePresence mode="wait">
            {select === "avatar" && (
              <ControllerAvatar
                key="avatar"
                ethers={userdata?.avatars}
                updateUserData={updateUserData}
              />
            )}
            {select === "bio" && (
              <ControllerBio
                key="bio"
                // userdata={userdata}
                initialProfilebio={userdata.profilebio}
                initialInstagram={userdata.instagram}
                initialTwitter={userdata.twitter}
                initialWebsite={userdata.website}
                titles={userdata.titles}
                updateUserData={updateUserData}
              />
            )}
            {select === "background" && (
              <ControllerBackground
                key="background"
                headers={userdata?.headers}
                updateUserData={updateUserData}
              />
            )}
            {select === "badge" && (
              <ControllerBadge
                key="badge"
                updateUserData={updateUserData}
                badges={userdata?.badges}
              />
            )}
            {select === "accent" && (
              <ControllerAccent
                key="accent"
                updateUserData={updateUserData}
                accents={userdata?.accents}
              />
            )}
            {select === "story" && (
              <ControllerStory
                key="story"
                updateUserStory={updateUserStory}
                story={userdata?.story}
                avatars={userdata?.avatars}
                replaceUserStory={replaceUserStory}
                deleteUserStoryItem={deleteUserStoryItem}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const ProfilePreview = React.memo(
  ({
    username,
    profiletoken,
    profiletitle,
    walletaddress,
    profilebio,
    twitter,
    instagram,
    website,
    equippedbadges,
  }) => {
    const BG = useRef(null);
    const BG2 = useRef(null);

    const throttledMoveCursor = useCallback(
      throttle((event) => {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        if (BG.current) {
          const bgX = (-clientX + innerWidth / 2) / 25;
          const bgY = (-clientY + innerHeight / 2) / 25;
          BG.current.style.transform = `translate(${bgX}px, ${bgY}px)`;
          BG2.current.style.transform = `translate(${bgX}px, ${bgY}px)`;
        }
      }, 64),
      []
    );

    useEffect(() => {
      window.addEventListener("mousemove", throttledMoveCursor);
      return () => window.removeEventListener("mousemove", throttledMoveCursor);
    }, [throttledMoveCursor]);
    return (
      <div
        className="PEPreview"
        // style={{ display: "none" }}
      >
        <div className="PEPGridBG" />
        <div className="PEPHeader">
          <img
            src="../src/assets/ASDAC.png"
            // src="../src/assets/uhfvggvuvu.png"

            alt=""
            loading="lazy"
            decoding="async"
            ref={BG}
          />
        </div>
        <AnimatePresence>
          {profiletoken == undefined ? null : (
            <motion.div
              animate={{ opacity: 1, x: 0, y: 0 }}
              initial={{ opacity: 0, x: -100, y: 10 }}
              exit={{
                opacity: 0,
                x: 100,
                y: 10,
                transition: { delay: 0, duration: 1 },
              }}
              transition={{ duration: 1.5 }}
              key={profiletoken}
              className="PEPPP"
            >
              <motion.img
                src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${profiletoken}`}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <img />
            </motion.div>
          )}
        </AnimatePresence>
        <img
          className="imgReflection"
          src="../src/assets/ASDAC.png"
          alt=""
          loading="lazy"
          decoding="async"
          ref={BG2}
        />
        <div className="PEPContent">
          <div className="PPPDots" />
          {/* <IdleAnimation z="-1" h="50%" s="4s" color="var(--SBB)" /> */}
          <div className="PEPInfo">
            <h3>{(username || "Loading").toUpperCase()}</h3>
            <AnimatePresence mode="wait">
              <motion.h4
                key={profiletitle || "Loading"}
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.15 }}
              >
                {profiletitle || "Loading"}
              </motion.h4>
            </AnimatePresence>
            <p>{walletaddress || "Loading"}</p>
          </div>
          <div className="PEPInfo2">
            <p style={profilebio ? {} : { color: "var(--SY)" }}>
              {profilebio ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="PEPInfo2bg"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              )}
              {profilebio ||
                "This bio is currently empty. \nHead to the 'Bio Selection' screen to add one."}
            </p>
          </div>
          <div className="PEPSWrapper">
            <div
              className={
                twitter?.length != 0 || twitter != null
                  ? "PEPSItem"
                  : "PEPSItem   PEPSItemdisabled"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 16 16"
                fill="var(--SG)"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
              <p
                style={
                  twitter == null
                    ? { color: "var(--SG", fontStyle: "italic", opacity: 0.5 }
                    : {}
                }
              >
                {twitter != null || twitter?.length != 0
                  ? "No Twitter account linked."
                  : "@" + twitter}
              </p>
            </div>
            <div
              className={
                instagram?.length != 0 || instagram != null
                  ? "PEPSItem"
                  : "PEPSItem PEPSItemdisabled"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 16 16"
                fill="var(--SG)"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
              </svg>
              <p
                style={
                  instagram == null
                    ? { color: "var(--SG", fontStyle: "italic", opacity: 0.5 }
                    : {}
                }
              >
                {instagram == null || instagram?.length == 0
                  ? "No Instagram account linked."
                  : "@" + instagram}
              </p>
            </div>

            <div
              className={
                website?.length == 0 || website == null
                  ? "PEPSItem"
                  : "PEPSItem PEPSItemdisabled"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 16 16"
                fill="var(--SG)"
              >
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
              </svg>
              <p
                style={
                  website == null
                    ? { color: "var(--SG", fontStyle: "italic", opacity: 0.5 }
                    : {}
                }
              >
                {website == null || website?.length == 0
                  ? "No Website linked."
                  : website}
              </p>
            </div>
            {/* <div className="PEPSItem"></div> */}
          </div>
          <p>Featured Badges</p>
          <div className="PEPGrid">
            {equippedbadges?.map((element, i) => (
              <BadgeItem
                key={i}
                c={"var(--SG)"}
                link={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/badge/${element.badgeid}`}
              />
            ))}
            {[...Array(12 - (equippedbadges?.length || 0))].map((_, i) => (
              <BadgeItem
                key={i}
                c={"var(--SY)"}
                link={null}
                name={`Empty Slot #${i + 1}`}
                description={"Insert a badge to display on your profile."}
              />
            ))}

            {/* <BadgeItem
                key={i}
                c={"var(--SG)"}
                
                link={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/badge/${ether.badgeid}`}
              /> */}
          </div>
          <div className="PEPGap"></div>
        </div>
      </div>
    );
  }
);
ProfilePreview.displayName = "ProfilePreview";

const ControllerUI = React.memo(({ select, setSelect, login }) => {
  return (
    <>
      <img
        className="PECBG"
        src="https://pbs.twimg.com/media/GmUin4ragAAx9uZ?format=jpg&name=medium"
        alt=""
      />
      <div className="PECHeaderI">
        <div>
          <h2>Selection Screen</h2>
          <AnimatePresence mode="wait">
            <motion.h3
              key={select.toUpperCase() || "Loading"}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -10 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
            >
              {select.toUpperCase()}
            </motion.h3>
          </AnimatePresence>
        </div>
        <div className="PEButtonWrapper">
          <div
            className={
              select === "avatar"
                ? "PEButton PEButton PEButtonActive"
                : "PEButton PEButton"
            }
            onClick={() => setSelect("avatar")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="var(--SG)"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
            </svg>
          </div>
          <div
            className={
              select === "bio" ? "PEButton PEButtonActive" : "PEButton"
            }
            onClick={() => setSelect("bio")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="var(--SG)"
              viewBox="0 0 16 16"
            >
              <path d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.17 4.17 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.5 3.5 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.17 4.17 0 0 1-2.06-.566A5 5 0 0 1 8 13.65a5 5 0 0 1-.44.285 4.17 4.17 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.5 3.5 0 0 0-.436-.294A3.17 3.17 0 0 0 5.5 2.5.5.5 0 0 1 5 2" />
              <path d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
            </svg>
          </div>
          <div
            className={
              select === "background" ? "PEButton PEButtonActive" : "PEButton"
            }
            onClick={() => setSelect("background")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="var(--SG)"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5z" />
            </svg>
          </div>
          <div
            className={
              select === "accent" ? "PEButton PEButtonActive" : "PEButton"
            }
            onClick={() => setSelect("accent")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="var(--SG)"
              viewBox="0 0 16 16"
            >
              <path d="M8 4.5a7 7 0 0 0-7 7 .5.5 0 0 1-1 0 8 8 0 1 1 16 0 .5.5 0 0 1-1 0 7 7 0 0 0-7-7m0 2a5 5 0 0 0-5 5 .5.5 0 0 1-1 0 6 6 0 1 1 12 0 .5.5 0 0 1-1 0 5 5 0 0 0-5-5m0 2a3 3 0 0 0-3 3 .5.5 0 0 1-1 0 4 4 0 1 1 8 0 .5.5 0 0 1-1 0 3 3 0 0 0-3-3m0 2a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 4 0 .5.5 0 0 1-1 0 1 1 0 0 0-1-1" />
            </svg>
          </div>
          <div
            className={
              select === "badge" ? "PEButton PEButtonActive" : "PEButton"
            }
            onClick={() => setSelect("badge")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="var(--SG)"
              viewBox="0 0 16 16"
            >
              <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
              <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
            </svg>
          </div>
          <div
            className={
              select === "story"
                ? "PEButton PEButton PEButtonActive"
                : "PEButton PEButton"
            }
            onClick={() => setSelect("story")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="var(--SG)"
              viewBox="0 0 16 16"
            >
              <path d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z" />
              <path d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086z" />
            </svg>
          </div>
        </div>
        <div className="PECDots" />
      </div>
      <div className="PEPSave" onClick={login}>
        <p>Save</p>
      </div>
    </>
  );
});
ControllerUI.displayName = "ControllerUI";

const ControllerAvatar = React.memo(({ ethers, updateUserData }) => {
  const backgroundMap = {
    Pink: "var(--SP)",
    Blue: "var(--SB)",
    Red: "var(--SR)",
    Yellow: "var(--SY)",
    Black: "var(--SG)",
    White: "var(--SG)",
  };

  return (
    <motion.div
      className="PECwrapper"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%", transition: { duration: 0.25 } }}
      transition={{ duration: 0.5 }}
    >
      <div className="PECGrid">
        {ethers?.length > 0 ? (
          ethers.map((ether, i) => (
            <div
              key={i}
              className="PECWItem"
              onClick={() => {
                updateUserData("profiletoken", ether.tokenid);
              }}
            >
              <div className="PECWItemwrapper">
                <img
                  src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${ether.tokenid}`}
                  alt="a"
                />
              </div>
              <div
                className="PECWIDescription"
                style={{
                  color: backgroundMap[ether.background],
                  border: `0.1rem solid ${backgroundMap[ether.background]}`,
                }}
              >
                {ether.tokenid}
              </div>
            </div>
          ))
        ) : (
          <p>No avatars available</p> // fallback if ethers is null or empty
        )}
      </div>
    </motion.div>
  );
});
ControllerAvatar.displayName = "ControllerAvatar";

const ControllerBio = React.memo(
  ({
    initialProfilebio,
    initialTwitter,
    initialInstagram,
    initialWebsite,
    titles,
    updateUserData,
  }) => {
    const [profilebio, setProfilebio] = useState(initialProfilebio);
    const [twitter, setTwitter] = useState(initialTwitter);
    const [instagram, setInstagram] = useState(initialInstagram);
    const [website, setWebsite] = useState(initialWebsite);
    // console.log("HSBDBASDBSABDHS: ", profilebio, twitter, instagram, website);

    const inputs = useMemo(
      () => [
        {
          type: 0,
          fieldName: "Profile Biography",
          fieldValue: profilebio,
          updatedColumn: "profilebio",
        },
        {
          type: 1,
          fieldName: "Twitter/X Link",
          fieldValue: twitter,
          updatedColumn: "twitter",
        },
        {
          fieldName: "Instagram Link",
          fieldValue: instagram,
          updatedColumn: "instagram",
        },
        {
          fieldName: "Website Link",
          fieldValue: website,
          updatedColumn: "website",
        },
      ],
      [instagram, profilebio, twitter, website]
    );

    return (
      <motion.div
        className="PECwrapper"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%", transition: { duration: 0.25 } }}
        transition={{ duration: 0.5 }}
        // transition={{ damping: 50, stiffness: 100 }}
      >
        <div className="PECBio">
          <div className="SectionWrapper">
            <div className="SectionHeader">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                style={{ paddingRight: "1rem" }}
                viewBox="0 0 16 16"
              >
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
              </svg>
              <h2>Profile Information</h2>
            </div>

            {inputs.map((el, i) => {
              return el.type == 0 ? (
                <PECInputTextArea
                  key={el.fieldName}
                  fieldName={el.fieldName}
                  fieldValue={el.fieldValue}
                  updatedColumn={el.updatedColumn}
                  updateUserData={updateUserData}
                />
              ) : (
                <PECInput
                  key={el.fieldName}
                  fieldName={el.fieldName}
                  fieldValue={el.fieldValue}
                  updatedColumn={el.updatedColumn}
                  updateUserData={updateUserData}
                />
              );
            })}
          </div>
          <div className="SectionWrapper">
            <PECInputTitle titles={titles} updateUserData={updateUserData} />
          </div>
        </div>
      </motion.div>
    );
  }
);
ControllerBio.displayName = "ControllerBio";

const PECInputTextArea = React.memo(
  ({ fieldValue, fieldName, updatedColumn, updateUserData }) => {
    // create a debounced version of updateUserData
    const debouncedUpdate = useMemo(
      () => debounce((col, val) => updateUserData(col, val), 500),
      [updateUserData]
    );

    return (
      <div className="PECBioItem">
        <label htmlFor={fieldName}>{fieldName}</label>
        <textarea
          id={fieldName}
          name={fieldName}
          onChange={(e) => {
            debouncedUpdate(updatedColumn, e.target.value);
            // updateUserData(updatedColumn, e.target.value);
          }}
          defaultValue={fieldValue}
        ></textarea>
      </div>
    );
  }
);
PECInputTextArea.displayName = "PECInputTextArea";

const PECInput = React.memo(
  ({ fieldValue, fieldName, updatedColumn, updateUserData }) => {
    // create a debounced version of updateUserData
    const debouncedUpdate = useMemo(
      () => debounce((col, val) => updateUserData(col, val), 50),
      [updateUserData]
    );

    return (
      <div className="PECBioItem">
        <label htmlFor={fieldName}>{fieldName}</label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          defaultValue={fieldValue}
          onChange={(e) => {
            debouncedUpdate(updatedColumn, e.target.value);
          }}
        />
      </div>
    );
  }
);
PECInput.displayName = "PECInput";

const PECInputTitle = React.memo(({ titles, updateUserData }) => {
  return (
    <div className="PECBioItem">
      <label htmlFor="Title">Title Selection</label>
      <div className="TitleGrid">
        {/* {console.log(titles)} */}
        {titles.length > 0 ? (
          titles.map((element, i) => {
            return (
              <div
                key={i}
                className="TitleItem"
                onClick={() => {
                  updateUserData("profiletitle", element.titlename);
                  updateUserData("profiletitleid", element.titleid);
                }}
              >
                {element.titlename}
                <div className="TitleDescription">
                  {element.titledescription}
                </div>
              </div>
            );
          })
        ) : (
          <p>No titles available</p>
        )}
      </div>
    </div>
  );
});
PECInputTitle.displayName = "PECInputTitlw";

const ControllerBackground = React.memo(({ headers, updateUserData }) => {
  return (
    <motion.div
      className="PECwrapper"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%", transition: { duration: 0.25 } }}
      transition={{ duration: 0.5 }}
    >
      <div className="PECGridBG">
        {headers?.length ? (
          headers.map((element, i) => (
            <div
              key={element.headerid}
              className="PECGBGItem"
              onClick={() => {
                updateUserData("profileheader", element.headerid);
              }}
            >
              <div className="PECGBGItemBG">
                <img
                  src="https://pbs.twimg.com/media/G0yoCZBbcAMDf29?format=jpg&name=large"
                  alt=""
                />
              </div>
              <div className="PECGBGItemLayer">
                <div />
              </div>
              <h3>{element.headername}</h3>
              <p>
                <i style={{ color: "var(--SG)" }}>Common Card</i>
                <br />
                {element.headerdescription}
              </p>
            </div>
          ))
        ) : (
          <p>No backgrounds available</p>
        )}
      </div>
    </motion.div>
  );
});
ControllerBackground.displayName = "ControllerBackground";

const ControllerBadge = React.memo(({ badges, updateUserData }) => {
  return (
    <motion.div
      className="PECwrapper"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%", transition: { duration: 0.25 } }}
      transition={{ duration: 0.5 }}
    >
      <div className="PECGrid">
        {badges?.length > 0 ? (
          badges.map((ether, i) => (
            <div
              key={i}
              onClick={() => {
                updateUserData("equippedbadges", (prev) => [
                  ...(prev || []),
                  badges[i],
                ]);
              }}
            >
              <BadgeItem
                c={"var(--SG)"}
                name={ether.badgename}
                description={ether.badgedescription}
                link={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/badge/${ether.badgeid}`}
              />
            </div>
          ))
        ) : (
          <p>No avatars available</p> // fallback if ethers is null or empty
        )}
      </div>
    </motion.div>
  );
});

ControllerBadge.displayName = "ControllerBadge";

const ControllerAccent = React.memo(({ accents, updateUserData }) => {
  return (
    <motion.div
      className="PECwrapper"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%", transition: { duration: 0.25 } }}
      transition={{ duration: 0.5 }}
    >
      <div className="PECGridBG">
        {accents?.length ? (
          accents.map((element, i) => (
            <div
              key={element.accentid}
              className="PECGBGItem"
              onClick={() => {
                updateUserData("profileheader", element.accentid);
              }}
            >
              <div className="PECGBGItemBG">
                <img
                  src="https://pbs.twimg.com/media/G0yoCZBbcAMDf29?format=jpg&name=large"
                  alt=""
                />
              </div>
              <div className="PECGBGItemLayer">
                <div />
              </div>
              <h3>{element.accentname}</h3>
              <p>
                <i style={{ color: "var(--SG)" }}>Common Card</i>
                <br />
                {element.accentdescription}
              </p>
            </div>
          ))
        ) : (
          <p>No backgrounds available</p>
        )}
      </div>
    </motion.div>
  );
});

ControllerAccent.displayName = "ControllerAccent";

const ControllerStory = React.memo(({ avatars, story, updateUserStory, replaceUserStory , deleteUserStoryItem}) => {
  const [openList, setOpenList] = useState(false);
  const [latestID, setLatestID] = useState(story.dialogues[story.dialogues?.length-1]?.dialogueid || 1);
  const [indexSelection, setIndexSelection] = useState(0);

  useEffect(()=>{
    console.log(story);
  },[story])

  function updateStorytitle(title) {
    updateUserStory(false, "title", "", "", title);
  }

  function updateStoryDescription(description) {
    updateUserStory(false, "description", "", "", description);
  }

  function modifySelection(index, tokenid) {
    // setSelectedAvatars((prev) => {
    //   const copy = [...prev];
    //   copy[index] =
    //     tokenid == null ? null : { tokenid: tokenid, name: "", title: "" };
    //   console.log("updated:", copy);
    //   return copy;
    // });
    replaceUserStory("characters", story.characters.length, {
      name: "",
      title: "",
      storyid: 1,
      tokenid: tokenid,
      characterid: 1,
    });

    updateUserStory(true, "characters", index, "dialogue", tokenid);
    setOpenList(false);
  }

  function removeSelection(tokenid) {
    deleteUserStoryItem("characters", tokenid)
  }

  function modifySelectionName(index, name) {
    updateUserStory(true, "characters", index, "name", name);
  }

  function modifySelectionTitle(index, title) {
    updateUserStory(true, "characters", index, "title", title);
  }

  function updateLeft(key, val) {
    updateUserStory(true, "dialogues", key, "left", !val);
  }



  function nextCharacter(key) {
    const x= story?.dialogues[key]?.character
    if (x+1 >= story.characters.length){
      updateUserStory(true, "dialogues", key, "character", 0);
    } else {
      updateUserStory(true, "dialogues", key, "character", x+1);
    }
  }

  function prevCharacter(key) {
    const x= story?.dialogues[key]?.character 
    if (x==0){
      updateUserStory(true, "dialogues", key, "character", story.characters.length-1);
    } else {
      updateUserStory(true, "dialogues", key, "character", x-1);
    }
  }

  function addNewDialogue() {
    const newID = latestID + 1;
    setLatestID(newID);
  
    replaceUserStory("dialogues", story?.dialogues?.length, {
      left: true,
      storyid: 1,
      dialogue: "hey",
      character: 0,
      dialogueid: newID,
    });
  }

  function deleteDialogues(key) {
    deleteUserStoryItem("dialogues", key)
  }

  function updateDialogues(idx, val) {
    if (typeof val !== "string") return;
    updateUserStory(true, "dialogues", idx, "dialogue", val);
  }

  return (
    <motion.div
      className="PECwrapper"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%", transition: { duration: 0.25 } }}
      transition={{ duration: 0.5 }}
      // transition={{ damping: 50, stiffness: 100 }}
    >
      <AnimatePresence>
        {openList == true ? (
          <AvatarList
            avatars={avatars}
            setAvatar={modifySelection}
            index={indexSelection}
          />
        ) : null}
      </AnimatePresence>
      <div className="PECBio">

        <StoryHeaders 
        title={story.title}
        description={story.description}
        updateStorytitle={updateStorytitle}
        modifyStoryDescription={updateStoryDescription}
        />

        <CSGrid characters={story.characters} setOpenList={setOpenList} setIndexSelection={setIndexSelection} removeSelection={removeSelection} modifySelectionName={modifySelectionName} modifySelectionTitle={modifySelectionTitle}/>

        <motion.div layout className="SectionWrapper">
          <div className="SectionHeader">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              style={{ paddingRight: "1rem" }}
            >
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
              <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
            </svg>
            <h2>Dialogue Script</h2>
          </div>
          <AnimatePresence>
            {story?.dialogues?.map((element, i) => {
              return (
                <motion.div
                  className="PECBioItem PECBioItemDialogue "
                  key={element.dialogueid}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <label htmlFor="bio">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                      </svg>
                      Dialogue #{i + 1}
                    </div>
                    <p
                      style={
                        story?.dialogues[i]?.dialogue.length == 256
                          ? { color: "var(--SY)" }
                          : {}
                      }
                    >
                      {story?.dialogues[i]?.dialogue.length == 256 ? (
                        <>
                          <br />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                          </svg>
                          Max character limit has been reached!{" "}
                        </>
                      ) : null}
                      {story?.dialogues[i]?.dialogue.length}/256
                    </p>
                  </label>
                  <motion.div
                    layout
                    className="DialogueInputWrapper"
                    style={{
                      display: "flex",
                      flexDirection:
                        story?.dialogues[i]?.left == true ? "row" : "row-reverse",
                    }}
                  >
                    <motion.div className="PECBioItemImg" layout>
                      <AnimatePresence>
                        <motion.img
                          style={{
                            transform: story?.dialogues[i]?.left
                              ? "scaleX(1)"
                              : "scaleX(-1)",
                          }}
                          initial={{ x: "100%" }}
                          animate={{ x: 0 }}
                          exit={{ x: "-100%" }}
                          key={
                            story?.characters[story?.dialogues[i]?.character]?.tokenid
                          }
                          src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${
                            story?.characters[story?.dialogues[i]?.character]?.tokenid
                          }`}
                          alt=""
                        />
                      </AnimatePresence>
                      <div className="PECBioItemImgControls">
                        <div
                          className="PECBioItemImgControlsItem"
                          onClick={() => prevCharacter(i)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                          </svg>
                        </div>
                        <div
                          className="PECBioItemImgControlsItem"
                          onClick={() => deleteDialogues(i)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                          </svg>
                        </div>
                        <div
                          className="PECBioItemImgControlsItem"
                          onClick={() => nextCharacter(i)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div className="DialogueInput" layout>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                          flexDirection:
                            story?.dialogues[i]?.left == true
                              ? "row"
                              : "row-reverse",
                          textAlign:
                            story?.dialogues[i]?.left == true ? "start" : "right",
                        }}
                      >
                        <div>
                          <p
                            className="DialogueInputName"
                            style={{
                              display: "flex",
                              flexDirection: "row",

                              justifyContent:
                                story?.dialogues[i]?.left == true
                                  ? "start"
                                  : "end",
                            }}
                          >
                            {story.characters.filter(
                              (v) => v !== null && v !== undefined
                            )[story?.dialogues[i]?.character]?.name != ""
                              ? story?.characters.filter(
                                  (v) => v !== null && v !== undefined
                                )[story?.dialogues[i]?.character]?.name
                              : "Nameless"}
                          </p>
                          <p>
                            {story.characters.filter(
                              (v) => v !== null && v !== undefined
                            )[story?.dialogues[i]?.character]?.title != ""
                              ? story.characters.filter(
                                  (v) => v !== null && v !== undefined
                                )[story?.dialogues[i]?.character]?.title
                              : "Titleless Ether"}
                          </p>
                        </div>
                        <div className="DialogueInputTrigger">
                          <div
                            className="DialogueInputTriggerDot"
                            onClick={() =>
                              updateLeft(i, element.left)
                            }
                            style={
                              story?.dialogues[i]?.left == true
                                ? { transform: "rotate(180deg)" }
                                : {}
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5" />
                              <path d="M13 7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1z" />
                            </svg>
                          </div>
                          {/* <p>Left Aligned</p> */}
                        </div>
                      </div>
                      <textarea
                        id="bio"
                        name="bio"
                        onChange={(e) => updateDialogues(i, e.target.value)}
                        value={story.dialogues[i].dialogue}
                        placeholder="Insert dialogue here."
                        maxLength={256}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div className="DialogueAdderWrapper">
            <div className="DialogueAdder" onClick={() => addNewDialogue()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
              </svg>
            </div>

            <p style={{ paddingLeft: "1rem" }}>
              {" "}
              Dialogues: {story?.dialogues?.length}/50
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="var(--SY)"
              viewBox="0 0 16 16"
              style={{ paddingLeft: "1rem" }}
            >
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>{" "}
            <p style={{ color: "var(--SY", textAlign: "center" }}>
              Dialogue Limit Has Been Reached
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});
ControllerStory.displayName = "ControllerStory";

const AvatarList = React.memo(({ avatars, setAvatar, index }) => {
  return (
    <motion.div
      className="ALWrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="ALGrid">
        {avatars?.map((element, i) => {
          return (
            <div
              key={element.tokenid}
              className="ALItem"
              onClick={() => setAvatar(index, element.tokenid)}
            >
              <img
                src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${element.tokenid}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});
AvatarList.displayName = "AvatarList";

const StoryHeaders = React.memo(({title,description,updateStorytitle,modifyStoryDescription}) => {
  return(
  <div className="SectionWrapper">
    <div className="SectionHeader">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        style={{ paddingRight: "1rem" }}
        viewBox="0 0 16 16"
      >
        <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5M2 2h12s2 0 2 2v6s0 2-2 2H2s-2 0-2-2V4s0-2 2-2" />
      </svg>
      <h2>Story Information</h2>
    </div>
    <div className="PECBioItem">
      <label htmlFor="title">Story Title</label>
      <input
        type="text"
        id="title"
        name="title"
        onChange={(e) => updateStorytitle(e.target.value)}
        // value={title}
        defaultValue={title}
        placeholder="Insert story title."
        maxLength={32}
      />
      <p style={title.length == 32 ? { color: "var(--SY)" } : {}}>
        {title.length == 32 ? (
          <>
            <br />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            Max character limit has been reached!{" "}
          </>
        ) : null}
        Character count: {title.length}/32
      </p>
    </div>

    <div className="PECBioItem">
      <label htmlFor="description">Story Description</label>
      <textarea
        id="description"
        name="description"
        onChange={(e) => modifyStoryDescription(e.target.value)}
        maxLength={128}
        // value={description}
        defaultValue={description}
        placeholder="Insert a short description about your story."
      />
      <p style={description.length == 128 ? { color: "var(--SY)" } : {}}>
        {description.length == 128 ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            Max character limit has been reached!{" "}
          </>
        ) : null}
        Character count: {description.length}/128
      </p>
    </div>
  </div>);
});
StoryHeaders.displayName = "StoryHeaders";


const CSGrid = React.memo(({characters, setOpenList, setIndexSelection, removeSelection, modifySelectionName, modifySelectionTitle})=>{
  return(
    <div className="SectionWrapper">
    <div className="CharacterSelection">
      <div className="SectionHeader">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          style={{ paddingRight: "1rem" }}
          viewBox="0 0 16 16"
        >
          <path d="M10 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
          <path d="M2 1a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM1 3a1 1 0 0 1 1-1h2v2H1zm4 10V2h9a1 1 0 0 1 1 1v9c0 .285-.12.543-.31.725C14.15 11.494 12.822 10 10 10c-3.037 0-4.345 1.73-4.798 3zm-4-2h3v2H2a1 1 0 0 1-1-1zm3-1H1V8h3zm0-3H1V5h3z" />
        </svg>
        <h2>Character Selection</h2>
        <p>
          (
          {
            characters.filter((v) => v !== null && v !== undefined)
              .length
          }
          /8 Slots filled)
        </p>
      </div>
      <div className="CSGrid">
        {characters.map((element, i) => (
          <CSGridItem
            key={i}
            element={element}
            setOpenList={setOpenList}
            setIndexSelection={setIndexSelection}
            i={i}
            removeSelection={removeSelection}
            modifySelectionName={modifySelectionName}
            modifySelectionTitle={modifySelectionTitle}
          />
        ))}

        {    characters.length <8 ?
        <div
          className="CSGItem"
          onClick={() => {
            setOpenList((prev) => !prev);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
          </svg>
        </div>
      :null}
      </div>
    </div>
  </div>
  );
})
CSGrid.displayName='CSGrid'

const CSGridItem = React.memo(
  ({
    element,
    i,
    removeSelection,
    modifySelectionName,
    modifySelectionTitle,
  }) => {
    return (
      <div className="CSGItemFilled" key={i}>
        <div className="CharacterForm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={() => removeSelection(i)}
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
          </svg>
          <label>Name</label>
          <input
            type="text"
            placeholder="Insert Name"
            onChange={(e) => modifySelectionName(i, e.target.value)}
            maxLength={16}
            value={element.name}
            // value={selectedAvatars[i].name}
          ></input>
          <label>Title</label>
          <input
            type="text"
            placeholder="Insert title"
            onChange={(e) => modifySelectionTitle(i, e.target.value)}
            maxLength={24}
            value={element.title}
            // value={selectedAvatars[i].title}
          ></input>
        </div>
        <img
          src={`https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/${element.tokenid}`}
          alt=""
        />
      </div>
    );
  }
);

CSGridItem.displayName = "CSGridItem";
