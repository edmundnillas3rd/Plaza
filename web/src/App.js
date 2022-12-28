import "../src/style/styles.scss";

import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layouts/Main";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
