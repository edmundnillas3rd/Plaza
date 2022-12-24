import { Link } from "react-router-dom";

const ItemCard = ({ title, description, url, id, props }) => {
  return (
    <div className="item-card" key={id}>
      <Link to={url}>
        <h3>{title}</h3>
      </Link>
      <p>{description}</p>
    </div>
  );
};

export default ItemCard;
