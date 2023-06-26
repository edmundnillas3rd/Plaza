import StarRating from "./StarRating";

export default function ItemCard({ id, name, image, price, rating }) {
  return (
    <a href={`/products/item/${id}`}>
      <div className="item-card container column">
        <img src={image} alt={name} />
        <div className="product-description container column gap-half">
          <div className="product-name">{name}</div>
          <div className="product-pricetag brand-orange">{price}</div>
          <StarRating readOnly ratingValue={rating} />
        </div>
      </div>
    </a>
  );
}
