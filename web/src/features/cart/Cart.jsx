import { useDispatch, useSelector } from "react-redux";

import { cart } from "../cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CheckoutItemCard = ({ name, price, url, image, stock }) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="checkout-item-container container">
      <Link to={url}>
        <div className="item-container">
          <div className="image-container">
            <img src={image} alt="item" />
          </div>
          <div className="item-information-container">
            <h3>{name}</h3>
            <p>{price}</p>
          </div>
        </div>
      </Link>
      <div className="modify-item-container">
        <div className="quantity-container">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max={stock}
          />
        </div>
        <button
          onClick={(e) => {
            const index = items.findIndex((item) => item.name === name);
            const result = items.filter((_, i) => i !== index);

            dispatch(cart.setItem(result));
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default function Cart() {
  const usernameID = useSelector((state) => state.user.id);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(items);
  }, []);

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
    <div className="shopping-cart-container container">
      <h3>Shopping Cart</h3>
      <div className="item-display">
        {items !== undefined &&
          items.map((item, index) => (
            <CheckoutItemCard
              key={index}
              name={item.name}
              price={item.price}
              url={item.url}
              image={item.image}
              stock={item.stock}
            />
          ))}
      </div>
      <div className="button-container">
        <button onClick={submitPurchase}>Checkout Purchase</button>
      </div>
    </div>
  );
}
