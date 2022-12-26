import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ItemDisplay from "./components/ItemDisplay";
import ItemDescription from "./components/ItemDescription";
import "../src/style/styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<ItemDisplay />}></Route>
          <Route exact path="/item/:id" element={<ItemDescription />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
