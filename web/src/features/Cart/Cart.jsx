import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import {
  updateItem,
  removeItem,
  getTotalAmount,
  appendItem,
  reset
} from "./cartSlice";
import ModalPopup from "../../components/Cart/ModalPopup";

function ShoppingCard({ id, name, image, price, stock, qty }) {
  const [quantity, setQuantity] = useState(qty);

  const dispatch = useDispatch();

  const updateQtyItem = (value) => {
    if (value >= stock) {
      setQuantity(stock);
      return;
    }

    if (value <= 1) {
      setQuantity(1);
      return;
    }

    setQuantity(value);

    dispatch(
      updateItem({
        id,
        quantity: value
      })
    );
    dispatch(getTotalAmount());
  };

  return (
    <div className="shopping-card container gap-md align flex padded-sm width-full">
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
            e.preventDefault();
            updateQtyItem(parseInt(quantity - 1));
          }}
        >
          <AiOutlineMinus />
        </button>
        <input
          className="text-center"
          type="text"
          inputMode="numeric"
          pattern="\d+"
          value={parseInt(quantity)}
          min="1"
          max={stock}
          onChange={(e) => {
            e.preventDefault();
            updateQtyItem(parseInt(e.target.value));
          }}
        />
        <button
          className="container center-content padded-sm"
          onClick={(e) => {
            e.preventDefault();
            updateQtyItem(parseInt(quantity + 1));
          }}
        >
          <AiOutlinePlus />
        </button>
      </div>
      <p className="brand-orange">{price * quantity}</p>
      <button
        onClick={(e) => {
          dispatch(removeItem({ item: id }));
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default function Cart() {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const id = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token)
  const user = useSelector((state) => state.user.username);
  const cart = useSelector((state) => state.cart.contents);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!!user) {
      navigate("/auth");
    }

    const retrieveCart = localStorage.getItem("cart");

    if (!!retrieveCart) {
      dispatch(appendItem(JSON.parse(retrieveCart)));
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/inventory`)
      .then(response => response.json())
      .then(data => {
        const filteredItems = cart.map(item => {
          const foundItem = data.items.find(product => product.item === item._id);
          return {
            id: foundItem._id,
            name: foundItem.name,
            price: foundItem.price,
            image: foundItem.image.urls[0],
            stock: foundItem.stock,
            quantity: item.quantity
          };
        });
        setCartItems(filteredItems);
    })

    dispatch(getTotalAmount());
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const userData = {
      user: id,
      orders: cart
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/orders/checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      credentials: "include",
      body: JSON.stringify(userData)
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
    }).then(data => {
      window.location.href = data.url;
    });

    localStorage.removeItem("cart");
    dispatch(reset());
  }

  return (
    <div className="cart-page container center-content padded-md">
      {show && (
        <ModalPopup
          callbackFn={(e) => {
            setShow(false);
          }}
        />
      )}

      <div className="section container center-content gap-md column">
        {!!!cart.length ? (
          <>
            <h3>You cart is empty</h3>
            <button
              className="padded-sm"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Start Buying
            </button>
          </>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <ShoppingCard
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                stock={item.stock}
                qty={item.quantity}
              />
            ))}
            <form method="POST" onSubmit={onSubmitHandler} >
              <button className="button-orange-theme" type="submit">
                Checkout
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
