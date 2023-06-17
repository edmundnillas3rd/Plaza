import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { resetUser } from "../Profile/userSlice";
import { useRef, useState } from "react";
import { useEffect } from "react";

export default function Profile() {
  const user = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.user.token);

  const [show, setShow] = useState(false);
  const inputRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const onInputClick = (e) => {
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
        ref={inputRef}
        onClick={onInputClick}
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
