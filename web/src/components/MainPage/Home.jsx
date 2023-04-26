import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import { user } from "../../features/profile/userSlice";
import { cart } from "../../features/cart/cartSlice";

import ItemDisplay from "./ItemDisplay";
import ItemDescription from "./ItemPage/ItemDescription";
import SellItem from "./SellItem";
import Cart from "../../features/cart/Cart";
import LoginForm from "../AuthPage/LoginForm";
import SignupForm from "../AuthPage/SignupForm";
import ItemCategoryDisplay from "./ItemCategoryDisplay";
import ItemSearchDisplay from "./ItemSearchDisplay";

import Layout from "../../layouts/Main";

const Main = ({ categories, items }) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <Routes>
      <Route path="/" element={<Layout categories={categories} />}>
        <Route index element={<ItemDisplay items={items} />} />
        <Route path="/inventory/items" element={<SellItem />} />
        <Route path="/inventory/items/:id" element={<ItemDescription />} />
        <Route path="/shopping-cart" element={<Cart />} />
        <Route
          path="/inventory/categories/:category_name/:category_id"
          element={<ItemCategoryDisplay items={items} />}
        />
        <Route
          path="/inventory/items/search/:item_name"
          element={<ItemSearchDisplay />}
        />
      </Route>
    </Routes>
  );
};

export default function Home() {
  const [categories, setCategories] = useState(null);
  const [items, setItems] = useState(null);

  const getItemAndCategories = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/inventory`);
    const data = await response.json();

    setCategories(data.categories);
    setItems(data.items);
  };

  const dispatch = useDispatch();

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
    <Routes>
      <Route
        path="*"
        element={<Main categories={categories} items={items} />}
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
    </Routes>
  );
}
