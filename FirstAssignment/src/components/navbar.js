import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

const Navbar = () => {
  return (
    <div className="spa">
      <h1 className="text-2xl font-bold pb-4 mx-2">Simple SPA</h1>
      <nav className=" navbar bg-black">
        <NavLink to="/" className="link-style text-white">
          Home
        </NavLink>
        <NavLink to="/stuff" className="link-style text-white">
          Stuff
        </NavLink>
        <NavLink to="/contact" className=" link-style text-white">
          Contact
        </NavLink>
      </nav>
    </div>
  );
};
export default Navbar;
