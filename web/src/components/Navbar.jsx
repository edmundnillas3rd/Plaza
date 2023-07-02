import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiFillCaretDown
} from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { resetUser } from "../features/Profile/userSlice";

import Profile from "../features/Profile/Profile";
import image from "../assets/images/plaza-logo.png";

export default function Navbar() {
  const [categories, setCategories] = useState(null);
  const [name, setName] = useState("");

  const [showCategoryDropdown, setCategoryDropdown] = useState(false);
  const categoryDropdownRef = useRef();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const [displayNav, setShowNav] = useState(false);
  const navRef = useRef();

  const [show, setShow] = useState(false);
  const inputRef = useRef();

  const user = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      if (navRef.current && !navRef.current.contains(e.target) && displayNav) {
        setShowNav(false);
      }

      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }

      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(e.target)
      ) {
        setCategoryDropdown(false);
      }
    };

    const onResizeHandler = (e) => {
      setShow(false);
      setShowNav(false);
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
    setShowNav(!displayNav);
  };

  const onLogoutHandler = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      dispatch(resetUser());
      localStorage.clear();
    });
  };

  return (
    <div className="header container space-around align padded-md">
      <Link to="/" className="logo-link container center-content gap-sm">
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
          onChange={(e) => {
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
                      to={`/products/item/category/${category._id}`}
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
          <li className="nav-item container center-content cursor-pointer">
            <Link to="/cart">
              <AiOutlineShoppingCart />
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className="drawer-container container center-content cursor-pointer"
        ref={navRef}
        onClick={openSidenav}
      >
        <GiHamburgerMenu />
      </div>
      <div
        className={`sidenav ${displayNav && "show"} container column gap-half`}
        ref={navRef}
      >
        <span
          className="mt"
          onClick={(e) => {
            setShowNav(false);
          }}
        >
          &times;
        </span>
        <div className="sidenav-links-container mt container column padded-md gap-sm">
          <Link to="/">Home</Link>
          <Link to="/vendor">Start Selling</Link>
          <div
            className="sidenav-dropdown-button"
            ref={dropdownRef}
            onClick={(e) => {
              setShowDropdown(!showDropdown);
              if (!!!user) navigate("/auth");
            }}
          >
            <div className="container gap-half cursor-pointer">
              {!!user ? (
                <>
                  <p>{user}</p>
                  <AiFillCaretDown />
                </>
              ) : (
                "Profile"
              )}
            </div>
          </div>
          {showDropdown && (
            <div className="sidenav-dropdown-content container">
              {!!user && <button onClick={onLogoutHandler}>Logout</button>}
            </div>
          )}
          <div
            className="sidenav-dropdown-button cursor-pointer"
            ref={categoryDropdownRef}
            onClick={(e) => {
              setCategoryDropdown(!showCategoryDropdown);
            }}
          >
            <div className="container gap-half">
              <p>Categories</p>
              <AiFillCaretDown />
            </div>
          </div>
          {showCategoryDropdown && (
            <div className="sidenav-dropdown-content cursor-pointer container column gap-half opacity-65">
              {categories &&
                categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/products/item/category/${category._id}`}
                  >
                    {category.name}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
