import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineCopyrightCircle,
  AiFillGithub,
  AiOutlineSearch
} from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";

import Profile from "../features/profile/Profile";

export default function Main({ categories, children }) {
  const [dropdown, setDropdown] = useState(false);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [item, setItem] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <header>
        <h3>Plaza</h3>
        <div className="search-bar-container">
          <form
            action=""
            method="GET"
            onSubmit={() => {
              navigate(`/inventory/items/search/${item}`);
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                setItem(e.target.value);
              }}
            />
            <button>
              <AiOutlineSearch size={16} />
            </button>
          </form>
        </div>
        <nav className="links-container container">
          <div className="nav-bar">
            <RxHamburgerMenu size={30} />
          </div>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <div
                className="dropdown"
                onClick={(e) => {
                  setDropdown(!dropdown);
                }}
              >
                Products
              </div>
            </li>
            <li>
              <Link to="/inventory/items">Sell</Link>
            </li>
            <li>{isLogin ? <Profile /> : <Link to="/login">Log in</Link>}</li>
            <li>
              <Link to="/shopping-cart">
                <AiOutlineShoppingCart size={20} />
              </Link>
            </li>
          </ul>
          <div className={`dropdown-pane ${dropdown ? "container" : "hide"}`}>
            <div className="pane left-pane">
              <h3>Categories</h3>
            </div>
            <div className="pane right-pane">
              <ul>
                {categories &&
                  categories.map((category, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setDropdown(false);
                      }}
                    >
                      <Link
                        to={`/inventory/categories/${category.name}/${category._id}`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <div className="copyright-description-container">
          <div className="copyrights-container">
            <AiOutlineCopyrightCircle />
            {new Date().getFullYear()}
          </div>

          <p>Edmund Nillas III </p>

          <nav>
            <li>
              <a href="https://github.com/edmundnillas3rd" target="_blank">
                <AiFillGithub size={24} />
              </a>
            </li>
          </nav>
        </div>
      </footer>
    </>
  );
}
