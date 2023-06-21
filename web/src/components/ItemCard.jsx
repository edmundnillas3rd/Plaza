import StarRating from "./StarRating";

export default function ItemCard({ id, name, image, price, rating }) {
  return (
    <a href={`/products/item/${id}`}>
      <div className="item-card container column">
        <img src={image} alt={name} />
        <div className="product-description">
          <div className="container">
            <h3 className="product-name">{name}</h3>
            <p className="product-pricetag">{price}</p>
          </div>
          <StarRating readOnly ratingValue={rating} />
        </div>
      </div>
    </a>
  );
}
