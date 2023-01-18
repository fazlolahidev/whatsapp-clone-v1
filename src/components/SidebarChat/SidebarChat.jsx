import React, { useEffect, useState } from "react";

//* Styles *//
import style from "./SidebarChat.module.css";

//* Icons *//
import Avatar from "@mui/material/Avatar";

//* Router *//
import { Link } from "react-router-dom";

//* Firebase *//
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../firebase";

const SidebarChat = ({ addNewChat, id, name }) => {
  // State
  const [seed, setSeed] = useState();

  // Random seed
  useEffect(() => {
    setSeed(Math.random() * 5000);
  }, []);

  // Add room to the database
  const addChat = async () => {
    const roomName = prompt("Please enter a room name for chat");

    if (roomName.trim().length === 0) {
      alert('Room name must not empty! Please enter a correct name')
    }
    else {
      const docRef = await addDoc(collection(db, "rooms"), {
        name: roomName,
      });
    }
  };

  if (!seed) return;

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className={style.chatContainer}>
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />

        <div className={style.chat__info}>
          <h2>{name}</h2>
          <p>last message ...</p>
        </div>
      </div>
    </Link>
  ) : (
    <h2 className={style.addNewChat} onClick={addChat}>
      Add New Chat
    </h2>
  );
};

export default SidebarChat;
