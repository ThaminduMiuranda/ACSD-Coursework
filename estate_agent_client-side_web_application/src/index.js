import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/**
 * Root element for rendering React application.
 * Initializes a React root using ReactDOM.createRoot() for concurrent rendering.
 * Targets the HTML element with id="root".
 * @type {import('react-dom/client').Root}
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
