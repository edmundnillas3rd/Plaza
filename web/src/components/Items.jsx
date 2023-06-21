import { useEffect, useState } from "react";

import ItemCard from "./ItemCard";

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
