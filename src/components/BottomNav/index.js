import React from "react";
import { MdAdd } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { SET_CREATE_EXP_DRAWER } from "../../redux/features/appSlice";
import { Link } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";
// styles
import s from "./BottomNav.module.css";

const BottomNav = () => {
  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch(SET_CREATE_EXP_DRAWER(true));
  };

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <div className={s.container}>
      <ul className={s.nav}>
        <li>
          <Link to="/">
            Home
            <span>
              <AiOutlineHome style={{ display: "flex" }} />
            </span>
          </Link>
        </li>
        <li onClick={showDrawer}>
          <a href="#">
            Add-Expense
            <span>
              <MdAdd />
            </span>
          </a>
        </li>
        <li onClick={handleSignOut}>
          <a href="#">
            Log out
            <span>
              <AiOutlineLogout />
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default BottomNav;
