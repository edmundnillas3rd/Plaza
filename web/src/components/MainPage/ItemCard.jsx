import { BsCardImage } from "react-icons/bs";
import { Link } from "react-router-dom";

const ItemCard = ({ name, description, url, image }) => {
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
        <div className="item-info">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
