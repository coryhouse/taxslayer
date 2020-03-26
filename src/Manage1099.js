import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as f1099api from "./api/f1099api";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "./reusable/Input";
import { useHistory } from "react-router-dom";
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
  const [f1099, setF1099] = useState(new1099); // holds add 1099 form
  const [errors, setErrors] = useState({});
  useEffect(load1099s, []); // call this function immediately after the first render

  function load1099s() {
    if (f1099s.length === 0)
      f1099api.get1099s().then(({ data }) => setF1099s(data));
  }

  function handleSubmit(event) {
    event.preventDefault(); // don't reload the page
    f1099api.add1099(f1099).then(response => {
      const saved1099 = response.data; // this has the new ID assigned
      // this runs after successful add
      setF1099s([...f1099s, saved1099]); // add new 1099 to the list
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
      <h1>Add 1099</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="EIN"
          id="ein"
          onError={handleError}
          error={errors.ein}
          required
          onChange={handleChange}
          value={f1099.ein}
        />
        <Input
          label="Employer"
          id="employer"
          onError={handleError}
          error={errors.employer}
          required
          onChange={handleChange}
          value={f1099.employer}
        />
        <Input
          label="Wages"
          id="wages"
          onError={handleError}
          error={errors.wages}
          required
          onChange={handleChange}
          value={f1099.wages}
        />
        <Input
          label="Withheld"
          id="withheld"
          onError={handleError}
          error={errors.withheld}
          required
          onChange={handleChange}
          value={f1099.withheld}
        />
        <input type="submit" value="Add 1099" className="btn btn-primary" />
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
