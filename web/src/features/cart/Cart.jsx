import { useDispatch, useSelector } from "react-redux";
import { cart } from "../cart/cartSlice";
import ItemCard from "../../components/MainPage/ItemCard";
import { useEffect } from "react";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const submitPurchase = async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/inventory/items/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(items)
    });

    dispatch(cart.reset());
  };

  useEffect(() => {
    console.log(items);
  }, []);

  return (
    <div className="container">
      <h3>Shopping Cart</h3>
      <div className="item-display">
        {items &&
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
