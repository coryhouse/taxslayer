import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <>
      <NavLink to="/">Home</NavLink> | <NavLink to="/f1099s">1099s</NavLink>
    </>
  );
}

export default Nav;
