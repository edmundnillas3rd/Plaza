import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";

const SearchedItems = ({items}) => {
  return items !== null ? (
    items.map((item, index) => (
      <ItemCard
        key={index}
        name={item.name}
        image={item.signedUrl}
        price={item.price}
        rating={item.rating}
        url={`/inventory/items/${item._id}`}
        horizontal
      />
    ))
  ) : (
    <>
      <p>There are no items that match your search</p>
      <div className="img-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/619/619015.png"
          alt="desert-icon"
        />
      </div>
    </>
  );
};

export default function ItemSearchDisplay() {
  const { item_name } = useParams();

  const [items, setItems] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const getSearchedItems = async () => {
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/inventory/items/search/${item_name}`
    );
    const data = await response.json();

    setItems(data.items);
    setLoading(false);
  };

  useEffect(() => {
    getSearchedItems();

  }, [item_name]);

  return (
    <div className="item-search-display-container container column">
      {isLoading ? "Loading..." : <SearchedItems items={items} />}
    </div>
  );
}
