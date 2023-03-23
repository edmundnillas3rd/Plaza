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
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }

    getCategories();
  }, []);

  const getCategories = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/inventory/items`
    );

    if (!response.ok) {
      console.log("categories not found!");
      return;
    }

    const data = await response.json();

    setCategories(data.categories);
  };

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

    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image);
    });

    const data = {
      seller: userID,
      name,
      price,
      description,
      stock,
      category
    };

    formData.append("itemData", JSON.stringify(data));

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/inventory/items`,
      {
        method: "POST",
        body: formData
      }
    );

    if (response.ok) {
      console.log("Item added successfully!");
    }

    navigate("/");
  };

  return (
    <div className="product-container">
      <form
        className="product-form-container"
        action=""
        method="POST"
        onSubmit={addItem}
        encType="multipart/form-data"
      >
        <p>Enter the information about the new item</p>
        <div className="form-input-container ">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-input-container ">
          <label htmlFor="stock">Stock: </label>
          <input
            type="text"
            name="stock"
            id="stock"
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="form-input-container ">
          <label htmlFor="price">Price: </label>
          <input
            type="text"
            name="price"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-input-container ">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-input-container">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={(e) => {
              console.log(e.target.value);
              setCategory(e.target.value);
            }}
          >
            <option value="">-- Please choose a category</option>
            {categories !== undefined &&
              categories.map((category, index) => (
                <option key={index} value={`${category.name}`}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className=" ">
          <label htmlFor="images">Image</label>
          <input
            type="file"
            multiple="multiple"
            accept="image/*"
            name="images"
            id="images"
            onChange={(e) => {
              setImages([...e.target.files]);
            }}
          />
        </div>
        <div className="image-display-container">
          {images.length !== 0
            ? images.map((image, index) => (
                <div className="product-image-container" key={index}>
                  <img src={`${URL.createObjectURL(image)}`} alt="item" />
                  <span
                    onClick={() => {
                      setImages([
                        ...images.slice(0, index),
                        ...images.slice(index + 1)
                      ]);
                    }}
                  >
                    &times;
                  </span>
                </div>
              ))
            : null}
        </div>
        <div className="button-container">
          <button>Add Item</button>
        </div>
      </form>
    </div>
  );
}
