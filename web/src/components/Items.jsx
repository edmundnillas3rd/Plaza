import { useEffect, useState } from "react";

import StarRating from "./StarRating";

function ItemCard({ id, name, image, price, rating }) {
  return (
    <a href={`/products/item/${id}`}>
      <div className="item-card container column">
        <img src={image} alt={name} />
        <div className="product-description">
          <div className="container">
            <h3 className="product-name">{name}</h3>
            <p className="product-pricetag">{price}</p>
          </div>
          <StarRating readOnly ratingValue={rating} />
        </div>
      </div>
    </a>
  );
}

export default function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/inventory`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.items);
      });
  }, []);

  return (
    <div className="items-list-container">
      {items &&
        items.map((item, index) => (
          <ItemCard
            key={index}
            id={item._id}
            name={item.name}
            image={item.signedUrl}
            category={item.category.name}
            price={item.price}
            rating={item.rating}
          />
        ))}
    </div>
  );
}
