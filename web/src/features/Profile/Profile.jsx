import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { MdOutlineAccountCircle } from "react-icons/md";

import { setUser, resetUser } from "../Profile/userSlice";

export default function Profile() {
  const user = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.user.token);

  const [show, setShow] = useState(false);
  const inputRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!!userData) dispatch(setUser(userData));
  }, []);

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
    <div className="dropdown container align column">
      <button
        className="profile-container dropbtn container align gap-half padded-sm"
        ref={inputRef}
        onClick={onInputClick}
      >
        <MdOutlineAccountCircle size={24} />
        {!!user ? user : "Account"}
      </button>

      {show && (
        <div className="dropdown-content container  column">
          <button onClick={onLogoutHandler}>Logout</button>
        </div>
      )}
    </div>
  );
}
