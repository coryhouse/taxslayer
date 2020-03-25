import React from "react";

// Desturcturing props
const Input = ({ id, label }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <br />
      <input id={id} className="form-control" />
    </div>
  );
};

export default Input;
