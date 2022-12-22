import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

export default function ItemDisplay() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([
      {
        title: "Item 1",
        description: "A ballpen",
      },
      {
        title: "Item 2",
        description: "An erasure",
      },
      {
        title: "Item 3",
        description: "A bond paper",
      },
      {
        title: "Gameboy Advance",
        description: "A GBA SP for collectors",
      },
    ]);
  }, []);
  return (
    <div className="item-display">
      {items.length !== 0 &&
        items.map((item) => (
          <ItemCard title={item.title} description={item.description} />
        ))}
    </div>
  );
}
