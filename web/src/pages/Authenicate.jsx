import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setUser } from "../features/Profile/userSlice";

export default function Authenticate() {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    const user = {
      email,
      password
    };

    e.preventDefault();
    fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then((response) => response.json())
      .then((data) => {
        if (!!data?.message) {
          setErrorMessage(data.message);
          return;
        }

        dispatch(setUser(data.user));
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      });
  };

  const onEmailChange = (e) => {
    e.preventDefault();

    setErrorMessage("");
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    e.preventDefault();

    setErrorMessage("");
    setPassword(e.target.value);
  };

  return (
    <div
      className="authenticate-page-container container reset-justify padded-md flex-end"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_23-2149014143.jpg?w=740&t=st=1686875341~exp=1686875941~hmac=435f371184d10b9d7d41b53281bf077d4a7d2f61ba737f35dca7979d42197155)"
      }}
    >
      <div className="authentication-form-container container reset-justfiy column section padded-md">
        <h2 className="mb">Login</h2>
        {errorMessage && (
          <p className="error-message-container mb">{errorMessage}</p>
        )}
        <form className="flex gap-md" onSubmit={onSubmitHandler} method="POST">
          <div className="authenticate-input-container container column gap-half width-100 justify-reset">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={onEmailChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={onPasswordChange}
            />
            <button type="submit">Log In</button>
          </div>
          <div className="container mt reset-justify align gap-sm">
            <p className="opacity-65">New to Plaza?</p>
            <Link to="/register">Register Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
