import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function CategoryItem({ id, name, imageUrl }) {
  return (
    <Link to={`/products/item/category/${id}`}>
      <div
        className="category-item container column center-content"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      >
        <div className="header-category">
          <h3>{name}</h3>
        </div>
      </div>
    </Link>
  );
}

export default function Categories({ categories }) {
  return (
    <div className="category-list-container container space-around gap-sm">
      {categories &&
        categories.map((category, index) => (
          <CategoryItem
            key={index}
            id={category?._id}
            name={category?.name}
            imageUrl={category?.imageUrl}
          />
        ))}
    </div>
  );
}
