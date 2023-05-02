import ItemCard from "./ItemCard";

import image from "../../assets/boxes.jpg";

const CategorySection = ({ header, items }) => {
  return (
    <div className="category-section container column">
      <div className="item-category-header">
        <h3>{header}</h3>
      </div>
      <div className="item-lists-container container">
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
    </div>
  );
};

export default function ItemDisplay({ items }) {
  return (
    <div className="item-display">
      <div className="hero-container">
        <p>Shop Computer, Furnitures, and Clothing</p>
        <div className="hero-img-container">
          <img src={image} alt="hero" />
        </div>
      </div>
      <div className="item-display-section container column">
        {items !== null && (
          <>
            <CategorySection header="General" items={items} />
            <CategorySection header="Computers" items={items} />
            <CategorySection header="Men's Fashion" items={items} />
          </>
        )}
      </div>
    </div>
  );
}
