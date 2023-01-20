import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SellItem() {
  const navigate = useNavigate();

  const userID = useSelector((state) => state.user.id);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  const addItem = async (e) => {
    e.preventDefault();

    if (
      name.length === 0 ||
      price.length === 0 ||
      description.length === 0 ||
      stock.length === 0
    ) {
      return;
    }

    const data = {
      id: userID,
      name,
      price,
      description,
      stock
    };

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/inventory/items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      }
    );

    if (response.ok) {
      console.log("Item add successfully");
    }

    navigate("/");
  };

  return (
    <div className="container form-container form-card">
      <form action="" method="POST" onSubmit={addItem}>
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

        <div className="form-container label-container">
          <label htmlFor="item-image">Image</label>
          <input
            type="file"
            multiple="multiple"
            accept="image/jpeg, image/png, image/jpg"
            name="item-image"
            id="item-image"
            onChange={(e) => {
              setImages([...e.target.files]);
            }}
          />
        </div>

        <div className="form-container">
          <output>
            {images.length !== 0 &&
              images.map((image, index) => (
                <div className="image" key={index}>
                  <img src={`${URL.createObjectURL(image)}`} alt="item" />
                </div>
              ))}
          </output>
        </div>

        <button>Add Item</button>
      </form>
    </div>
  );
}
