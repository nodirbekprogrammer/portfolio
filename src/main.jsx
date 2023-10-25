import React from "react";
import ReactDOM from "react-dom/client";

import StoreProvider from "./redux/store";

import App from "./App.jsx";

import "antd/dist/reset.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
