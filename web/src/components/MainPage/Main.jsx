import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

import Profile from "../../features/profile/Profile";
import { user } from "../../features/profile/userSlice";

import ItemDisplay from "./ItemDisplay";
import ItemDescription from "./ItemDescription";
import SellItem from "./SellItem";
import SignupForm from "../AuthPage/SignupForm";
import LoginForm from "../AuthPage/LoginForm";
import Cart from "../../features/cart/Cart";

const MainPage = () => {
  return (
    <Routes>
      <Route exact path="/" element={<ItemDisplay />} />
      <Route exact path="/sell" element={<SellItem />} />
      <Route exact path="/inventory/items/:id" element={<ItemDescription />} />
      <Route exact path="/sign-up" element={<SignupForm />} />
      <Route exact path="/login" element={<LoginForm />} />
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
    }
  }, []);

  return (
    <>
      <header>
        <nav className="links-container">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sell">Sell</Link>
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
