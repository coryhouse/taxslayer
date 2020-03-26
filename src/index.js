import React from "react";
import { render } from "react-dom"; // named import
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";

// HTML vs JSX
// 1. class vs className
// 2. for vs htmlFor (useful for tying labels to inputs)
// 3. string styles vs object styles - NOTE: IS OPTIONAL
// 4. must specify unit of measurement vs px is default
// 5. kebab-cased vs camelCased
render(
  <Router>
    <ToastContainer />
    <App />
  </Router>,
  document.getElementById("root")
);
