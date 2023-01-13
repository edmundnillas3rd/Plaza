import { useDispatch, useSelector } from "react-redux";

import { user } from "./userSlice";

export default function Profile() {
  const username = useSelector((state) => state.user.username);

  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BASE_URL}/logout`);

    dispatch(user.setID(""));
    dispatch(user.setUser(""));
    dispatch(user.logout());
    localStorage.clear();
  };

  return (
    <div className="profile-container dropdown">
      <p>{username}</p>
      <div className="dropdown-options">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
