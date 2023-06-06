import React from "react";
import ReactDOM from "react-dom/client";
import { IconContext } from "react-icons";
import { RouterProvider } from "react-router-dom";

import router from "./router/router";
import "./style/styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <IconContext.Provider value={{ className: "react-icons" }}>
    <RouterProvider router={router} />
  </IconContext.Provider>
);
