import { useState } from "react";
import { useSelector } from "react-redux";

export default function SellItem() {
  const userID = useSelector((state) => state.user.id);
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);

  const addItem = (e) => {
    e.preventDefault();

    setData({
      id: userID,
      name: name,
      price: price,
      description: description,
      stock: stock
    });

    fetch(`${process.env.REACT_APP_BASE_URL}/inventory/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data)
    }).then((res) => res.json());
  };

  return (
    <div className="container form-container form-card">
      <form
        action={`${process.env.REACT_APP_BASE_URL}/inventory/items`}
        method="post"
      >
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
