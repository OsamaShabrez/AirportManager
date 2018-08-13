import React, { Component } from "react";
import { Switch, Redirect, Route } from 'react-router-dom';

import AirlinesDashboard from "./Airlines/AirlinesDashboard";
import AirportsDashboard from "./Airports/AirportsDashboard";
import AppNav from "./Navigation/AppNav";
import CountriesDashboard from "./Countries/CountriesDashboard";
import FlightSchedulesDashboard from "./FlightSchedules/FlightSchedulesDashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class App extends Component {
  mainRedirect(props) {
    return <Redirect to='/countries'/>;
  }
  render() {
    return (
      <div>
        <AppNav />
        <Switch>
          <Route exact path="/" component={this.mainRedirect}></Route>
          <Route exact path="/countries" component={CountriesDashboard}></Route>
          <Route exact path="/airports" component={AirportsDashboard}></Route>
          <Route exact path="/airlines" component={AirlinesDashboard}></Route>
          <Route exact path="/flight_schedules" component={FlightSchedulesDashboard}></Route>
        </Switch>
      </div>
    );
  }
}
