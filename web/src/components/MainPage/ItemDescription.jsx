import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReviewDisplay from "./ReviewDisplay";
import { cart } from "../../features/cart/cartSlice";

export default function ItemDescription() {
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const isLogin = useSelector((state) => state.user.isLogin);
  const items = useSelector((state) => state.cart.items);

  const { id } = useParams();
  const dispatch = useDispatch();

  const getItemDescription = async () => {
    const response = await fetch(`${id}`);
    const data = await response.json();

    setData(data.result);
  };

  const addToCart = (e) => {
    const item = {
      id,
      name: data.item.name,
      description: data.item.description,
      url: data.item.url,
      quantity: Number.parseInt(quantity)
    };

    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      foundUser.items = [...items, item];
      localStorage.setItem("user", JSON.stringify(foundUser));
    }

    dispatch(cart.setItem(item));
  };

  useEffect(() => {
    getItemDescription();
    console.log(items);
  }, []);

  return (
    <div className="item-description-container">
      {data && (
        <>
          <div className="item-main-description">
            <p>Name: {data.item.name}</p>
            <p>Seller: {data.item.user.username}</p>
            <p>Price: {data.item.price}</p>
            <p>Stock: {data.item.stock}</p>
          </div>

          {isLogin && (
            <>
              <input
                type="text"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button onClick={addToCart}>Add to Cart</button>
            </>
          )}
          <ReviewDisplay reviews={data.reviews} />
        </>
      )}
    </div>
  );
}
