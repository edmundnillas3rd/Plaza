import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ItemCard from "../components/ItemCard";

export default function Search() {
  const { item_name } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${import.meta.env.VITE_BASE_URL}/inventory/items/search/${item_name}`
    )
      .then((response) => response.json())
      .then((data) => {
        setItems(data.items);
        setLoading(false);
      });
  }, [item_name]);

  return (
    <div className="search-page-container container padded-md">
      <div className="section container column gap-md">
        <h3>
          Search results for `
          <span className="brand-orange">
            <i>{item_name}</i>
          </span>
          `
        </h3>
        {!loading && items.length === 0 && (<div>No Items found</div>)}
        {!loading && items.length !== 0 && (
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
          ))
        )}
      </div>
    </div>
  );
}
