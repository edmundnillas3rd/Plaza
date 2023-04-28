import { useDispatch, useSelector } from "react-redux";

import { setUser, logoutUser } from "./userSlice";
import { cart } from "../cart/cartSlice";
import { useState } from "react";

export default function Profile() {
  const [show, setShow] = useState(false);
  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BASE_URL}/logout`);

    dispatch(setUser(null));
    dispatch(logoutUser());
    dispatch(cart.reset());
    localStorage.clear();
  };

  return (
    <div className="profile-container dropdown" onClick={(e) => setShow(!show)}>
      <button>Profile</button>
      <div className={`dropdown-options ${show ? "show" : "hide"}`}>
        <button>{user.name}</button>
        <button onClick={() => {}}>Settings</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
