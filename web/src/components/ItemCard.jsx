import { Link } from "react-router-dom";

const ItemCard = ({ title, description, url, id, props }) => {
  return (
    <Link to={url}>
      <div className="item-card" key={id}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default ItemCard;
