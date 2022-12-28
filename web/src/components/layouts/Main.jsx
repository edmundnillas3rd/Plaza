import { Link } from "react-router-dom";

export default function Main({ children }) {
  return (
    <header>
      <nav className="links-container">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
