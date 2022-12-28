import "../src/style/styles.scss";
import RouteLayout from "./components/RouteHandler";
import Layout from "./components/layouts/Main";

function App() {
  return (
    <RouteLayout>
      <Layout />
    </RouteLayout>
  );
}

export default App;
