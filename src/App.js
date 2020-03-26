import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "./Grid";
import Manage1099 from "./Manage1099";
import Nav from "./Nav";

function App() {
  return (
    <div className="container">
      <Nav />
      <Route path="/" component={Home} exact />
      <Route path="/f1099s" component={Grid} />
      <Route path="/manage" component={Manage1099} />
    </div>
  );
}

export default App;
