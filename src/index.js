// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import Axios from 'axios';
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// Axios.defaults.baseURL ="http://5.75.187.236/api/";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Axios from 'axios';
import { AuthContextProvider } from "./context/Context";
Axios.defaults.baseURL ="https://adminapi.besal10.com/api/";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
