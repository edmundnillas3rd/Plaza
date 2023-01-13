import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewDisplay from "./ReviewDisplay";

export default function ItemDescription() {
  const [data, setData] = useState(null);

  const { id } = useParams();

  const getItemDescription = async () => {
    const response = await fetch(`${id}`);
    const data = await response.json();

    setData(data.result);
  };

  useEffect(() => {
    getItemDescription();
  }, []);

  return (
    <div className="item-description-container">
      {data ? (
        <>
          <div className="item-main-description">
            <p>Name: {data.item.name}</p>
            <p>Seller: {data.item.user.username}</p>
            <p>Price: {data.item.price}</p>
            <p>Stock: {data.item.stock}</p>
          </div>
          <ReviewDisplay reviews={data.reviews} />
        </>
      ) : null}
    </div>
  );
}
