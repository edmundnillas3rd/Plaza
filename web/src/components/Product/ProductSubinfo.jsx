import { useState } from "react";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  appendItem,
  updateItem,
  removeItem
} from "../../features/Cart/cartSlice";

import StarRating from "../../components/StarRating";

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
  const cart = useSelector((state) => state.cart.contents);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(
      appendItem({
        id,
        name,
        image: image[0],
        quantity,
        stock,
        price
      })
    );
  };

  return (
    <div className="product-information-container  container column flex gap-half">
      <h2>{name}</h2>
      <div className="product-subinfo-container  container gap-sm">
        <div className="container center-content gap-half">
          <p className="brand-orange">{rating}</p>
          <StarRating readOnly ratingValue={rating} />
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
                if (quantity < 1) {
                  setQuantity(1);
                  return;
                }
                setQuantity(quantity - 1);
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

                setQuantity(quantity + 1);
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
          <button className="buy-now-container">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
