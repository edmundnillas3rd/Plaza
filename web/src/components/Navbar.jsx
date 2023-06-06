import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import image from "../assets/images/plaza-logo.png";

export default function Navbar() {
  return (
    <div className="header container align padded-md">
      <div className="container center-content one-gap">
        <img className="xxsm" src={image} alt="plaza-logo" />
        <h2>Plaza</h2>
      </div>
      <form className="search-bar-container container" method="get">
        <input
          type="text"
          name="search-item"
          id="search-item"
          placeholder="Search"
        />
        <button className="container center-content" type="submit">
          <AiOutlineSearch color="#24242436" size={20}/>
        </button>
      </form>
      <nav className="navbar container align">
        <ul className="container one-gap flex">
          <li>Category</li>
          <li>
            <Link>Sell</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
