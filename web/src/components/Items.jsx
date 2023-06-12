import { useEffect, useState } from "react";

import StarRating from "./StarRating";

function ItemCard({ name, image, price, rating }) {
  return (
    <div className="item-card container column">
      <img src={image} alt={name} />
      <div className="product-description">
        <div className="container">
          <h3 className="product-name">{name}</h3>
          <p className="product-pricetag">{price}</p>
        </div>
        <StarRating readOnly ratingValue={rating}/>
      </div>
    </div>
  );
}

export default function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/inventory`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.items);
      });
  }, []);

  return (
    <div className="items-list-container container gap-sm">
      {items &&
        items.map((item, index) => (
          <ItemCard
            key={index}
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
