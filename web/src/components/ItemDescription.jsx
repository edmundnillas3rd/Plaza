import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ReviewDisplay = ({ data }) => {
  return (
    <div className="review-container">
      <h3>Reviews:</h3>
      {data.reviews.map((review, i) => (
        <div className="review-card" key={i}>
          <div className="header">
            <p>{review.user.name}</p>
            <p>{review.rating}</p>
          </div>
          <p>{review.description}</p>
        </div>
      ))}
    </div>
  );
};

export default function ItemDescription() {
  const [data, setData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${id}`)
      .then((res) => res.json())
      .then((data) => setData(data.result));
  }, [id]);

  return (
    <div className="item-description-container">
      {data ? (
        <>
          <div className="item-main-description">
            <p>Name: {data.item.name}</p>
            <p>Owner: {data.item.user.name}</p>
            <p>Price: {data.item.price}</p>
            <p>Stock: {data.item.stock}</p>
          </div>
          <ReviewDisplay data={data} />
        </>
      ) : null}
    </div>
  );
}
