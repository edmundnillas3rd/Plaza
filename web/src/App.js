import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../src/style/styles.scss";
import Layout from "./components/layouts/Main";
import LoginForm from "./components/LoginForm";
import ItemDisplay from "./components/ItemDisplay";
import ItemDescription from "./components/ItemDescription";

const MainPage = () => {
  return (
    <Routes>
      <Route exact path="/" element={<ItemDisplay />} />
      <Route exact path="/inventory/items/:id" element={<ItemDescription />} />
      <Route exact path="/user/sign-up" element={<LoginForm />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <MainPage />
      </Layout>
    </Router>
  );
}

export default App;
