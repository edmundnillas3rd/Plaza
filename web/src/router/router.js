import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Main";
import Home from "../pages/Home";
import Product from "../pages/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products/item/:id",
        element: <Product/>
      }
    ]
  }
]);

export default router;
