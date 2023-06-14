import { useState } from "react";
import StarRating from "../../components/StarRating";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

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
  name,
  description,
  rating,
  stock,
  price
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-information-container container column flex gap-half">
      <h2>{name}</h2>
      <div className="product-subinfo-container container gap-md">
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
        <LabelInfo title="Description">
          <p>{description}</p>
        </LabelInfo>
        <LabelInfo title="Quantity">
          <div className="quantity-container container">
            <button
              className="container center-content padded-sm"
              onClick={(e) => {

                if (quantity <= 0) return;
                setQuantity(quantity - 1)
              }}
            >
              <AiOutlineMinus />
            </button>
            <input
              className="text-center"
              type="text"
              inputMode="numeric"
              pattern="\d"
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
                if (quantity > stock) return;
                setQuantity(quantity + 1)
              }}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </LabelInfo>
        <div className="buy-button-container gap-half">
          <button className="add-cart-container">Add to Cart</button>
          <button className="buy-now-container">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
