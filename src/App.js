import React, { useState, useEffect } from "react";
import * as f1099api from "./api/f1099api";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "./reusable/Input";

function App() {
  const [f1099s, setF1099s] = useState([]); // holds list of 1099s
  const [f1099, setF1099] = useState({
    // holds add 1099 form
    id: null,
    ein: "",
    employer: "",
    wages: "",
    withheld: ""
  });
  useEffect(load1099s, []); // call this function immediately after the first render

  function onDeleteClick(id) {
    f1099api.delete1099(id).then(() => {
      // Update local React state after a successful delete
      setF1099s(f1099s.filter(f => f.id !== id));
    });
  }

  function load1099s() {
    f1099api.get1099s().then(({ data }) => setF1099s(data));
  }

  function handleSubmit(event) {
    event.preventDefault(); // don't reload the page
    f1099api.add1099();
  }

  // HTML is a representation of application state, not a source of truth.
  function render1099(f1099) {
    // object destructuring
    const { id, ein, employer, wages, withheld } = f1099;
    return (
      <tr key={id}>
        <td>
          <button
            aria-label={`Delete ${employer} 1099`}
            onClick={() => onDeleteClick(id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
        <td>{ein}</td>
        <td>{employer}</td>
        <td>{wages}</td>
        <td>{withheld}</td>
      </tr>
    );
  }

  return (
    <>
      <h1>1099s</h1>
      <h2>Add 1099</h2>
      <form onSubmit={handleSubmit}>
        <Input label="EIN" id="ein" />
        <Input label="Employer" id="employer" />
        <Input label="Wages" id="wages" />
        <Input label="Withheld" id="withheld" />
        <input type="submit" value="Add 1099" className="btn btn-primary" />
      </form>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>EIN</th>
            <th>Employer</th>
            <th>Wages</th>
            <th>Withheld</th>
          </tr>
        </thead>
        {/* using a point-free style. The 1099 is automatically passed as an argument. */}
        <tbody>{f1099s.map(render1099)}</tbody>
      </table>
    </>
  );
}

export default App;
