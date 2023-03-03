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
  const [rating, setRating] = useState(0);

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
      rating
    };

    formData.append("itemData", JSON.stringify(data));
    // formData.append("itemData", data);

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
    <div className=" ">
      <form
        className=""
        action=""
        method="POST"
        onSubmit={addItem}
        encType="multipart/form-data"
      >
        <p>Enter the information about the new item</p>
        <div className=" ">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className=" ">
          <label htmlFor="stock">Stock: </label>
          <input
            type="text"
            name="stock"
            id="stock"
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className=" ">
          <label htmlFor="price">Price: </label>
          <input
            type="text"
            name="price"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className=" ">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="">
          <label htmlFor="rating">Rating</label>
          <input
            name="rating"
            id="rating"
            type="text"
            min="1"
            max="5"
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
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
        <div className="">
          <output>
            {images.length !== 0
              ? images.map((image, index) => (
                  <div className="image" key={index}>
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
          </output>
        </div>
        <button>Add Item</button>
      </form>
    </div>
  );
}
