import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Profile from "../../features/profile/Profile";
import { user } from "../../features/profile/userSlice";

export default function Main({ children }) {
  const isLogin = useSelector((state) => state.user.isLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    // localStorage.clear();
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      dispatch(user.login());
      dispatch(user.setID(foundUser.id));
      dispatch(user.setUser(foundUser.user));
    }
  }, []);

  return (
    <>
      <header>
        <nav className="links-container">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sell">Sell</Link>
            </li>
            <li>{isLogin ? <Profile /> : <Link to="/login">Log in</Link>}</li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
