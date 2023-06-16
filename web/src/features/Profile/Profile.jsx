import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { resetUser } from "../Profile/userSlice";
import { useState } from "react";

export default function Profile() {
  const user = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.user.token);

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserLogin = () => {
    if (!!!user) {
      navigate("/auth");
      return;
    }
    setShow(!show);
  };

  const onLogoutHandler = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(resetUser());
    setShow(false);
    localStorage.clear();
  };

  return (
    <div className="dropdown container reset-justfiy column">
      <button
        className="profile-container dropbtn container reset-justify align gap-half padded-sm"
        onClick={isUserLogin}
      >
        <MdOutlineAccountCircle size={24} />
        <p>{!!user ? user : "Account"}</p>
      </button>

      {show && (
        <div className="dropdown-content container reset-justify column">
          <button onClick={onLogoutHandler}>Logout</button>
        </div>
      )}
    </div>
  );
}
