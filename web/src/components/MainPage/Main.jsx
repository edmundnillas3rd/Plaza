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

const MainPage = () => {
  return (
    <Routes>
      <Route exact path="/" element={<ItemDisplay />} />
      <Route exact path="/inventory/items" element={<SellItem />} />
      <Route exact path="/inventory/items/:id" element={<ItemDescription />} />
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/signup" element={<SignupForm />} />
      <Route exact path="/shopping-cart" element={<Cart />} />
    </Routes>
  );
};

export default function Main() {
  const isLogin = useSelector((state) => state.user.isLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    // localStorage.clear();
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      dispatch(user.login());
      dispatch(user.setID(foundUser.id));
      dispatch(user.setUser(foundUser.user));

      if (foundUser.items !== undefined) {
        dispatch(cart.setItem(foundUser.items));
      } else {
        dispatch(cart.setItem([]));
      }
    }
  }, []);

  return (
    <>
      <header>
        <h3>Plaza</h3>
        <nav className="links-container">
          <div className="nav-bar">
            <RxHamburgerMenu />
          </div>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/inventory/items">Sell</Link>
            </li>
            <li>{isLogin ? <Profile /> : <Link to="/login">Log in</Link>}</li>
            <li>
              <Link to="/shopping-cart">
                <AiOutlineShoppingCart />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <MainPage />
      </main>
    </>
  );
}
