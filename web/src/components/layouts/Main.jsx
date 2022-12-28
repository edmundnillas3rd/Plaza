import { Link } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

import ItemDisplay from "../ItemDisplay";
import ItemDescription from "../ItemDescription";

export default function Main({ children }) {
  return (
    <>
      <header>
        <nav className="links-container">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route exact path="/" element={<ItemDisplay />}>
            Home
          </Route>
          <Route exact path="/item/:id" element={<ItemDescription />}></Route>
        </Routes>
      </main>
    </>
  );
}
