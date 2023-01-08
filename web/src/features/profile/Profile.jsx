import { useDispatch, useSelector } from "react-redux";

import { logoutUser, setUser } from "./userSlice";

export default function Profile() {
  const username = useSelector((state) => state.user.username);

  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
      credentials: "include"
    }).then((res) => res.json());

    dispatch(setUser(""));
    dispatch(logoutUser());
  };

  return (
    <div className="profile-container">
      <div>User: {username}</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
