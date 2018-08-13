import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class AppNav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">Airport Manager</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myapp-navbars" aria-controls="myapp-navbars" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="myapp-navbars">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to="/countries">Countries</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/airports">Airports</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/airlines">Airlines</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/flight_schedules">Flight Schedules</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
