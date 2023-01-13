import { BrowserRouter as Router } from "react-router-dom";

import "../src/style/styles.scss";
import Main from "./components/MainPage/Main";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
