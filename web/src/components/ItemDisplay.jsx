import { useEffect, useState } from "react";

import ItemCard from "./ItemCard";

export default function ItemDisplay() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch("/inventory")
      .then((res) => res.json())
      .then((data) => setItems(data.result.items));
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
