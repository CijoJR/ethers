import "./Register.css";
import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router-dom";
import IdleAnimation from "../Components/IdleAnimation.jsx";
import AuthenticationWait from "../Components/AuthenticationWait.jsx";
import { useEffect, useState } from "react";
import { animate } from "motion";

export default function Register({ sendNotif, setUser, delayNav }) {
  const [checking, setChecking] = useState(false);
  const [registered, setRegistered] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    wallet: ""
  });

  const path =
    "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/users/register";

  const register = async (e) => {
    e.preventDefault();

    if (credentials.username.trim() === "") {
      sendNotif("Username cannot be empty");
      return;
    }
    if (
      credentials.email.trim() != "" &&
      !credentials.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      sendNotif("Email must be in the correct format");
      return;
    }
    if (credentials.password.trim() === "") {
      sendNotif("Password cannot be empty");
      return;
    }
    if (credentials.password != credentials.password2) {
      sendNotif("Passwords do not match");
      return;
    }

    setChecking(true);
    console.log("Register");

    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify that you're sending JSON data
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      setRegistered(true);
      setTimeout(() => {
        delayNav("/Profile");
      }, 1000);
      setTimeout(() => {
        setUser(data.userId);
      }, 2000);
    } else {
      setTimeout(() => {
        setChecking(false);
        sendNotif(data.message);
      }, 1000);
    }

    console.log(0, data);
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
        {checking ? (
          <AuthenticationWait
            registered={registered}
            setChecking={setChecking}
          />
        ) : null}
      </AnimatePresence>

      <img
        className="LoginHeroImage"
        src="./src/assets/AUTH_HERO.webp"
        alt=""
      />
      <img
        className="LoginHeroImageBG"
        src="./src/assets/AUTH_HERO.webp"
        alt=""
      />

      <motion.div
        className="LWZ"
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
      >
        <form action="" method="post" className="RegistrationForm">
          <div className="RegistrationHeader">
            <h2>Register</h2>
            <p>
              Become a member of our community by signing up below. Get a random
              free collectible card and badge when you sign up before June, 1st
              2025.
            </p>
          </div>
          <label htmlFor="Username" className="FLabel UsernameLabel">
            <p>Username</p>
            <div className="FInputWrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
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
          <label htmlFor="Email" className="FLabel EmailLabel">
            <p>Email (optional)</p>
            <div className="FInputWrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
              </svg>
              <input
                onChange={handleChange}
                type="text"
                name="email"
                id="Email"
                placeholder="Insert your email address"
              />
            </div>
          </label>
          <label htmlFor="wallet" className="FLabel">
            <p>Wallet Address (optional)*</p>
            <div className="FInputWrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542s.987-.254 1.194-.542C9.42 6.644 9.5 6.253 9.5 6a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2z" />
                <path d="M16 6.5h-5.551a2.7 2.7 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5s-1.613-.412-2.006-.958A2.7 2.7 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5z" />
              </svg>
              <input
                onChange={handleChange}
                type="text"
                name="wallet"
                id="wallet"
                placeholder="Insert your wallet address"
              />
            </div>
          </label>
          <label htmlFor="Password" className="FLabel">
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
                type="password"
                name="password"
                id="Password"
                placeholder="Insert your password"
              />
            </div>
          </label>
          <label htmlFor="Password2" className="FLabel">
            <p>Re-type Password</p>
            <div className="FInputWrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
              </svg>
              <input
                onChange={handleChange}
                type="password"
                name="password2"
                id="Password2"
                placeholder="Please retype password"
              />
            </div>
          </label>
          <NavLink to="/Login" type="button" className="AskLabel">
            Already have an account?
          </NavLink>
          <br />
          <input
            type="submit"
            value="Sign Up"
            className="SignUpLabel"
            onClick={register}
          />
          <p className="registerAsterisk">*No authentication required for now. Authentication will be available after getting approval from project ETHER. Have fun and treat it like a sandbox.</p>
        </form>
      </motion.div>
      <IdleAnimation s="2.5s" color="var(--SY)" />
    </div>
  );
}
