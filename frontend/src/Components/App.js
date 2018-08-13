import React, { Component } from "react";
import axios from "axios";
import { Switch, Redirect, Route } from 'react-router-dom';

import AirlinesDashboard from "./Airlines/AirlinesDashboard";
import AirportsDashboard from "./Airports/AirportsDashboard";
import AppNav from "./Navigation/AppNav";
import CountriesDashboard from "./Countries/CountriesDashboard";
import FlightSchedulesDashboard from "./FlightSchedules/FlightSchedulesDashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// setting JWT secret for login
axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4cCI6MTUzNDczNjc1MX0.sTS6RkxxpKn_dtb4RfS1F6SzyiQxLHpFsuFzMhE61IA';

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
