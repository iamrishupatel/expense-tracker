import { DropDown, DropDownItem } from "artemis-ui";
import React from "react";
import { AiFillCaretDown, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SET_CREATE_EXP_MODAL } from "../../redux/features/appSlice";
import { logout } from "../../redux/features/authSlice";

// styles
import s from "./Nav.module.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const signout = () => {
    dispatch(logout());
  };

  return (
    <nav className={s.nav}>
      <div className={s.brand}>
        <h1>
          <Link to="/">Xpense</Link>
        </h1>
      </div>

      <ul className={s.navlinks}>
        <li
          onClick={() => dispatch(SET_CREATE_EXP_MODAL(true))}
          className={s.addExp}
        >
          <h4>
            <AiOutlinePlus style={{ display: "flex" }} /> Add Expense
          </h4>
        </li>
      </ul>
      <div style={{ display: "flex" }}>
        <User />
        <div className={s.dropDown}>
          <DropDown label={<AiFillCaretDown />} trigger="hover" shape="rounded">
            <DropDownItem onClick={signout}>
              <div>Log out</div>
            </DropDownItem>
          </DropDown>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;

const User = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Link to="/profile" className={s.user}>
      <img src={auth.photoURL} alt="" />
      <p>{auth.displayName}</p>
    </Link>
  );
};
