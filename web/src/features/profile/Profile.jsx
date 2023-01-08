import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "./userSlice";

export default function Profile() {
  const username = useSelector((state) => state.user.username);

  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(username)
    })
      .then((res) => res.json())
      .then((data) => {});

    dispatch(logoutUser());
  };

  return (
    <>
      <div>User: {username}</div>
      <button onClick={logout}>Logout</button>
    </>
  );
}
