import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ItemDisplay from "./ItemDisplay";
import ItemDescription from "./ItemDescription";

export default function RouteLayout({ children }) {
  return (
    <Router>
      {children}
      <Routes>
        <Route exact path="/" element={<ItemDisplay />}></Route>
        <Route exact path="/item/:id" element={<ItemDescription />}></Route>
      </Routes>
    </Router>
  );
}
