import { Link } from "react-router-dom";

export default function Vendor() {
  return (
    <div
      className="vendor-page-container container padded-md"
      
    >
      <div className="vendor-register-prompt section container reset-justify center-content column gap-sm">
        <h1>Start Selling by Registering Yourself as a Vendor</h1>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
