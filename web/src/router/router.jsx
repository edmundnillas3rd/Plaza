import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Main";
import Authenticate from "../pages/Authenicate";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Vendor from "../pages/Vendor";
import Filter from "../pages/Filter";
import Cart from "../features/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "vendor",
        element: <Vendor />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "products/item/:id",
        element: <Product />
      },
      {
        path: "products/item/category/:category_id",
        element: <Filter />
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
