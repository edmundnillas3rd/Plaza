import { useEffect } from "react";
import { BsCardImage } from "react-icons/bs";
import { Link } from "react-router-dom";

const StarRatings = ({ rating }) => {
  const ratings = [];

  for (let i = 0; i < rating; i++) {
    ratings.push(<div className="star-ratings-container" key={i}></div>);
  }

  return <div className="ratings-container">{ratings}</div>;
};

const ItemCard = ({ name, price, url, rating, image }) => {
  const currency = "P";

  useEffect(() => {
    console.log(rating);
  }, []);

  return (
    <Link to={url}>
      <div className="item-card">
        <div className="image-container">
          {image !== undefined ? (
            <img src={image} alt="item" />
          ) : (
            <BsCardImage />
          )}
        </div>
        <div className="item-info container">
          <p className="product-name-container">{name}</p>
          <StarRatings rating={rating} />
          <p className="product-price-container">{`${currency} ${price}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
