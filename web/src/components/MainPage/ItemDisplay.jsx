import ItemCard from "./ItemCard";

import image from "../../assets/boxes.jpg";

import Loader from "../Loader";

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

export default function ItemDisplay({ categories, items }) {
  return (
    <div className="item-display">
      {items !== null ? (
        <>
          <div className="hero-container">
            <p>Shop Computer, Furnitures, and Clothing</p>
            <div className="hero-img-container">
              <img src={image} alt="hero" />
            </div>
          </div>
          <div className="item-display-section container column">
            <CategorySection header="General" items={items} />
            <CategorySection header={categories[1].name} items={items} />
            <CategorySection header={categories[2].name} items={items} />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
