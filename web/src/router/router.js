import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Main";
import Authenticate from "../pages/Authenicate";
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
        element: <Product />
      }
    ]
  },
  {
    path: "/auth",
    element: <Authenticate />
  }
]);

export default router;
