import React from "react";
import ReactDOM from "react-dom/client";
import { IconContext } from "react-icons";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./app/store";
import router from "./router/router";
import "./style/styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <IconContext.Provider value={{ className: "react-icons" }}>
      <RouterProvider router={router} />
    </IconContext.Provider>
  </Provider>
);
