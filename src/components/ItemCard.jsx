const ItemCard = ({ title, description, props }) => {
  return (
    <div className="item-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ItemCard;
