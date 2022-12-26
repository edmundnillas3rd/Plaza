import { useEffect, useState } from "react";

import ItemCard from "./ItemCard";

export default function ItemDisplay() {
  const [items, setItems] = useState([{}]);

  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => setItems(data.items));
  }, []);

  return (
    <div className="item-display">
      {items ? (
        items.map((item, i) => (
          <ItemCard
            key={i}
            title={item.title}
            description={item.description}
            url={"/item/" + item.id}
            id={item.id}
          />
        ))
      ) : (
        <p>{`Loading...`}</p>
      )}
    </div>
  );
}
