import { Link } from "react-router-dom";

const ItemCard = ({ name, description, url }) => {
  return (
    <Link to={url}>
      <div className="item-card">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default ItemCard;
