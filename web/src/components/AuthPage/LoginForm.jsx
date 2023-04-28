import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { user as auth } from "../../features/profile/userSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const isLogin = useSelector((state) => state.user.isLogin);

  const navigate = useNavigate();
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
    navigate("/");
  }

  return (
    <div className="form-container">
      <form
        className="input-form-container"
        action=""
        method="POST"
        onSubmit={validateForms}
      >
        {validationErrors.map((err, i) => (
          <p className="login-error" key={i}>
            {err}
          </p>
        ))}
        <div className="form-input-container">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setValidationErrors([]);
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-input-container">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setValidationErrors([]);
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="button-container ">
          <button type="submit">Log In</button>
          <div className="sub-heading">
            <p>Don't have an account?</p>
            <Link to="/signup">Register here</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
