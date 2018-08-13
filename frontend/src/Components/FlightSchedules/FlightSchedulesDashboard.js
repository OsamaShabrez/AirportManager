import React, { Component } from "react";
import axios from "axios";

import AddEditFlightScheduleModal from "./AddEditFlightScheduleModal";
import DeleteModal from "../Elements/DeleteModal";
import { AIRLINE_API, AIRPORT_API, FLIGHT_SCHEDULE_API } from "../../_Constants";

export default class FlightSchedulesDashboard extends Component {
  constructor() {
    super();
    const cancelToken = axios.CancelToken;
    this.state = {
      airlines: [],
      airports: [],
      flightSchedules: [],
      axios: {
        source: cancelToken.source()
      }
    };
    this.addNewRecord = this.addNewRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.editRecord = this.editRecord.bind(this);
  }

  componentDidMount() {
    axios.get(FLIGHT_SCHEDULE_API, {
      cancelToken: this.state.axios.source.token
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            flightSchedules: response.data.flightSchedules
          });
          axios.get(AIRPORT_API, {
            cancelToken: this.state.axios.source.token
          }).then((response) => {
              if (response.status === 200) {
                this.setState({
                  airports: response.data.airports
                });
              } else {
                console.log("Bad status code: " + response.status);
                console.log(response.message);
              }
            })
            .catch((error) => {
              if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
              } else {
                console.error("Request failed", error.message);
              }
            })
            axios.get(AIRLINE_API, {
              cancelToken: this.state.axios.source.token
            }).then((response) => {
                if (response.status === 200) {
                  this.setState({
                    airlines: response.data.airlines
                  });
                } else {
                  console.log("Bad status code: " + response.status);
                  console.log(response.message);
                }
              })
              .catch((error) => {
                if (axios.isCancel(error)) {
                  console.log("Request canceled", error.message);
                } else {
                  console.error("Request failed", error.message);
                }
              })
        } else {
          console.log("Bad status code: " + response.status);
          console.log(response.message);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Request failed", error.message);
        }
      });
  }

  componentWillUnmount() {
    this.state.axios.source.cancel("Operation canceled by the user: page switched");
  }

  addNewRecord(flightSchedule) {
    axios.post(FLIGHT_SCHEDULE_API, flightSchedule)
      .then((response) => {
        if (response.status === 200) {
          console.log("record inserted successfully.");
          this.setState({
            flightSchedules: this.state.flightSchedules.concat(response.data.flightSchedule)
          });
        } else {
          console.log("Bad status code: " + response.status);
          console.log(response.message);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Request failed", error.message);
        }
      });
  }

  deleteRecord(flightSchedule) {
    axios.delete(`${FLIGHT_SCHEDULE_API}/${flightSchedule.airline_id}/${flightSchedule.depart_airport_id}/${flightSchedule.arrive_airport_id}`, {
      cancelToken: this.state.axios.source.token
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("record deleted successfully.");
          let flightSchedules = this.state.flightSchedules;
          const strId = `${flightSchedule.airline_id}${flightSchedule.depart_airport_id}${flightSchedule.arrive_airport_id}`;
          this.setState({
            flightSchedules: flightSchedules.filter(fs => `${fs.airline_id}${fs.depart_airport_id}${fs.arrive_airport_id}` !== strId)
          })
        } else {
          console.log("Bad status code: " + response.status);
          console.log(response.message);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Request failed", error.message);
        }
      });
  }

  editRecord(flightSchedule) {
    console.log(`${FLIGHT_SCHEDULE_API}/${flightSchedule.oldURL}`);
    axios.put(`${FLIGHT_SCHEDULE_API}/${flightSchedule.oldURL}`, flightSchedule)
      .then((response) => {
        if (response.status === 200 && response.data.message === "Saved") {
          console.log("record edited successfully.");
          let newFlightSchedules = this.state.flightSchedules;
          const strId = `${flightSchedule.airline_id}${flightSchedule.depart_airport_id}${flightSchedule.arrive_airport_id}`;
          const index = newFlightSchedules.findIndex((fs) => {return `${fs.airline_id}${fs.depart_airport_id}${fs.arrive_airport_id}` === strId});
          newFlightSchedules.splice(index, 1, response.data.flightSchedule);
          this.setState({
            flightSchedules: newFlightSchedules
          });
        } else {
          console.log("Bad status code: " + response.status);
          console.log(response.message);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Request failed", error.message);
        }
      });
  }

  render() {
    const { airlines, airports, flightSchedules } = this.state;
    return (
      <div className="container">
        <div className="row top-buffer">
          <div className="col">
            <h2>Manage Flight Schedules</h2>
          </div>
          <div className="col-auto">
            <AddEditFlightScheduleModal flightSchedule={{}} callbackMethod={this.addNewRecord} airlines_list={airlines} airports_list={airports} requestType={"POST"} ref="addNewFlightSchedule" />
            <button type="button" className="btn btn-secondary pull-right" onClick={() => this.refs["addNewFlightSchedule"].toggleModal()}>Add New Flight Schedule</button>
          </div>
        </div>
        <div className="row">
          <table className="table table-sm table-hover thead-light">
          <caption>List of flights currently scheduled.</caption>
          <thead>
            <tr className="d-flex">
              <th className="col-1"></th>
              <th className="col-3">Departing</th>
              <th className="col-3 text-center">Airline</th>
              <th className="col-1"></th>
              <th className="col-3">Arriving</th>
              <th className="col-1 text-center">Operations</th>
            </tr>
          </thead>
          <tbody>
            {
              flightSchedules.map(function(flightSchedule, index, flightSchedules) {
                const strId = `${flightSchedule.airline_id}${flightSchedule.depart_airport_id}${flightSchedule.arrive_airport_id}`;
                return (
                  <tr key={index} className="d-flex">
                    <td className="col-1 svg-wrapper"><img src={"flag-svg/" + flightSchedule.depart_airport.country.ISO + ".svg"} alt={"country flag " + flightSchedule.depart_airport.country.ISO} /></td>
                    <td className="col-3">{flightSchedule.depart_airport.name}</td>
                    <td className="col-3">{flightSchedule.airline.name}</td>
                    <td className="col-1 svg-wrapper"><img src={"flag-svg/" + flightSchedule.arrive_airport.country.ISO + ".svg"} alt={"country flag " + flightSchedule.depart_airport.country.ISO} /></td>
                    <td className="col-3">{flightSchedule.arrive_airport.name}</td>
                    <td className="col-1 text-center">
                      <span className="emoji" role="img" aria-label="edit" onClick={() => this.refs[`editModalRef-${strId}`].toggleModal()}>&#9997;</span> |
                      <span className="emoji" role="img" aria-label="delete" onClick={() => this.refs[`deleteModalRef-${strId}`].confirmDeleteAction()}>&#10060;</span>
                    </td>
                    <AddEditFlightScheduleModal flightSchedule={flightSchedule} callbackMethod={this.editRecord} airlines_list={airlines} airports_list={airports} requestType={"PATCH"} ref={`editModalRef-${strId}`} />
                    <DeleteModal deleteMethod={this.deleteRecord} id={flightSchedule} title={`${flightSchedule.airline.name}: ${flightSchedule.depart_airport.name} → ${flightSchedule.arrive_airport.name}`} ref={`deleteModalRef-${strId}`} />
                  </tr>
                )
              }, this)
            }
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}
