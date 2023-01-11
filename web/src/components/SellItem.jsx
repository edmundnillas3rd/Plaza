import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SellItem() {
  const navigate = useNavigate();
  const userID = useSelector((state) => state.user.id);
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const addItem = (e) => {
    e.preventDefault();

    if (
      name.length === 0 ||
      price.length === 0 ||
      description.length === 0 ||
      stock.length === 0
    ) {
      return;
    }

    setData({
      id: userID,
      name: name,
      price: price,
      description: description,
      stock: stock
    });

    fetch(`${process.env.REACT_APP_BASE_URL}/inventory/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/");
      });
  };
  return (
    <div className="container form-container form-card">
      <form action="/sell" method="POST">
        <p>Enter the information about the new item</p>
        <div className="form-container label-container">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-container label-container">
          <label htmlFor="stock">Stock: </label>
          <input
            type="text"
            name="stock"
            id="stock"
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className="form-container label-container">
          <label htmlFor="price">Price: </label>
          <input
            type="text"
            name="price"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

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

        <button onClick={addItem}>Add Item</button>
      </form>
    </div>
  );
}
