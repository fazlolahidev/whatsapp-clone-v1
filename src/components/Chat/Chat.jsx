import React, { useEffect, useState } from "react";

//* Styles *//
import style from "./Chat.module.css";

//* Icons *//
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

//* Router *//
import { useParams } from "react-router-dom";

//* Firebase
import { addDoc, collection, doc, onSnapshot } from "@firebase/firestore";
import { db } from "../../firebase";

//* Firebase Hooks *//
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Chat = () => {
  // State
  const [seed, setSeed] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState(null);
  const [user, loading] = useAuthState(auth);

  // Router Params
  const { roomId } = useParams();

  // Set Seed
  useEffect(() => {
    setSeed(Math.random() * 5000);
  }, [roomId]);

  // Set the room name form id
  useEffect(() => {
    if (roomId) {
      const unsub = onSnapshot(doc(db, "rooms", roomId), (doc) => {
        setRoomName(doc.data().name);
      });

      const messageRef = onSnapshot(
        collection(db, "rooms", `${roomId}`, "messages"),
        (doc) => {
          const allMessages = [];

          doc.forEach((data) => {
            allMessages.push(data.data());
          });

          const mes = [];
          doc.forEach((data) => {
            const date = new Date(
              data.data().timestamp.seconds * 1000 +
                data.data().timestamp.nanoseconds / 1000000
            );
            mes.push({ ...data.data(), timestamp: new Date(date) });
          });

          setMessages(mes);
          console.log(mes[0].timestamp)
        }
      );
    }
  }, [roomId]);

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();

    addDoc(collection(db, "rooms", `${roomId}`, "messages"), {
      message: message,
      name: user.displayName,
      timestamp: new Date(),
    });

    setMessage("");
  };

  if (!seed) return;

  return (
    <div className={style.chat}>
      <div className={style.chat__header}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className={style.chat__headerInfo}>
          <h3>{roomName}</h3>
          <p>Last seen at ...</p>
        </div>

        <div className={style.chat__headerRight}>
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton>
            <AttachmentIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className={style.chat__body}>
        {/* WHEN USER SIGN IN, THE MESSAGE IS GREEN */}
        {messages.sort((a,b) => a.timestamp - b.timestamp).map((item, index) => {
          return (
            <p
              key={index}
              className={`${style.chat__message} ${
                user.displayName === item.name && style.chat__reciver
              }`}
            >
              {item.message}
              <span className={style.chat__name}>{item.name}</span>
              <span className={style.chat__timestamp}>{item.timestamp.getHours()}:{ item.timestamp.getMinutes() }</span>
            </p>
          );
        })}
      </div>

      <div className={style.chat__footer}>
        <IconButton>
          <EmojiEmotionsIcon />
        </IconButton>
        <form onSubmit={submitHandler} className={style.chat__form}>
          <input
            type="text"
            placeholder="type message here ..."
            className={style.chat__typeMessage}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* <button type='submit' >send message</button> */}
        </form>
        <IconButton>
          <KeyboardVoiceIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
