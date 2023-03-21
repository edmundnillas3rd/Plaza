import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";

import Profile from "../../features/profile/Profile";
import { user } from "../../features/profile/userSlice";
import { cart } from "../../features/cart/cartSlice";

import ItemDisplay from "./ItemDisplay";
import ItemDescription from "./ItemPage/ItemDescription";
import SellItem from "./SellItem";
import Cart from "../../features/cart/Cart";
import LoginForm from "../AuthPage/LoginForm";
import SignupForm from "../AuthPage/SignupForm";
import { useState } from "react";
import ItemCategoryDisplay from "./ItemCategoryDisplay";

export default function Main() {
  const [dropdown, setDropdown] = useState(false);
  const [categories, setCategories] = useState(null);
  const [items, setItems] = useState(null);
  const isLogin = useSelector((state) => state.user.isLogin);

  const dispatch = useDispatch();

  const getItemAndCategories = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/inventory`);
    const data = await response.json();

    setCategories(data.categories);
    setItems(data.items);
  };

  useEffect(() => {
    // localStorage.clear();
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      dispatch(user.login());
      dispatch(user.setID(foundUser.id));
      dispatch(user.setUser(foundUser.user));

      if (foundUser.cart !== undefined) {
        dispatch(cart.setItem(foundUser.cart));
      } else {
        dispatch(cart.setItem([]));
      }
    }

    getItemAndCategories();
  }, []);

  return (
    <>
      <header>
        <h3>Plaza</h3>
        <nav className="links-container">
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
                    <li key={index}>
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
      <main>
        <Routes>
          <Route path="/" element={<ItemDisplay items={items} />} />
          <Route path="/inventory/items" element={<SellItem />} />
          <Route path="/inventory/items/:id" element={<ItemDescription />} />
          <Route
            path="/inventory/categories/:category_name/:category_id"
            element={<ItemCategoryDisplay items={items} />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/shopping-cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  );
}
