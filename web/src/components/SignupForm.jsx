import { Link } from "react-router-dom";

import { useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState(null);

  const signUp = () => {
    const user = {
      username: username,
      email: email,
      password: password
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  const validateForms = (e) => {
    e.preventDefault();

    signUp();

    console.log(data);
  };

  return (
    <div className="form-card form-container">
      <form action="" method="POST">
        <div className="form-container label-container">
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-container label-container">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-container label-container">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container form-container">
          <button type="submit" onClick={validateForms}>
            Sign Up
          </button>
          <p className="form-container sub-heading">
            Already have an account?
            <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
