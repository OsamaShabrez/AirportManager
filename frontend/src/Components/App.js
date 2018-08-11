import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';

import AirlinesDashboard from "./Airlines/AirlinesDashboard";
import AirportsDashboard from "./Airports/AirportsDashboard";
import AppNav from "./Navigation/AppNav";
import Dashboard from "./HomePage/Dashboard";
import FlightSchedulesDashboard from "./FlightSchedules/FlightSchedulesDashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <AppNav />
        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/airports" component={AirportsDashboard}></Route>
          <Route exact path="/airlines" component={AirlinesDashboard}></Route>
          <Route exact path="/flight_schedules" component={FlightSchedulesDashboard}></Route>
        </Switch>
      </div>
    );
  }
}
