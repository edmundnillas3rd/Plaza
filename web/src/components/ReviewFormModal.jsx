import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import StarRating from "./StarRating";

export default function ReviewFormModal({ callbackFn }) {
  const { id } = useParams();

  const user = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const review = {
      reviewer: user,
      description,
      rating
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/inventory/items/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(review)
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        navigate("/");
      });
  };

  return (
    <div className="review-form-modal container column padded-md">
      <div className="container space-between flex align mb-sm">
        <h3>Review Form</h3>
        <button className="button-white-theme" onClick={callbackFn}>
          &times;
        </button>
      </div>
      <form
        className="container column gap-half"
        method="POST"
        onSubmit={onSubmitHandler}
      >
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Write a description about the received product"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <div className="container align gap-half">
          <p className="opacity-65">Rating</p>
          <StarRating
            callbackFn={(value) => {
              setRating(value);
            }}
          />
        </div>
        <button className="button-orange-theme" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
