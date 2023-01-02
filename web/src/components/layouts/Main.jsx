import { Link } from "react-router-dom";

export default function Main({ children }) {
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
              <Link to="/user/sign-up">Sign up</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
