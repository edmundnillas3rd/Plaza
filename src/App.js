import { useEffect, useState } from "react";
import ItemCards from "./components/ItemCards";

function App() {
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
    <div className="App">
      {items.length !== 0 &&
        items.map((item) => (
          <ItemCards title={item.title} description={item.description} />
        ))}
    </div>
  );
}

export default App;
