import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { updateItem, removeItem } from "./cartSlice";

function ShoppingCard({ id, name, image, price, stock, qty }) {
  const [quantity, setQuantity] = useState(qty);
  const cart = useSelector((state) => state.cart.contents);

  const dispatch = useDispatch();

  const updateQtyItem = (value) => {
    if (value >= stock) {
      setQuantity(stock);
      return;
    }

    if (value < 1) {
      setQuantity(1);
      return;
    }

    setQuantity(value);

    dispatch(
      updateItem({
        id,
        name,
        image,
        price,
        stock,
        quantity: value
      })
    );
  };

  return (
    <div className="shopping-card container gap-md align flex padded-sm">
      <div className="container sm">
        <img src={image} alt={name} />
      </div>
      <Link to={`/products/item/${id}`}>
        <p>{name}</p>
      </Link>
      <div className="quantity-container container">
        <button
          className="container center-content padded-sm"
          onClick={(e) => {
            updateQtyItem(quantity - 1);
          }}
        >
          <AiOutlineMinus />
        </button>
        <input
          className="text-center"
          type="text"
          inputMode="numeric"
          pattern="\d+"
          value={quantity}
          min="1"
          max={stock}
          onChange={(e) => {
            updateQtyItem(parseInt(e.target.value));
          }}
        />
        <button
          className="container center-content padded-sm"
          onClick={(e) => {
            updateQtyItem(quantity + 1);
          }}
        >
          <AiOutlinePlus />
        </button>
      </div>
      <p className="brand-orange">{price * quantity}</p>
      <button
        onClick={(e) => {
          dispatch(removeItem({ id }));
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default function Cart() {
  const user = useSelector((state) => state.user.username);
  const cart = useSelector((state) => state.cart.contents);

  const navigate = useNavigate();

  useEffect(() => {
    if (!!!user) {
      navigate("/auth");
    }
  }, []);

  return (
    <div className="cart-page container center-content padded-md">
      <div className="section container center-content gap-md column">
        {!!!cart.length ? (
          <>
            <h3>You cart is empty</h3>
            <button className="padded-sm"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Start Buying
            </button>
          </>
        ) : (
          cart.map((item, index) => (
            <ShoppingCard
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              stock={item.stock}
              qty={item.quantity}
            />
          ))
        )}
      </div>
    </div>
  );
}