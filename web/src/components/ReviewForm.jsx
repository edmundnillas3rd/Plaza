import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ReviewForm({ item }) {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  const userID = useSelector((state) => state.user.id);

  const addReview = (e) => {
    e.preventDefault();

    const review = {
      user: userID,
      item: item._id,
      description: description,
      rating: rating
    };

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
    <div className="container form-container form-card">
      <form action="" method="POST">
        <div className="form-container label-container">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-container container">
          <div className="form-container combo-container">
            <label htmlFor="5">5</label>
            <input
              type="radio"
              name="rating"
              id="5"
              value="5"
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </div>

          <div className="form-container combo-container">
            <label htmlFor="4">4</label>
            <input
              type="radio"
              name="rating"
              id="4"
              value="4"
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </div>

          <div className="form-container combo-container">
            <label htmlFor="3">3</label>
            <input
              type="radio"
              name="rating"
              id="3"
              value="3"
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </div>

          <div className="form-container combo-container">
            <label htmlFor="2">2</label>
            <input
              type="radio"
              name="rating"
              id="2"
              value="2"
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </div>

          <div className="form-container combo-container">
            <label htmlFor="1">1</label>
            <input
              type="radio"
              name="rating"
              id="1"
              value="1"
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </div>
        </div>

        <button type="submit" onClick={addReview}>
          Submit
        </button>
      </form>
    </div>
  );
}
