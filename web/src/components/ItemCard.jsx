import StarRating from "./StarRating";

export default function ItemCard({ id, name, image, price, rating }) {
  return (
    <a href={`/products/item/${id}`}>
      <div className="item-card container column">
        <div className="img-container">
          <img src={image} alt={name} />
        </div>
        <div className="product-description container column gap-half">
          <div className="product-name">{name}</div>
          <div className="product-pricetag brand-orange">{price}</div>
          <StarRating readOnly value={rating} />
        </div>
      </div>
    </a>
  );
}
