import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ItemDescription() {
  const [item, setItem] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data.result.item));
  }, [id]);

  return (
    <div className="item-description-container">
      {item ? (
        <div>
          <p>Name: {item.name}</p>
          <p>Owner: {item.owner.name}</p>
          <p>Price: {item.price}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
