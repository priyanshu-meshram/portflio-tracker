import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
axios.defaults.baseURL = "http://localhost:4000";
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
//enable routing

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
