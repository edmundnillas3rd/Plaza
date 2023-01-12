import { useEffect, useState } from "react";

import ItemCard from "./ItemCard";

export default function ItemDisplay() {
  const [items, setItems] = useState(null);

  const getItems = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/inventory`);
    const data = await response.json();

    setItems(data.result.items);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="item-display">
      {items
        ? items.map((item) => (
            <ItemCard
              key={item._id}
              name={item.name}
              description={item.description}
              url={item.url}
            />
          ))
        : null}
    </div>
  );
}
