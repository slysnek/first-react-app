import React from "react";
import ReactDOM from "react-dom/client";
import { WrappedApp } from "./app/App";
import "./index.css";
import { store } from "./data/reduxStore";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <WrappedApp />
    </Provider>
  </React.StrictMode>
);
