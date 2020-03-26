import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as f1099api from "./api/f1099api";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Grid({ f1099s, setF1099s }) {
  useEffect(load1099s, []); // call this function immediately after the first render

  function onDeleteClick(id) {
    f1099api.delete1099(id).then(() => {
      // Update local React state after a successful delete
      setF1099s(f1099s.filter(f => f.id !== id));
      toast.success("1099 Deleted");
    });
  }

  function load1099s() {
    f1099api.get1099s().then(({ data }) => setF1099s(data));
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
      <Link to="/manage" className="btn btn-primary" role="button">
        Add 1099
      </Link>
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

Grid.propTypes = {
  /** List of 1099s */
  f1099s: PropTypes.array.isRequired,

  /** Function to set 1099s */
  setF1099s: PropTypes.func.isRequired
};

export default Grid;
