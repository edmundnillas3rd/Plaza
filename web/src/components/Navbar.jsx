import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import Profile from "../features/Profile/Profile";
import image from "../assets/images/plaza-logo.png";

export default function Navbar() {
  return (
    <div className="header container align padded-md">
      <div className="container center-content gap-sm">
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
          <AiOutlineSearch color="#24242436" size={20} />
        </button>
      </form>
      <nav className="navbar container align">
        <ul className="container align gap-sm flex">
          <li className="nav-item container align cursor-pointer">
            <FaAngleRight />
            Category
          </li>
          <li className="nav-item">
            <Link>Sell</Link>
          </li>
          <li>
            <Profile />
          </li>
        </ul>
      </nav>
      <div className="drawer-container container center-content cursor-pointer">
        <GiHamburgerMenu />
      </div>
    </div>
  );
}
