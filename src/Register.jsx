import "./Register.css";
import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router-dom";
import IdleAnimation from "./IdleAnimation.jsx";
import AuthenticationWait from "./AuthenticationWait.jsx";
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
        delayNav('/Profile');     
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
                <path d="M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.313l4.222 2.475q.035-.087.08-.17c.665-1.3 2.362-1.917 3.698-1.25 1.336-.667 3.033-.05 3.699 1.25a3 3 0 0 1 .08.17L16 5.713V5.4a2 2 0 0 0-1.059-1.765zM0 6.873l4 2.344c-.012.542.124 1.117.416 1.694l.004.006L0 13.372v-6.5Zm.059 7.611 4.9-2.723c.563.73 1.383 1.467 2.49 2.198l.551.365.551-.365c1.107-.73 1.927-1.467 2.49-2.198l4.9 2.723A2 2 0 0 1 14 16H2a2 2 0 0 1-1.941-1.516M16 13.372l-4.42-2.455.004-.006c.292-.577.428-1.152.415-1.694L16 6.873v6.5Z" />
                <path d="M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
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
          <label htmlFor="" className="FLabel">
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
                type="text"
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
        </form>
      </motion.div>
      <IdleAnimation s="2.5s" color="var(--SBB)" />
    </div>
  );
}
