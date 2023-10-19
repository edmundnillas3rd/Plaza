import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "../components/ItemCard";

export default function Filter() {
  const { category_id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/inventory/items/categories/${category_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setItems(data.items);
      });
  }, [category_id]);

  return (
    <div className="container padded-md">
      <div className="container column gap-half">
        <h3>{items && items[0]?.category.name}</h3>
        <div className="container mt gap-half">
            {items &&
              items.map((item, index) => (
                <ItemCard
                  key={index}
                  id={item.id}
                  name={item.name}
                  image={item.image.urls[0]}
                  category={item.category.name}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
