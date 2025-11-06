import "./Notification.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";

function Notification({ id, message, writter, title, deleteTop }) {
  useEffect(() => {
    setTimeout(() => {
      deleteTop(id);
      console.log(id);
    }, 3000);
  }, [deleteTop, id]);

  return (
    <motion.div
      className="NotificationWrapper"
      layout="position"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.1 } }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="NotificationWhite" />
      <div className="NotificationHeader">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="22"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
        </svg>
        <div className="NotificationWritter">{writter}</div>
        <div className="NotificationTitle">{title}</div>
      </div>
      <div className="Width-50">
        <div className="NotificationMessage">{message}</div>
      </div>
      <div className="NotificationGlow"> </div>
      {/* <img
        src="https://3000-idx-ethersbackend-1741062191902.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev/api/images/avatars/thumbnail/1280"
        alt=""
      /> */}
    </motion.div>
  );
}

const NotificationWrapper = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    addNotification: (message, writter, title) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: message || "Your Login attempt has failed.",
          writter: writter || "EVE",
          title: title || "://MECHA #1280",
        },
      ]);
    },
  }));

  const [messages, setMessages] = useState([
    // {
    //   id: Date.now(),
    //   message: "Your Login attempt has failed.",
    //   writter: "EVE",
    //   title:  "://MECHA #1280",
    // }
  ]);

  // Remove oldest message every 3 seconds if there are messages
  const deleteTop = (id) => {
    if (messages.length === 0) return;
    console.log("dfsdfsd ", id);

    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <div className="NotificationGrouper">
      <AnimatePresence>
        {messages.map((content) => {
          return (
            <Notification
              key={content.id} // Use unique ID as key
              id={content.id} // Use unique ID as key
              message={content.message} // Fixed: was passing 'i' instead of content.message
              writter={content.writter}
              title={content.title}
              deleteTop={deleteTop}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
});

NotificationWrapper.displayName = "NotificationWrapper";
export default NotificationWrapper;
