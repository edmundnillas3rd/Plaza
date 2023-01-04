import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Main({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
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
            <li>
              <Link to="/sign-up">Sign up</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
