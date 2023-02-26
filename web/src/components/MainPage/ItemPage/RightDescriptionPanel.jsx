import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { cart } from "../../../features/cart/cartSlice";

export default function RightDescriptionPanel({ data }) {
  const [quantity, setQuantity] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();

  const addToCart = (e) => {
    const item = {
      id,
      name: data.item.name,
      description: data.item.description,
      url: data.item.url,
      quantity: Number.parseInt(quantity)
    };

    dispatch(cart.setItem(item));
  };

  return (
    <div className="right-panel">
      <div>
        <p>Name: {data.item.name}</p>
        <p>Seller: {data.item.seller.name}</p>
        <p>Price: {data.item.price}</p>
        <p>Stock: {data.item.stock}</p>
      </div>

      <div className="button-container">
        <button className="shopping-button add-cart-button" onClick={addToCart}>
          Add to Cart
        </button>
        <button
          className="shopping-button add-wishlist-button"
          onClick={() => {}}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}
