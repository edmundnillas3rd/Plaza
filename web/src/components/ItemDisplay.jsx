import { useEffect, useState } from "react";

import ItemCard from "./ItemCard";

export default function ItemDisplay() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => setItems(data.receiveData.items));
  }, []);

  return (
    <div className="item-display">
      {items ? (
        items.map((item, i) => (
          <ItemCard
            key={i}
            name={item.name}
            description={item.description}
            url={item.url}
          />
        ))
      ) : (
        <p>{`Loading...`}</p>
      )}
    </div>
  );
}
