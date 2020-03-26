import React from "react";
import PropTypes from "prop-types";

// Desturcturing props
const Input = ({
  id,
  label,
  value,
  onChange,
  required,
  onBlur,
  error,
  onError,
  type
}) => {
  // function handleBlur(event) {
  //   let validationError = "";
  //   if (required && !value) validationError = `${label} is required`;
  //   if (onError) onError(validationError, id);
  //   if (onBlur) onBlur(event); // call onBlur if specified
  // }

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
        type={type}
        value={value}
      />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

// Document the properties that this component accepts
Input.propTypes = {
  /** HTML ID */
  id: PropTypes.string.isRequired,

  /** Specify an error to display below the input */
  error: PropTypes.string,

  /** Called when validation fails */
  onError: PropTypes.func,

  /** Input label */
  label: PropTypes.string.isRequired,

  /** Input type */
  type: PropTypes.oneOf(["text", "number", "password", "phone", "email"]),

  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool
};

Input.defaultProps = {
  required: false,
  type: "text"
};

export default Input;
