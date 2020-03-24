import React from "react";

function App() {
  const f1099s = [
    { ein: 1, employer: "Facebook", wages: 300000, withheld: 50000 },
    { ein: 2, employer: "Apple", wages: 240000, withheld: 33000 },
    { ein: 3, employer: "Amazon", wages: 60000, withheld: 15000 }
  ];

  function render1099(f1099) {
    return (
      <tr>
        <td>{f1099.ein}</td>
        <td>{f1099.employer}</td>
        <td>{f1099.wages}</td>
        <td>{f1099.withheld}</td>
      </tr>
    );
  }

  // Exercise 1:
  // Display ein, employer, wages, and withheld in a table.
  // Display a header for each.
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
        <tbody>{f1099s.map(render1099)}</tbody>
      </table>
    </>
  );
}

export default App;
