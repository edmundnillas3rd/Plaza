import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Profile from "../../features/profile/Profile";

export default function Main({ children }) {
  const isLogin = useSelector((state) => state.user.isLogin);

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
