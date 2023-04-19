import { BrowserRouter as Router } from "react-router-dom";

import "./style/styles.scss";
import Home from "./components/MainPage/Home";

function App() {
  return (
    <Router>
        <Home />
    </Router>
  );
}

export default App;
