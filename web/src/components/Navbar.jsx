import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState, useRef  } from "react";

import Profile from "../features/Profile/Profile";
import image from "../assets/images/plaza-logo.png";

export default function Navbar() {
  const [categories, setCategories] = useState(null);

  const [show, setShow] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/inventory/items/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      });
  }, []);

  return (
    <div className="header container space-around align padded-md">
      <Link to="/" className="container center-content gap-sm">
        <img className="xxsm" src={image} alt="plaza-logo" />
        <h2>Plaza</h2>
      </Link>
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
          <li className="nav-item mega-menu">
            <button
              className="container align cursor-pointer"
              onClick={(e) => {
                setShow(!show);
              }}
              ref={inputRef}
            >
              <FaAngleRight />
              Category
            </button>
            {show && !!categories && (
              <div className="mega-menu-content">
                <div className="mega-menu-header">
                  <h3>Categories</h3>
                </div>
                <div className="container  wrap">
                  {categories.map((category, index) => (
                    <Link key={index} to={`/products/item/${category._id}`}>
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
          <li className="nav-item">
            <Link to="/vendor">Start Selling</Link>
          </li>
          <li className="nav-item">
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
