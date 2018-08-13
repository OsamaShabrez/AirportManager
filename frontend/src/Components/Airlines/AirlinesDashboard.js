import React, { Component } from "react";
import axios from "axios";

import AddEditAirlineModal from "./AddEditAirlineModal";
import DeleteModal from "../Elements/DeleteModal";
import { FETCH_ALL_COUNTRIES, AIRLINE_API } from "../../_Constants";

export default class AirlinesDashboard extends Component {
  constructor() {
    super();
    const cancelToken = axios.CancelToken;
    this.state = {
      airlines: [],
      countries: [],
      axios: {
        source: cancelToken.source()
      }
    };
    this.addNewRecord = this.addNewRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.editRecord = this.editRecord.bind(this);
  }

  componentDidMount() {
    axios.get(AIRLINE_API, {
      cancelToken: this.state.axios.source.token
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            airlines: response.data.airlines
          });
          axios.get(FETCH_ALL_COUNTRIES, {
            cancelToken: this.state.axios.source.token
          }).then((response) => {
              if (response.status === 200) {
                this.setState({
                  countries: response.data.countries
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

  addNewRecord(airline) {
    axios.post(AIRLINE_API, airline)
      .then((response) => {
        if (response.status === 200) {
          console.log("record inserted successfully.");
          this.setState({
            airlines: this.state.airlines.concat(response.data.airline)
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

  deleteRecord(airlineId) {
    axios.delete(AIRLINE_API + "/" + airlineId, {
      cancelToken: this.state.axios.source.token
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("record deleted successfully.");
          let airlines = this.state.airlines;
          this.setState({
            airlines: airlines.filter(airline => airline.id !== airlineId)
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

  editRecord(airline) {
    axios.put(AIRLINE_API + "/" + airline.id, airline)
      .then((response) => {
        if (response.status === 200 && response.data.message === "Saved") {
          console.log("record edited successfully.");
          let newAirlines = this.state.airlines;
          const index = newAirlines.findIndex((it) => {return it.id === airline.id});
          newAirlines.splice(index, 1, response.data.airline);
          this.setState({
            airlines: newAirlines
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
    const { airlines, countries } = this.state;

    return (
      <div className="container">
        <div className="row top-buffer">
          <div className="col">
            <h2>Manage Airlines</h2>
          </div>
          <div className="col-auto">
            <AddEditAirlineModal airline={{}} callbackMethod={this.addNewRecord} countries_list={countries} requestType={"POST"} ref="addNewAirline" />
            <button type="button" className="btn btn-secondary pull-right" onClick={() => this.refs["addNewAirline"].toggleModal()}>Add New Airline</button>
          </div>
        </div>
        <div className="row">
          <table className="table table-sm table-hover thead-light">
          <caption>List of airlines we manage.</caption>
          <thead>
            <tr className="d-flex">
              <th className="col-1"></th>
              <th className="col-1"></th>
              <th className="col-4">Name</th>
              <th className="col-4 text-center">Country</th>
              <th className="col-2 text-center">Operations</th>
            </tr>
          </thead>
          <tbody>
            {
              airlines.map(function(airline, index, airlines) {
                return (
                  <tr key={index} className="d-flex">
                    <td className="col-1">{index+1}</td>
                    <td className="col-1 svg-wrapper"><img src={"flag-svg/" + airline.country.ISO + ".svg"} alt={"country flag " + airline.country.ISO} /></td>
                    <td className="col-4">{airline.name}</td>
                    <td className="col-4">{airline.country.name}</td>
                    <td className="col-2 text-center">
                      <span className="emoji" role="img" aria-label="edit" onClick={() => this.refs["editModalRef-" + airline.id].toggleModal()}>&#9997;</span> |
                      <span className="emoji" role="img" aria-label="delete" onClick={() => this.refs["deleteModalRef-" + airline.id].confirmDeleteAction()}>&#10060;</span>
                    </td>
                    <AddEditAirlineModal airline={airline} callbackMethod={this.editRecord} countries_list={countries} requestType={"PATCH"} ref={"editModalRef-" + airline.id} />
                    <DeleteModal deleteMethod={this.deleteRecord} id={airline.id} title={airline.name} ref={"deleteModalRef-" + airline.id} />
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
