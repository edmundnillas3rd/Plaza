import { Link } from "react-router-dom";
import { StarRatings } from "./StarRatings";

const ItemCard = ({ name, price, url, rating, image, horizontal = false }) => {
  const currency = "P";

  return (
    <Link to={url}>
      <div className={`item-card container column ${horizontal && "horizontal"}`}>
        <div className="image-container">
          <img src={image} alt="item" />
        </div>
        <div className="item-info container column">
          <p className="product-name-container">{name}</p>
          <StarRatings rating={rating} />
          <p className="product-price-container">{`${currency} ${price}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
