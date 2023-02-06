import { BsCardImage } from "react-icons/bs";
import { Link } from "react-router-dom";

const ItemCard = ({ name, description, price, url, image }) => {
  const currency = "P";
  return (
    <div className="item-card">
      <Link to={url}>
        <div className="image-container">
          {image !== undefined ? (
            <img src={image} alt="item" />
          ) : (
            <BsCardImage />
          )}
        </div>
        <div className="item-info">
          <h3>{name}</h3>
          <p>{description}</p>
          <h3>{`${currency} ${price}`}</h3>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
