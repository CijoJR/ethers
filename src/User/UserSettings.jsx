import "./UserSettings.css";
import IdleAnimation from "../Components/IdleAnimation.jsx";
import { useState, useEffect, useCallback } from "react";
import AuthenticationWait from "../Components/AuthenticationWait.jsx";
import { AnimatePresence } from "motion/react";
import PopUpMenu from "../Components/PopUp.jsx";

function UserSettings({ sendNotif }) {
  const [settings, setSettings] = useState({
    wallet: "",
    password: "",
    repassword: "",
  });
  //message, writter, title
  const [asking, setAsking] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [updated, setUpdated] = useState(false);

  const updateWallet = useCallback(
    async (e) => {
      e.preventDefault();
      const path =
        "https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/users/profile/updateWallet";
      const { wallet } = settings;
      const payload = {
        wallet
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
    },
    [settings]
  );

  const handleChange = (name, value) => {
    // const {name, value} = e.target;
    console.log(name, value);
    setSettings((prevSettings) => {
      return {
        ...prevSettings,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    console.log(settings);
  }, [settings]);
  return (
    <div className="UserSettings">
      <AnimatePresence>
        {asking && settings.wallet && (
          <PopUpMenu
            title="Wallet Address Update"
            message={`By clicking 'Change', your account will now use the wallet address '${settings.wallet}'.`}
            warning="Current profile settings and story will be reset and adjusted."
            button1Name="Yes"
            button2Name="No"
            button1Func={() => setAsking(false)}
            button2Func={() => setAsking(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {fetching && (
          <AuthenticationWait
            text1={`Updating wallet address`}
            text2="Wallet Updated Successfully"
            setChecking={setFetching}
            registered={updated}
          />
        )}
      </AnimatePresence>

      <div className="USCard">
        <h1>User Settings</h1>
        <div className="USItem">
          <label htmlFor="Wallet">Owner Wallet:</label>
          <input
            type="text"
            id="wallet"
            onChange={(e) => {
              handleChange("wallet", e.target.value);
            }}
          ></input>
        </div>
        <div className="USItem">
          <label htmlFor="password">Type Password</label>
          <input
            type="text"
            id="Password"
            onChange={(e) => {
              handleChange("password", e.target.value);
            }}
          ></input>
        </div>
        <div className="USItem">
          <label htmlFor="repassword">Re-type Password</label>
          <input
            type="text"
            id="repassword"
            onChange={(e) => {
              handleChange("repassword", e.target.value);
            }}
          ></input>
        </div>

        <div
          className="USButton"
          onClick={
            settings.wallet != "" && settings.password == settings.repassword
              ? () => setAsking(true)
              : settings.wallet == ""
              ? () => sendNotif("Wallet can't be empty")
              : () => sendNotif("Passwords do not match")
          }
        >
          Update
        </div>
      </div>
      <IdleAnimation color="var(--SG)" s="2.5s" />
    </div>
  );
}

export default UserSettings;
