import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Main";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }]
  }
]);

export default router;
