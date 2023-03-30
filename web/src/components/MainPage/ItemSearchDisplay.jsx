import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";

export default function ItemSearchDisplay() {
  const [items, setItems] = useState(null);
  const { item_name } = useParams();

  const getSearchedItems = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/inventory/items/search/${item_name}`
    );
    const data = await response.json();

    setItems(data.items);
  };

  useEffect(() => {
    getSearchedItems();

    console.log(items);
  }, []);

  return (
    <div>
      {items &&
        items.map((item) => (
          <ItemCard
            name={item.name}
            image={item.signedUrl}
            price={item.price}
            rating={item.rating}
            url={item.url}
          />
        ))}
    </div>
  );
}
