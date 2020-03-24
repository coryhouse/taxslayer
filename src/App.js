import React, { useState } from "react";
import { get1099s } from "./api/f1099api";
import "bootstrap/dist/css/bootstrap.min.css";

const default1099s = [
  { ein: 1, employer: "Facebook", wages: 300000, withheld: 50000 },
  { ein: 2, employer: "Apple", wages: 240000, withheld: 33000 },
  { ein: 3, employer: "Amazon", wages: 60000, withheld: 15000 }
];

function App() {
  const [f1099s, setF1099s] = useState(default1099s);

  function onDeleteClick(ein) {
    const new1099s = f1099s.filter(f => f.ein !== ein);
    setF1099s(new1099s);
  }

  // HTML is a representation of application state, not a source of truth.
  function render1099(f1099) {
    // object destructuring
    const { ein, employer, wages, withheld } = f1099;
    return (
      <tr>
        <td>
          <button onClick={() => onDeleteClick(ein)} className="btn btn-danger">
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
