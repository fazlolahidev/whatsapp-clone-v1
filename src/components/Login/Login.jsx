import React from "react";

//* Styles *//
import style from "./Login.module.css";

//* Images *//
import loginLogo from "../../images/login-logo.png";
import { Button } from "@mui/material";

//* Firebase *//
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const googleProvider = new GoogleAuthProvider();


  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={style.login}>
      <div className={style.login__container}>
        <img
          src={loginLogo}
          alt="login whatsapp logo"
          className={style.login__image}
        />

        <div className={style.login__info}>
          <div>
            <p> Sign in to whatsapp </p>
          </div>

          <Button variant="outlined" onClick={signIn}>
            Sing in with google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
