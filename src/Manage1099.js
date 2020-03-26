import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as f1099api from "./api/f1099api";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "./reusable/Input";
import { useHistory, useRouteMatch } from "react-router-dom";
import { f1099Type } from "./propTypes";

const new1099 = {
  id: null,
  ein: "",
  employer: "",
  wages: "",
  withheld: ""
};

function Manage1099({ f1099s, setF1099s }) {
  const history = useHistory();
  const match = useRouteMatch();
  const idToEdit = parseInt(match.params.id);
  const [f1099, setF1099] = useState(new1099); // holds add 1099 form
  const [errors, setErrors] = useState({});
  useEffect(() => {
    async function init() {
      if (!idToEdit) return;
      if (f1099s.length === 0) {
        const { data } = await f1099api.get1099s();
        setF1099s(data); // This is an async call. React will set this state in the near future. That's why I'm referencing data below instead.
        const f1099ToEdit = get1099ById(data, idToEdit);
        setF1099(f1099ToEdit);
      } else {
        const f1099ToEdit = get1099ById(f1099s, idToEdit);
        setF1099(f1099ToEdit);
      }
    }

    init();

    function get1099ById(f1099s, id) {
      const f1099ToEdit = f1099s.find(d => d.id === id);
      if (!f1099ToEdit) return history.push("/page-not-found");
      return f1099ToEdit;
    }
  }, [f1099s, history, idToEdit, setF1099s]);

  function isValid() {
    const _errors = {}; // Deliberately prefixing with an underscore to avoid a naming conflict.
    if (!f1099.ein) _errors.ein = "EIN is required";
    if (!f1099.employer) _errors.employer = "Employer is required";
    setErrors(_errors); // update state
    return Object.keys(_errors).length === 0; // If the errors object is still empty, we're good. 👍
  }

  function handleSubmit(event) {
    event.preventDefault(); // don't reload the page
    if (!isValid()) return;
    f1099api.save1099(f1099).then(response => {
      const saved1099 = response.data; // this has the new ID assigned
      // handle add vs edit
      if (idToEdit) {
        const new1099s = f1099s.map(f => (f.id === idToEdit ? saved1099 : f));
        setF1099s(new1099s);
      } else {
        setF1099s([...f1099s, saved1099]); // add new 1099 to the list
      }
      history.push("/f1099s");
    });
  }

  function handleChange(event) {
    const new1099 = { ...f1099 };
    // Using computed property syntax to reference a property
    // via a variable.
    new1099[event.target.id] = event.target.value;
    setF1099(new1099);
  }

  function validate(event) {
    if (!event.target.value) {
      const newErrors = { ...errors };
      newErrors[event.target.id] = "This field is required.";
      setErrors(newErrors);
    } else {
      // clear any existing error for the field
      const newErrors = { ...errors };
      delete newErrors[event.target.id];
      setErrors(newErrors);
    }
  }

  function handleError(error, id) {
    const newErrors = { ...errors };
    if (error) {
      newErrors[id] = error;
    } else {
      // clear any existing error for the field
      delete newErrors[id];
    }
    setErrors(newErrors);
  }

  return (
    <>
      <h1>{idToEdit ? `Edit ${f1099.employer} 1099` : "Add 1099"}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="EIN"
          id="ein"
          error={errors.ein}
          required
          onChange={handleChange}
          value={f1099.ein}
        />
        <Input
          label="Employer"
          id="employer"
          error={errors.employer}
          required
          onChange={handleChange}
          value={f1099.employer}
        />
        <Input
          label="Wages"
          id="wages"
          error={errors.wages}
          required
          type="number"
          onChange={handleChange}
          value={f1099.wages}
        />
        <Input
          label="Withheld"
          id="withheld"
          error={errors.withheld}
          required
          type="number"
          onChange={handleChange}
          value={f1099.withheld}
        />
        <input
          type="submit"
          value={idToEdit ? "Save 1099" : "Add 1099"}
          className="btn btn-primary"
        />
      </form>
    </>
  );
}

Manage1099.propTypes = {
  /** List of 1099s */
  f1099s: PropTypes.arrayOf(f1099Type).isRequired,

  /** Function to set 1099s */
  setF1099s: PropTypes.func.isRequired
};

export default Manage1099;
