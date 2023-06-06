import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <div>Hello World!</div> }]
  }
]);

export default router;
