import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <div className="navBar">
        <NavLink to="/" className="brand">
          O|X|?
        </NavLink>
        <div className="linkList">
          <NavLink to="/tock3" className="NavLink">
            Play
          </NavLink>
          <NavLink to="/tock4" className="NavLink">
            Play 4x4 (beta)
          </NavLink>
          <div className="space" />
        </div>
      </div>
    );
  }
}

export default NavBar;
