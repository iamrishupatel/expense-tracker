import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from "artemis-ui";
import { logInWithGoogle } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

import s from "./SignIn.module.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const clickHandler = () => {
    dispatch(logInWithGoogle());
  };

  if (auth && auth.id) {
    return <Navigate to="/" />;
  }
  return (
    <main className={s.signin}>
      <h1>Welcome to Xpense</h1>
      <p>Please sign in by any of the method(s)</p>
      <Button onClick={clickHandler} variant="primary" shape="rounded">
        <>
          <img src="/google-icon-logo.png" alt="google" height="24px" />
          Sign in with Google
        </>
      </Button>
      <span>We do not sell you data.</span>
    </main>
  );
};

export default SignIn;
