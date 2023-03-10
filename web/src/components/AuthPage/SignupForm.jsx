import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signUp = () => {
    const user = {
      name: username,
      email,
      password
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
  };

  const validateForms = (e) => {
    e.preventDefault();

    signUp();

    navigate("/login");
  };

  return (
    <div className="signup-container">
      <form
        className="signup-form-container"
        action=""
        method="POST"
        onSubmit={validateForms}
      >
        <div className="form-input-container">
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-input-container">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-input-container">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit">Sign Up</button>
          <p className=" sub-heading">
            Already have an account?
            <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
