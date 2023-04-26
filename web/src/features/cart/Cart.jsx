import { useDispatch, useSelector } from "react-redux";
import { cart } from "../cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import image from "../../assets/office-background.jpg";

const getItemQuantity = (items, name) => {
  const index = items.findIndex((item) => item.name === name);
  return items[index].quantity;
};

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
            onChange={(e) => {
              const index = items.findIndex((item) => item.name === name);
              const item = {
                ...items[index],
                quantity: Number.parseInt(e.target.value)
              };
              dispatch(cart.setItem(item));
            }}
            value={`${getItemQuantity(items, name)}`}
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
  const isLogin = useSelector((state) => state.user.isLogin);

  const [submit, setSubmit] = useState(false);
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(items);
  }, []);

  const submitPurchase = () => {
    const totalSum = items.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0
    );

    if (amount < totalSum) {
      console.log("Insufficient amount!");
      console.log("Amount: ", amount);
      console.log("Total Sum: ", totalSum);
      return;
    }

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
      <h3>
        {items !== undefined && items.length !== 0
          ? "Shopping Cart"
          : "Your Cart is empty"}
      </h3>

      {isLogin ? (
        <>
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
            {submit ? (
              <>
                <label htmlFor="amount">Enter Amount: </label>
                <input
                  type="text"
                  onChange={(e) => setAmount(Number.parseInt(e.target.value))}
                />
                <button onClick={submitPurchase}>Enter Amount</button>
              </>
            ) : (
              items.length !== 0 && 
              <button
                onClick={() => {
                  setSubmit(true);
                }}
              >
                Checkout Purchase
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="background-container">
            <img src={image} alt="office-background" />
          </div>
          <div className="redirect-container container">
            <button className="login-button">
              <Link to="/login">Login to your account</Link>
            </button>
            <button className="signup-button">
              <Link to="/signup">Sign Up now</Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
