import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.user.username);
  const navigate = useNavigate();

  const isUserLogin = (e) => {
    if (user.length === 0) navigate("/auth");
  };

  return (
    <button
      className="profile-container container reset-justify align gap-half padded-sm"
      onClick={isUserLogin}
    >
      <MdOutlineAccountCircle size={24} />
      <p>Account</p>
    </button>
  );
}
