import ReviewForm from "./ReviewForm";

export default function ReviewDisplay({ reviews }) {
  return (
    <div className="review-container">
      <ReviewForm />
      <h3>Reviews:</h3>
      {reviews.map((review, i) => (
        <div className="review-card" key={i}>
          <div className="header">
            <p>{review.user.username}</p>
            <p>{review.rating}</p>
          </div>
          <p>{review.description}</p>
        </div>
      ))}
    </div>
  );
}