import React, { useState } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "./Grid";
import Manage1099 from "./Manage1099";
import Nav from "./Nav";

function App() {
  const [f1099s, setF1099s] = useState([]); // holds list of 1099s

  return (
    <div className="container">
      <Nav />
      <Route path="/" component={Home} exact />
      <Route path="/f1099s">
        <Grid f1099s={f1099s} setF1099s={setF1099s} />
      </Route>
      <Route path="/manage">
        <Manage1099 f1099s={f1099s} setF1099s={setF1099s} />
      </Route>
    </div>
  );
}

export default App;
