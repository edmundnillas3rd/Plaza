import { BrowserRouter as Router } from "react-router-dom";
import { IconContext } from "react-icons";

import "./style/styles.scss";
import Main from "./components/MainPage/Main";

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ className: "react-icons" }}>
        <Main />
      </IconContext.Provider>
    </Router>
  );
}

export default App;
