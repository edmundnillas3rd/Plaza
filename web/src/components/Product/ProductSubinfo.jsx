import { useState } from "react";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart
} from "react-icons/ai";
import { useDispatch } from "react-redux";

import { appendItem } from "../../features/Cart/cartSlice";

import StarRating from "../../components/StarRating";
import { Navigate, useNavigate } from "react-router-dom";

function LabelInfo({ title, children }) {
  return (
    <div className="label-section-container gap-half">
      <div className="flex">
        <p className="opacity-65">{title}</p>
      </div>
      <div className="flex-2">{children}</div>
    </div>
  );
}

export default function ProductSubinfo({
  id,
  name,
  image,
  description,
  rating,
  seller,
  stock,
  price
}) {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (e) => {
    const item = {
      id,
      name,
      image: image[0],
      price,
      quantity,
      stock
    };

    e.preventDefault();
    dispatch(appendItem(item));
  };

  const immediateBuyHandler = (e) => {
    const item = {
      id,
      name,
      image: image[0],
      price,
      quantity,
      stock
    };

    e.preventDefault();
    dispatch(appendItem(item));
    navigate("/cart");
  };

  return (
    <div className="product-information-container  container column flex gap-half">
      <h2>{name}</h2>
      <div className="product-subinfo-container  container gap-sm">
        <div className="container center-content gap-half">
          <p className="brand-orange">{rating}</p>
          <StarRating readOnly value={rating} />
        </div>{" "}
        <span className="opacity-65">|</span>
        <p>
          <span className="underline">{stock}</span>{" "}
          <span className="opacity-65">Stock</span>
        </p>{" "}
      </div>
      <h3 className="brand-orange">{price}</h3>
      <div className="product-labelinfo-container gap-half mt">
        <LabelInfo title="Seller">
          <p>{seller}</p>
        </LabelInfo>
        <LabelInfo title="Description">
          <p>{description}</p>
        </LabelInfo>
        <LabelInfo title="Quantity">
          <div className="quantity-container container">
            <button
              className="container center-content padded-sm"
              onClick={(e) => {
                if (quantity <= 1) {
                  setQuantity(1);
                  return;
                }
                setQuantity(q => q - 1);
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
                setQuantity(parseInt(e.target.value));
              }}
            />
            <button
              className="container center-content padded-sm"
              onClick={(e) => {
                if (quantity >= stock) {
                  setQuantity(stock);
                  return;
                }

                setQuantity(q => q + 1);
              }}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </LabelInfo>
        <div className="buy-button-container gap-half">
          <button
            className="add-cart-container  container gap-half align"
            onClick={addToCartHandler}
          >
            <AiOutlineShoppingCart size={16} /> Add to Cart
          </button>
          <button className="buy-now-container" onClick={immediateBuyHandler}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
