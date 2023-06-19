import { useEffect } from "react";
import { useState } from "react";

function CategoryItem({ id, name, imageUrl }) {
  return (
    <a href={`/items/categories/${id}`}>
      <div className="category-item container column center-content" style={{
        backgroundImage: `url(${imageUrl})`
      }}>
        <div className="header-category">
          <h3>{name}</h3>
        </div>
      </div>
    </a>
  );
}

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/inventory/items/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      });
  }, []);

  return (
    <div className="category-list-container container space-around gap-sm">
      {categories &&
        categories.map((category, index) => (
          <CategoryItem
            key={index}
            name={category?.name}
            imageUrl={category?.imageUrl}
          />
        ))}
    </div>
  );
}
