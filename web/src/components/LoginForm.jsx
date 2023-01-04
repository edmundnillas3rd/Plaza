import { useState } from "react";

import { Link, Navigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const login = () => {
    const user = {
      email: email,
      password: password
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user !== undefined) {
          setUsername(data.user);
        } else {
          setValidationErrors([data.message]);
        }
      });
  };

  const validateForms = (e) => {
    e.preventDefault();

    login();
  };

  return (
    <div className="form-card form-container">
      {username && <Navigate to="/" replace={true} />}
      <form action="/login" method="POST">
        {validationErrors.map((err, i) => (
          <p className="login-error" key={i}>
            {err}
          </p>
        ))}
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
            Log In
          </button>
          <p className="form-container sub-heading">
            Don't have an account?
            <Link to="/sign-up">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}