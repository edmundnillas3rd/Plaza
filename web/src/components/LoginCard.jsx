export default function LoginCard() {
  return (
    <div className="login-card container">
      <form action="/login-form" method="POST">
        <div className="container space-btwn">
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="container space-btwn">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="button-container container">
          <button type="submit">Login</button>
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
