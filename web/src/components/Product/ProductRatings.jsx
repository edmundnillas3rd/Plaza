import StarRating from "../StarRating";

export default function ProductRatings({ reviews }) {
  return (
    <div className="reviews-container mb">
      {reviews &&
        reviews.map((review, index) => (
          <div key={index} className="review-card mb">
            <p>{review.user.name}</p>
            <StarRating readOnly value={review.rating} />
            <p className="mt">{review.description}</p>
            <hr className="mt-sm opacity-20" />
          </div>
        ))}
    </div>
  );
}
