import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../src/style/styles.scss";
import Layout from "./components/layouts/Main";
import ItemDisplay from "./components/ItemDisplay";
import ItemDescription from "./components/ItemDescription";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

const SellingComponent = () => {
  return <p>Selling...</p>;
};

const MainPage = () => {
  return (
    <Routes>
      <Route exact path="/" element={<ItemDisplay />} />
      <Route exact path="/sell" element={<SellingComponent />} />
      <Route exact path="/inventory/items/:id" element={<ItemDescription />} />
      <Route exact path="/sign-up" element={<SignupForm />} />
      <Route exact path="/login" element={<LoginForm />} />
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
