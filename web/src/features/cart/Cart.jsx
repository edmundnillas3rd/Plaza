import { useDispatch, useSelector } from "react-redux";

import { cart } from "../cart/cartSlice";
import ItemCard from "../../components/MainPage/ItemCard";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const usernameID = useSelector((state) => state.user.id);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitPurchase = () => {
    const order = {
      user: usernameID,
      orders: items
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/orders/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });
    dispatch(cart.reset());
    navigate("/");
  };

  return (
    <div className="container">
      <h3>Shopping Cart</h3>
      <div className="item-display">
        {items !== undefined &&
          items.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              url={item.url}
            />
          ))}
      </div>
      <button onClick={submitPurchase}>Purchase</button>
    </div>
  );
}
