import { useDispatch, useSelector } from "react-redux";

import { user } from "./userSlice";
import { cart } from "../cart/cartSlice";
import { useState } from "react";

export default function Profile() {
  const [show, setShow] = useState(false);
  const username = useSelector(state => state.user.name);

  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BASE_URL}/logout`);

    dispatch(user.setID(""));
    dispatch(user.setUser(""));
    dispatch(user.logout());
    dispatch(cart.reset());
    localStorage.clear();
  };

  return (
    <div className="profile-container dropdown" onClick={(e) => setShow(!show)}>
      <button>Profile</button>
      <div className={`dropdown-options ${show ? "show" : "hide"}`}>
        <button>{username}</button>
        <button onClick={() => {}}>Settings</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
