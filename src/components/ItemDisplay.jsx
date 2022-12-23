import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

export default function ItemDisplay() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([
      {
        title: "Item 1",
        description: "A ballpen",
        id: 1,
      },
      {
        title: "Item 2",
        description: "An erasure",
        id: 23,
      },
      {
        title: "Item 3",
        description: "A bond paper",
        id: 55,
      },
      {
        title: "Gameboy Advance",
        description: "A GBA SP for collectors",
        id: 1132,
      },
    ]);
  }, []);

  return (
    <div className="item-display">
      {items.length !== 0 &&
        items.map((item) => (
          <ItemCard
            title={item.title}
            description={item.description}
            url={"/item/" + item.id}
            id={item.id}
          />
        ))}
    </div>
  );
}
