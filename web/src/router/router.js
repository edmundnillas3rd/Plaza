import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  }
]);

export default router;
