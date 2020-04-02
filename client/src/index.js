import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CurrentUserContext from "./CurrentUserContext";
ReactDOM.render(
  <React.StrictMode>
    <CurrentUserContext key={CurrentUserContext}>
      <App />
    </CurrentUserContext>
  </React.StrictMode>,
  document.getElementById("root")
);
