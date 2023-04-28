import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function ReviewForm() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  const userID = useSelector((state) => state.user.id);
  const login = useSelector((state) => state.user.isLogin);

  const [review, setReview] = useState(null);

  const addReview = async (e) => {
    e.preventDefault();

    if (!login) {
      navigate("/login");
    }

    setReview({
      user: userID,
      description,
      rating
    });

    fetch(`${process.env.REACT_APP_BASE_URL}/inventory/items/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(review)
    });
  };

  return (
    <div className="container review-form-container">
      <form action="" method="POST" onSubmit={addReview}>
        <div className="review-detail-container">
          <label htmlFor="description">Add a review for this item</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="container review-form-rating">
          <input
            type="radio"
            name="rating"
            id="5"
            value="5"
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <label htmlFor="5"></label>
          <input
            type="radio"
            name="rating"
            id="4"
            value="4"
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <label htmlFor="4"></label>
          <input
            type="radio"
            name="rating"
            id="3"
            value="3"
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <label htmlFor="3"></label>
          <input
            type="radio"
            name="rating"
            id="2"
            value="2"
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <label htmlFor="2"></label>
          <input
            type="radio"
            name="rating"
            id="1"
            value="1"
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <label htmlFor="1"></label>
        </div>
        <div className="submit-button-container">
          <button type="submit" className="submit-review-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
