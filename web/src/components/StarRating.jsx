import { useEffect, useState } from "react";

const RatingDisplay = ({ index, off = false }) => {
  return (
    <button key={index} className={`${ !off ? "on" : "off no-hover"}`}>
      <span className="star">&#9733;</span>
    </button>
  );
};

const Rating = ({ index, count }) => {
  const [hover, setHover] = useState(0);

  return (
    <button
      key={index}
      className={index <= (hover || count) ? "on" : "off"}
      onClick={() => {
        setRating(index);
      }}
      onMouseEnter={() => setHover(index)}
      onMoustLeave={() => setHover(count)}
    >
      <span className="star">&#9733;</span>
    </button>
  );
};

export default function StarRating({ readOnly = false, ratingValue }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(!!readOnly && ratingValue);
  }, []);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return readOnly ? (
          <RatingDisplay index={index} rating={rating} off={index > ratingValue}/>
        ) : (
          <Rating index={index} rating={rating} />
        );
      })}
    </div>
  );
}
