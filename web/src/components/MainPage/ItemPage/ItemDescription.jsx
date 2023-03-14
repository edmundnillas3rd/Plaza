import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LeftDescriptionPanel from "./LeftDescriptionPanel";
import ReviewDisplay from "./ReviewDisplay";
import RightDescriptionPanel from "./RightDescriptionPanel";

export default function ItemDescription() {
  const [data, setData] = useState(null);
  const items = useSelector((state) => state.cart.items);

  const { id } = useParams();

  const getItemDescription = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/inventory/items/${id}`
    );
    const data = await response.json();

    setData(data);
  };

  useEffect(() => {
    getItemDescription();
  }, []);

  return (
    <div className="item-description-container container column">
      {data && (
        <>
          <div className="top-container">
            <LeftDescriptionPanel data={data} />
            <RightDescriptionPanel data={data} />
          </div>
          <div className="item-main-description">
            <h3>Description:</h3>
            <p>&emsp;&emsp;{data.item.description}</p>
          </div>

          <ReviewDisplay reviews={data.reviews} />
        </>
      )}
    </div>
  );
}
