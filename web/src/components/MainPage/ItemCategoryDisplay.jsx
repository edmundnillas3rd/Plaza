import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";

export default function ItemCategoryDisplay({ items }) {
  const { category_name, category_id } = useParams();

  useEffect(() => {
    console.log(category_name, category_id, items);
  }, []);

  return (
    <div className="item-category-container container">
      <h3>{category_name}</h3>
      <div className="item-category-list container">
        {items &&
          items.map((item, index) =>
            item.category.name === category_name ? (
              <ItemCard
                key={index}
                name={item.name}
                price={item.price}
                url={item.url}
                rating={item.rating}
                image={item.signedUrl}
              />
            ) : null
          )}
      </div>
    </div>
  );
}
