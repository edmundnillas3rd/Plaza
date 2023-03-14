import { useDispatch, useSelector } from "react-redux";

import { user } from "./userSlice";
import { cart } from "../cart/cartSlice";

export default function Profile() {
  const username = useSelector((state) => state.user.name);

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
    <div className="profile-container dropdown">
      <p>{username}</p>
      <div className="dropdown-options">
        <button onClick={() => {}}>Settings</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
