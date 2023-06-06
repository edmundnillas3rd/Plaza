import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul className="container one-gap">
        <li>Category</li>
        <li>
          <Link>Sell</Link>
        </li>
      </ul>
    </nav>
  );
}
