import ReviewForm from "./ReviewForm";
import { StarRatings } from "../StarRatings";

export default function ReviewDisplay({ reviews }) {
  return (
    <div className="container review-container">
      <ReviewForm />
      <h3>Reviews:</h3>
      {reviews.map((review, i) => (
        <div className="review-card" key={i}>
          <div className="header">
            <p>{review.user.name}</p>
            <StarRatings rating={review.rating} />
          </div>
          <p className="review-description">{review.description}</p>
        </div>
      ))}
    </div>
  );
}
