import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Items from "../components/Items";

export default function Home() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const item_response = fetch(
      `${import.meta.env.VITE_BASE_URL}/inventory`
    ).then((response) => response.json());
    const category_response = fetch(
      `${import.meta.env.VITE_BASE_URL}/inventory/items/categories`
    ).then((response) => response.json());

    Promise.all([item_response, category_response]).then((response) => {
      const [item_data, category_data] = response;
      setItems(item_data.items);
      setCategories(category_data.categories);
    });
  }, []);

  return (
    <>
      <div className="banner-container">
        <div className="banner-content container column gap-md">
          <div className="container column gap-sm">
            <h1 className="banner-header">Plaza</h1>
            <p className="banner-paragraph">
              Discover the ultimate online shopping destination, offering a
              diverse selection of high-quality products for all your needs.
            </p>
          </div>
          <div className="banner-button">
            <button>Learn More</button>
          </div>
        </div>
      </div>
      <div className="category-section container column gap-sm pt">
        <h1>Shop our top categories</h1>
        <Categories categories={categories} />
      </div>
      <div className="items-section container column gap-sm">
        <h1>Todays Best Deals for you!</h1>
        <Items items={items} />
      </div>
    </>
  );
}
