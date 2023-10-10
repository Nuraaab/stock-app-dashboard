import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Axios from 'axios';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
Axios.defaults.baseURL ="http://localhost:8000/api/";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
