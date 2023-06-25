import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { reset } from "../../features/Cart/cartSlice";

export default function ModalPopup({ callbackFn }) {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.id);
  const cart = useSelector((state) => state.cart.contents);

  const [errorMessage, setErrorMessage] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (paymentAmount < totalAmount) {
      setErrorMessage([
        "Insufficient Amount, Please provide the proper amount!"
      ]);
      return;
    }

    console.log(typeof cart);

    const userData = {
      user: id,
      orders: cart
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/orders/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    localStorage.removeItem("cart");
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="popup-modal-checkout-container container center-content">
      <div className="modal-content container column">
        {errorMessage &&
          errorMessage.map((error, index) => (
            <p className="brand-orange" key={index}>
              {error}
            </p>
          ))}
        <header className="container column gap-half">
          <h1>Checkout</h1>
          <h3>Total Amount: {totalAmount}</h3>
        </header>

        <form
          method="POST"
          className="container gap-half align"
          onSubmit={onSubmitHandler}
        >
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            onChange={(e) => {
              setPaymentAmount(e.target.value);
            }}
          />
          <button className="button-orange-theme" type="submit">
            Submit
          </button>
          <button className="button-white-theme" onClick={callbackFn}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
