import React, { useEffect } from "react";

//* Style *//
import style from "./App.module.css";

//* Components *//
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";

//* Router *//
import { Routes, Route, useNavigate } from "react-router-dom";

//* Firebase Hooks *//
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";



const App = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/')
  },[])

  if (loading) return;

  return (
    <div className={style.app}>
      {!user ? (
        <Login />
      ) : (
        <div className={style.app__body}>
          <Routes>
            <Route path="/" element={<Sidebar />} />
            <Route
              path="/rooms/:roomId"
              element={
                <>
                  <Sidebar />
                  <Chat />
                </>
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
