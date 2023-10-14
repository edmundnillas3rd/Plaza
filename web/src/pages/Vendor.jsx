import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Vendor() {
  const user = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const [categories, setCategories] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/inventory/items/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const itemData = {
      seller: userId,
      name,
      price,
      description,
      stock,
      category
    };

    images.forEach((image) => formData.append("images", image));
    formData.append("itemData", JSON.stringify(itemData));

    fetch(`${import.meta.env.VITE_BASE_URL}/inventory/items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: "include",
      body: formData
    }).then((response) => {
      if (response.ok) navigate("/");
    });
  };

  return (
    <div className="vendor-page-container container space-around padded-md">
      {!!!user ? (
        <div className="vendor-register-prompt section container center-content column gap-sm">
          <h1>Start Selling by Registering Yourself as a Vendor</h1>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div className="section container column">
          <h3 className="mb">Sell New Product</h3>
          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={onSubmitHandler}
          >
            <div className="form-input-container grid gap-half">
              <div className="container column gap-half">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name of product"
                  onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="container column gap-half">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  inputMode="decimal"
                  name="price"
                  id="price"
                  placeholder="Price"
                  pattern="\d+"
                  onChange={(e) => {
                    e.preventDefault();
                    setPrice(parseInt(e.target.value));
                  }}
                />
              </div>
              <div className="container column gap-half">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  min={0}
                  name="stock"
                  id="stock"
                  placeholder="Stock"
                  onChange={(e) => {
                    e.preventDefault();
                    setStock(e.target.value);
                  }}
                />
              </div>
              <div className="container column gap-half">
                <label htmlFor="categories">Category</label>
                <select
                  name="categories"
                  id="categories"
                  onChange={(e) => {
                    e.preventDefault();
                    setCategory(e.target.value);
                  }}
                >
                  <option value="">-- Choose Your Category --</option>
                  {!!categories &&
                    categories.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="container column gap-half">
                <label htmlFor="images">Images</label>
                <input
                  type="file"
                  accept="image/*"
                  name="images"
                  id="images"
                  multiple
                  onChange={(e) => {
                    e.preventDefault();
                    setImages(Array.from(e.target.files));
                  }}
                />
                <div className="image-preview-container container align padded-sm gap-half">
                  {!!images &&
                    images.map((image, index) => (
                      <div className="image-container">
                        <img src={URL.createObjectURL(image)} />
                        <span
                          onClick={(e) => {
                            setImages([
                              ...images.slice(0, index),
                              ...images.slice(index + 1)
                            ]);
                          }}
                        >
                          &times;
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="container column gap-half">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="descrition"
                  cols="30"
                  rows="10"
                  onChange={(e) => {
                    e.preventDefault();
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-input-container">
              <button className="mt" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
