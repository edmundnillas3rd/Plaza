import { BrowserRouter as Router } from "react-router-dom";
import { IconContext } from "react-icons";

import "./style/styles.scss";
import Home from "./components/MainPage/Home";

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ className: "react-icons" }}>
        <Home />
      </IconContext.Provider>
    </Router>
  );
}

export default App;
