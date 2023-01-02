import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState(null);

  const signUp = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/user/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  const validateForms = (e) => {
    e.preventDefault();

    signUp();

    console.log(`Value of data is: ${data}`);
  };

  return (
    <div className="login-card form-container">
      <form action="" method="POST">
        <div className="form-container">
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-container">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-container">
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
        </div>
      </form>
    </div>
  );
}
