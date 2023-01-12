import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { user as auth } from "../features/profile/userSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const isLogin = useSelector((state) => state.user.isLogin);

  const dispatch = useDispatch();

  const login = async () => {
    const user = {
      email,
      password
    };

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(user)
    });
    const data = await response.json();

    if (data.user !== undefined) {
      dispatch(auth.setID(data.id));
      dispatch(auth.setUser(data.user));
      dispatch(auth.login());
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      setValidationErrors([data.message]);
    }
  };

  const validateForms = (e) => {
    e.preventDefault();

    login();
  };

  if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="form-card form-container">
      <form action="" method="POST" onSubmit={validateForms}>
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
          <button type="submit">Log In</button>
          <p className="form-container sub-heading">
            Don't have an account?
            <Link to="/sign-up">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
