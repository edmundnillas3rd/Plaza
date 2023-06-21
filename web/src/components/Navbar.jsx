import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState, useRef } from "react";

import Profile from "../features/Profile/Profile";
import image from "../assets/images/plaza-logo.png";

export default function Navbar() {
  const [categories, setCategories] = useState(null);
  const [name, setName] = useState("");

  const [displayNav, setDisplayNav] = useState(false);
  const navRef = useRef();

  const [show, setShow] = useState(false);
  const inputRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/inventory/items/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      });

    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShow(false);
      }

      if (navRef.current && !navRef.current.contains(e.target)) {
        setDisplayNav(false);
      }
    };

    const onResizeHandler = (e) => {
      setShow(false);
      setDisplayNav(false);
    };

    window.addEventListener("click", handler);
    window.addEventListener("resize", onResizeHandler);
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("resize", onResizeHandler);
    };
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate(`/products/item/search/${name}`);
  };

  const openSidenav = (e) => {
    setDisplayNav(!displayNav);
  };

  return (
    <div className="header container space-around align padded-md">
      <Link to="/" className="container center-content gap-sm">
        <img className="xxsm" src={image} alt="plaza-logo" />
        <h2>Plaza</h2>
      </Link>
      <form
        className="search-bar-container container"
        method="GET"
        onSubmit={onSubmitHandler}
      >
        <input
          type="text"
          name="search-item"
          id="search-item"
          placeholder="Search"
          onChange={e => {
            e.preventDefault();
            setName(e.target.value);
          }}
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
                  <h3 className="category-header">Categories</h3>
                </div>
                <div className="category-container padded-md">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/products/item/${category._id}`}
                      className="container align gap-half"
                    >
                      <div className="icon-category-container xsm">
                        <img src={category.iconUrl} alt="icon" />
                      </div>
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
      <div
        className="drawer-container container center-content cursor-pointer"
        onClick={openSidenav}
        ref={navRef}
      >
        <GiHamburgerMenu />
      </div>
      <div
        className="sidenav container column gap-half"
        style={{
          width: `${displayNav ? "250px" : "0"}`
        }}
      >
        <span
          className="mt"
          onClick={(e) => {
            setDisplayNav(false);
          }}
        >
          &times;
        </span>
        <div className="sidenav-links-container mt container column padded-md gap-sm">
          <Link to="/">Home</Link>
          <Link to="/vendor">Start Selling</Link>
        </div>
      </div>
    </div>
  );
}
