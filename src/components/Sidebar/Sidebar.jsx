import React, { useState, useEffect } from "react";

//* Components *//
import SidebarChat from "../SidebarChat/SidebarChat";

//* Styles *//
import style from "./Sidebar.module.css";

//* ICONS *//
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

//* Firebase *//
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../../firebase";

//* Firebase Hooks *//
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Sidebar = () => {
  const [user, loading] = useAuthState(auth);
  const [showLogout, setShowLogout] = useState(false);

  // States
  const [names, setNames] = useState([]);

  // Get rooms name
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms"), (querySnapshot) => {
      const names = [];

      querySnapshot.forEach((doc) => {
        names.push({ id: doc.id, ...doc.data() });
      });

      setNames(names);
    });

    return () => unsub();
  }, []);

  const handleShowBtn = () => {
    setShowLogout((pre) => !pre);
  };

  return (
    <div className={style.sidebar}>
      {/* HEADER */}
      <div className={style.sidebar__header}>
        <Avatar src={user.photoURL} />

        <div className={style.sidebar__headerRight}>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton onClick={handleShowBtn}>
            <MoreVertIcon />
          </IconButton>
          {showLogout && (
            <div className={style.sidebar__logout}>
              <LogoutIcon />
              <span>Logout</span>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH */}
      <div className={style.sidebar__search}>
        <div className={style.sidebar__searchContainer}>
          <SearchIcon />
          <input
            type="text"
            placeholder="search rooms ..."
            className={style.sidebar__searchInput}
          />
        </div>
      </div>

      {/* CHAT */}
      <div className={style.sidebar__chat}>
        <SidebarChat addNewChat />

        {names.map((room) => {
          return <SidebarChat key={room.id} id={room.id} name={room.name} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
