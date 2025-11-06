import "./Login.css";
import IdleAnimation from "./IdleAnimation.jsx";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthenticationWait from "./AuthenticationWait.jsx";

export default function Login({ sendNotif, setUser, delayNav }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [fetching, setFetching] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const path =
    "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/users/login";

  const login = async (e) => {
    e.preventDefault();
    setFetching(true);

    if (credentials.username == "") {
      sendNotif("Username cannot be empty");
      setFetching(false);
      return;
    }
    if (credentials.password == "") {
      sendNotif("Password cannot be empty");
      setFetching(false);
      return;
    }

    console.log("LOGIN");

    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify that you're sending JSON data
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    const data = await response.json();
    console.log(0, data);
    sendNotif(data.message);
    if (response.ok) {
      setLoggedIn(true);
      setTimeout(() => {
        delayNav(`/Profile/${data.userId}`);     
      }, 1000);      
      setTimeout(() => {
        setUser(data.userId);
      }, 2000);
    }else {
      setTimeout(() => {
        setFetching(false);
        sendNotif(data.message);
      }, 1000);
    }

    // setFetching(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(credentials);
  };

  return (
    <div className="LoginWrapper">
      <AnimatePresence>
        {fetching && <AuthenticationWait text1="Checking Credentials" text2="Succesfully Logged In" setChecking={setFetching} registered={loggedIn}/>}
      </AnimatePresence>
      <img className='LoginHeroImage' src="./src/assets/AUTH_HERO.webp" alt="" />
      <img className='LoginHeroImageBG' src="./src/assets/AUTH_HERO.webp" alt="" />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.25,
          duration: 1,
          ease: [0, 0.25, 0.5, 1],
        }}
        className="LWZ"
      >
        <form action="" method="post" className="LoginForm">
          <div className="LoginHeader">
            <h2>Login</h2>
            <p>
              Login to your account and unlock all features available. You can
              create an account by clicking the link below. Accounts made before
              June, 1st 2025 will get special digital collectibles.
            </p>
          </div>
          <label htmlFor="Username" className="FLabel">
            <p>Username</p>
            <div className="FInputWrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
              </svg>
              <input
                onChange={handleChange}
                type="text"
                name="username"
                id="Username"
                placeholder="Insert your username"
              />
            </div>
          </label>
          <label htmlFor="" className="FLabel">
            <p>Password</p>
            <div className="FInputWrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
              </svg>
              <input
                onChange={handleChange}
                type="text"
                name="password"
                id="Password"
                placeholder="Insert your password"
              />
            </div>
          </label>
          <NavLink to="/Register" type="button" className="AskLabel">
            Don't have an account?
          </NavLink>
          <br />
          <input
            type="submit"
            value="Sign In"
            className="SignInLabel"
            onClick={login}
          />
        </form>
      </motion.div>
      <IdleAnimation s="2.5s" color="var(--SB)" />
    </div>
  );
}
