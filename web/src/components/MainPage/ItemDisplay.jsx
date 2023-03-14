import { useEffect, useState } from "react";

import ItemCard from "./ItemCard";

import image from "../../assets/boxes.jpg";

const CategorySection = ({ header, items }) => {
  return (
    <>
      <div className="item-category-header">
        <h3>{header}</h3>
      </div>
      <div className="item-lists-container">
        {items &&
          items.map((item, index) => {
            if (header === item.category.name || header === "General") {
              return (
                <ItemCard
                  key={index}
                  name={item.name}
                  price={item.price}
                  url={item.url}
                  rating={item.rating}
                  image={item.signedUrl}
                />
              );
            }

            return null;
          })}
      </div>
    </>
  );
};

export default function ItemDisplay() {
  const [data, setData] = useState(null);

  const getItems = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/inventory`);
    const data = await response.json();

    setData(data);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="item-display">
      <div className="hero-container">
        <p>Shop Computer, Furnitures, and Clothing</p>
        <div className="hero-img-container">
          <img src={image} alt="hero" />
        </div>
      </div>
      <div className="item-display-section">
        {data !== null && (
          <>
            <CategorySection header="General" items={data.items} />
            <CategorySection header="Computers" items={data.items} />
            <CategorySection header="Men's Fashion" items={data.items} />
          </>
        )}
      </div>
    </div>
  );
}
