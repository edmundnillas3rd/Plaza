import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Main";
import Authenticate from "../pages/Authenicate";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Vendor from "../pages/Vendor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products/item/:id",
        element: <Product />
      },
      {
        path: "vendor",
        element: <Vendor />
      },
      {
        path: "products/item/search/:item_name",
        element: <Search />
      }
    ]
  },
  {
    path: "/auth",
    element: <Authenticate />
  },
  {
    path: "/register",
    element: <Register />
  }
]);

export default router;
