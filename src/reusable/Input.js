import React from "react";

// Desturcturing props
const Input = ({ id, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        id={id}
        className="form-control"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
