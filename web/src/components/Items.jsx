import { useEffect, useState } from "react";

import ItemCard from "./ItemCard";

export default function Items({ items }) {
  return (
    <div className="items-list-container">
      {items &&
        items.map((item, index) => (
          <ItemCard
            key={index}
            id={item._id}
            name={item.name}
            image={item.image.urls[0]}
            category={item.category.name}
            price={item.price}
            rating={item.rating}
          />
        ))}
    </div>
  );
}
