import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "orange"
};

function Nav() {
  return (
    <>
      <NavLink activeStyle={activeStyle} to="/" exact>
        Home
      </NavLink>{" "}
      |{" "}
      <NavLink activeStyle={activeStyle} to="/f1099s">
        1099s
      </NavLink>
    </>
  );
}

export default Nav;
