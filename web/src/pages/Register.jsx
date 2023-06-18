import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../features/Profile/userSlice";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onUsernameChange = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setName(e.target.value);
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

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((user) => {
        if (!!user?.data) {

          fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user.data)
          })

          dispatch(setUser(user.data));
          navigate("/vendor");
        } else {
          setErrorMessage(user?.message);
        }
      });
  };

  return (
    <div
      className="register-page-container container reset-justify padded-md flex-end"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_23-2149014143.jpg?w=740&t=st=1686875341~exp=1686875941~hmac=435f371184d10b9d7d41b53281bf077d4a7d2f61ba737f35dca7979d42197155)"
      }}
    >
      <div className="register-form-container container reset-justfiy column section padded-md">
        <h2 className="mb">Register</h2>
        {errorMessage && (
          <p className="error-message-container mb">{errorMessage}</p>
        )}
        <form onSubmit={onSubmitHandler} method="POST">
          <div className="register-input-container container column gap-half width-100 justify-reset">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Username"
              onChange={onUsernameChange}
            />
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
            <button type="submit">Register</button>
          </div>
        </form>
        <div className="container mt reset-justify align gap-sm">
          <p className="opacity-65">Already Registered?</p>
          <Link to="/auth">Login Here</Link>
        </div>
      </div>
    </div>
  );
}
