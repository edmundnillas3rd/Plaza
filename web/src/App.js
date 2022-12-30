import "../src/style/styles.scss";

import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layouts/Main";
import LoginCard from "./components/LoginCard";

function App() {
  if (true) {
    return <LoginCard />;
  }

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
