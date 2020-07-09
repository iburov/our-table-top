//(Use these comments to find and replace)
// Navbar
// blank-component

import React from "react";
import "./Navbar.scss";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="ott-navbar navbar navbar-dark bg-info navbar-expand-lg">
        <NavLink to="/" className="navbar-brand">
          Our Table Top
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <NavLink to="/exercises" className="nav-link">
                Exercises
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Navbar);
