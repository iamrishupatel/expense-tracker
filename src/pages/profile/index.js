import React from "react";
import { Button } from "artemis-ui";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";

// styes
import s from "./Profile.module.css";

const ProfilePage = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logout());
  };
  return (
    <div className={s.user}>
      <img src={auth.photoURL} alt="" />
      <h2>{auth.displayName}</h2>
      <p>{auth.email}</p>
      <div>
        <Link to="/">
          <Button variant="primary" shape="rounded" size="sm">
            Go Home
          </Button>
        </Link>
        <Button
          variant="danger-light"
          shape="rounded"
          size="sm"
          onClick={handleSignOut}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
