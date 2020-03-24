import React from "react";
import { get1099s } from "./api/f1099api";

function App() {
  const f1099s = [
    { ein: 1, employer: "Facebook", wages: 300000, withheld: 50000 },
    { ein: 2, employer: "Apple", wages: 240000, withheld: 33000 },
    { ein: 3, employer: "Amazon", wages: 60000, withheld: 15000 }
  ];

  function render1099(f1099) {
    // object destructuring
    const { ein, employer, wages, withheld } = f1099;
    return (
      <tr>
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
      <table>
        <thead>
          <tr>
            <th>EID</th>
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
