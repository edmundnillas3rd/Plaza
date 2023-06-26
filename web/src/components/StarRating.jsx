import { useEffect, useState } from "react";

const RatingDisplay = ({ off = false }) => {
  return (
    <button className={`${!off ? "on" : "off no-hover"}`}>
      <span className="star">&#9733;</span>
    </button>
  );
};

export default function StarRating({ readOnly = null, value, callbackFn }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setRating(!!readOnly && value);
  }, []);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return readOnly ? (
          <RatingDisplay
            key={i}
            index={i}
            rating={ratingValue}
            off={i > value - 1}
          />
        ) : (
          <button
            key={i}
            className={ratingValue <= (hover || rating) ? "on" : "off"}
            onClick={() => {
              callbackFn(ratingValue);
              setRating(ratingValue);
            }}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}
