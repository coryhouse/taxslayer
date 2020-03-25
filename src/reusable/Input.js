import React from "react";
import PropTypes from "prop-types";

// Desturcturing props
const Input = ({ id, label, value, onChange, required, onBlur, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label} {required && "*"}
      </label>
      <br />
      <input
        id={id}
        onBlur={onBlur}
        className="form-control"
        onChange={onChange}
        value={value}
      />
      {error && <div>{error}</div>}
    </div>
  );
};

// Document the properties that this component accepts
Input.propTypes = {
  /** HTML ID */
  id: PropTypes.string.isRequired,

  /** Specify an error to display below the input */
  error: PropTypes.string,

  /** Input label */
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool
};

Input.defaultProps = {
  required: false
};

export default Input;
