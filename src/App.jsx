import React, { useState, useCallback, useRef, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

import "./App.css";

import Home from "./ETHERED/Home.jsx";
// import HomeExtend from "./HomeExtend.jsx";
import Gallery from "./Ether Menu/Gallery.jsx";
import Dungeon from "./Ether Menu/Dungeon.jsx";
import Roadmap from "./The Vision Menu/Roadmap.jsx";
import Profile from "./Ether Menu/Profile.jsx";
import About from "./The Vision Menu/About.jsx";
import EditProfile from "./User/EditProfile.jsx";

import Register from "./User/Register.jsx";
import Login from "./User/Login.jsx";

import Header from "./ETHERED/Header.jsx";
import Footer from "./ETHERED/Footer.jsx";
import Cursor from "./Components/Cursor.jsx";
import NotFound from "./ETHERED/NotFound.jsx";
import NotificationWrapper from "./Components/Notification.jsx";
import UserSettings from "./User/UserSettings.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const PageTransition = React.memo(({ navigated }) => {
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src =
      "https://media.discordapp.net/attachments/755948917186625600/1386000301894533290/Gk3h951XIAAWxp1.jpg?ex=68581cde&is=6856cb5e&hm=eb90c5f012e13106ecd7d1c1c2ba61d6f47fdfbec4662afbd12df4d237d99352&=&format=webp&width=710&height=866";
  }, []);

  useEffect(() => {
    setTrigger(true);
    setTimeout(() => {
      setTrigger(false);
    }, 1050);
  }, [navigated]);

  return (
    <AnimatePresence>
      {trigger == true ? (
        <>
          <motion.div
            className="PageTransitionUpper PageTransitionPart"
            initial={{ y: "-100%" }}
            animate={{ y: 0, transition: { duration: 0.5, delay: 0.05 } }}
            exit={{ y: "-100%", transition: { duration: 2 } }}
            // transition={{ duration: 1 }}
          >
            <img
              src="https://media.discordapp.net/attachments/755948917186625600/1386000301894533290/Gk3h951XIAAWxp1.jpg?ex=68581cde&is=6856cb5e&hm=eb90c5f012e13106ecd7d1c1c2ba61d6f47fdfbec4662afbd12df4d237d99352&=&format=webp&width=710&height=866"
              className="PageTransitionEther"
            />
          </motion.div>
          <motion.div
            className="PageTransitionBottom PageTransitionPart"
            initial={{ y: "100%" }}
            animate={{ y: 0, transition: { duration: 0.5, delay: 0.05 } }}
            exit={{ y: "100%", transition: { duration: 2 } }}
            transition={{ duration: 0.5 }}
          >
            {/* <img
              src="src/assets/EtherPlaceholder.png"
              className="PageTransitionEther"
            /> */}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
});

PageTransition.displayName = "PageTransition";

function App() {
  const notifsRef = useRef();
  const navigate = useNavigate();
  const CRef = useRef(0);
  const [user, setUser] = useState(null);
  const [navigated, setNavigated] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/users/check",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log("Check auth:", data);
        console.log("Check auth:", data.ok);

        if (response.ok) {
          console.log("✅ User is authenticated");
          setUser(data.user.userId); // optional
          console.log(user);
        } else {
          console.log("❌ User is not authenticated");
          // setAuthenticated(false); // optional
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    const signout = async () => {
      try {
        const response = await fetch(
          "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/users/logout",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log("Check auth:", data);
        console.log("Check auth:", data.ok);

        if (response.ok) {
          console.log("✅ Logged out");
          setUser(null); // optional
          console.log(user);
        } else {
          console.log("❌ not logged out");
          // setAuthenticated(false); // optional
        }
      } catch (error) {
        console.error("Logout check failed:", error);
      }
    };

    signout();
  };

  const sendNotification = (message, writter, title) => {
    if (notifsRef.current) {
      notifsRef.current.addNotification(message, writter, title); // Call method in ChildB
    }
  };

  const delayNav = (link) => {
    if (pathname == link) {
      navigate(link);
    } else {
      setNavigated(true);

      setTimeout(() => {
        navigate(link);
        setNavigated(false);
      }, 1000);
    }
  };

  return (
    <div className="AppWrapper">
      <NotificationWrapper ref={notifsRef} />
      <ScrollToTop />
      <PageTransition navigated={navigated} />
      <Cursor ref={CRef} />
      <Header delayNav={delayNav} user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home delayNav={delayNav} />} />
        <Route path="/Dungeon" element={<Dungeon delayNav={delayNav} />} />
        <Route
          path="/gallery"
          element={<Gallery delayNav={delayNav} sendNotif={sendNotification} />}
        />
        <Route path="/Roadmap" element={<Roadmap delayNav={delayNav} />} />
        <Route path="/profile" element={<Profile delayNav={delayNav} />} />
        {/* <Route path="/M" element={<Masonry delayNav={delayNav} />} /> */}
        <Route
          path="/profile/:slug"
          element={<Profile delayNav={delayNav} />}
        />
        <Route
          path="/profile/wallet/:slug"
          element={<Profile delayNav={delayNav} />}
        />
        <Route path="/about" element={<About delayNav={delayNav} />} />
        {!user ? (
          <>
            <Route
              path="/register"
              element={
                <Register
                  delayNav={delayNav}
                  sendNotif={sendNotification}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  delayNav={delayNav}
                  sendNotif={sendNotification}
                  setUser={setUser}
                />
              }
            />
          </>
        ) : (
          <>
            <Route
              path={`/profile/edit/${user}`}
              element={
                <EditProfile
                  delayNav={delayNav}
                  sendNotif={sendNotification}
                  user={user}
                />
              }
            />
            <Route
              path="/settings"
              element={<UserSettings sendNotif={sendNotification} />}
            />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
