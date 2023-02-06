import { useEffect, useState } from "react";

import ItemCard from "./ItemCard";

export default function ItemDisplay() {
  const [items, setItems] = useState(null);
  const [urls, setUrls] = useState(null);

  const getItems = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/inventory`);
    const data = await response.json();

    setItems(data.items);
    setUrls(data.urls);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="item-display">
      <div className="item-category-header">
        <h3>General</h3>
      </div>
      <div className="item-lists-container">
        {items &&
          items.map((item, index) => (
            <ItemCard
              key={index}
              name={item.name}
              description={item.description}
              price={item.price}
              url={item.url}
              image={urls[index]}
            />
          ))}
      </div>
    </div>
  );
}
