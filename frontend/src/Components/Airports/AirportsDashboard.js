import React, { Component } from "react";
import axios from "axios";

import AddEditModal from "./AddEditModal";
import DeleteModal from "../Elements/DeleteModal";
import GMapsContainer from "../GoogleMaps/GMapsContainer";
import { FETCH_ALL_COUNTRIES, AIRPORT_API } from "../../_Constants";

axios.defaults.withCredentials = true;
export default class AirportsDashboard extends Component {
  constructor() {
    super();
    const cancelToken = axios.CancelToken;
    this.state = {
      airports: [],
      countries: [],
      gMapData: {
        lat: 0,
        lng: 0,
        name: "",
      },
      axios: {
        source: cancelToken.source()
      }
    };
    this.addNewRecord = this.addNewRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.editRecord = this.editRecord.bind(this);
    this.tableRowClicked = this.tableRowClicked.bind(this);
  }

  componentDidMount() {
    axios.get(AIRPORT_API, {
      cancelToken: this.state.axios.source.token
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            airports: response.data.airports
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

  addNewRecord(airport) {
    axios.post(AIRPORT_API, airport)
      .then((response) => {
        if (response.status === 200) {
          console.log("record inserted successfully.");
          this.setState({
            airports: this.state.airports.concat(response.data.airport)
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

  deleteRecord(airportId) {
    axios.delete(AIRPORT_API + "/" + airportId, {
      cancelToken: this.state.axios.source.token
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("record deleted successfully.");
          let airports = this.state.airports;
          this.setState({
            airports: airports.filter(airport => airport.id !== airportId)
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

  editRecord(airport) {
    axios.put(AIRPORT_API + "/" + airport.id, airport)
      .then((response) => {
        if (response.status === 200 && response.data.message === "Saved") {
          console.log("record edited successfully.");
          let newAirports = this.state.airports;
          const index = newAirports.findIndex((it) => {return it.id === airport.id});
          newAirports.splice(index, 1, response.data.airport);
          this.setState({
            airports: newAirports
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

  tableRowClicked(airport) {
    console.log("airport selected: " + airport.name + " with cordinates: " + airport.latitude + " " + airport.longitude);
    this.setState({
      gMapData: {
        lat: airport.latitude,
        lng: airport.longitude,
        name: airport.name
      }
    });
  }


  render() {
    const { airports, countries, gMapData } = this.state;
    return (
      <div className="container">
        <div className="row gmaps-object">
          <GMapsContainer centerAroundCurrentLocation={true} gMapData={gMapData} />
        </div>
        <div className="row top-buffer">
          <div className="col">
            <h2>Manage Airports</h2>
          </div>
          <div className="col-auto">
            <AddEditModal airport={{}} callbackMethod={this.addNewRecord} centerAroundCurrentLocation={true} countries_list={countries} requestType={"POST"} ref="addNewAirport" />
            <button type="button" className="btn btn-secondary pull-right" onClick={() => this.refs["addNewAirport"].toggleModal()}>Add New Airport</button>
          </div>
        </div>
        <div className="row">
          <table className="table table-sm table-hover thead-light">
          <caption>List of airports we manage, click on a record to view it on the map.</caption>
          <thead>
            <tr className="d-flex">
              <th className="col-1"></th>
              <th className="col-4">Name</th>
              <th className="col-2 text-center">IATA Code</th>
              <th className="col-3 text-center">Country</th>
              <th className="col-2 text-center">Operations</th>
            </tr>
          </thead>
          <tbody>
            {
              airports.map(function(airport, index, airports) {
                return (
                  <tr key={index} className="d-flex">
                    <td className="col-1" onClick={() => this.tableRowClicked(airport)}>{index+1}</td>
                    <td className="col-4" onClick={() => this.tableRowClicked(airport)}>{airport.name}</td>
                    <td className="col-2 text-center" onClick={() => this.tableRowClicked(airport)}>{airport.IATA_code}</td>
                    <td className="col-3" onClick={() => this.tableRowClicked(airport)}>{airport.country.name}</td>
                    <td className="col-2 text-center">
                      <span className="emoji" role="img" aria-label="edit" onClick={() => this.refs["editModalRef-" + airport.id].toggleModal()}>&#9997;</span> |
                      <span className="emoji" role="img" aria-label="delete" onClick={() => this.refs["deleteModalRef-" + airport.id].confirmDeleteAction()}>&#10060;</span>
                    </td>
                    <AddEditModal id={airport.id} airport={airport} callbackMethod={this.editRecord} countries_list={countries} requestType={"PATCH"} ref={"editModalRef-" + airport.id} />
                    <DeleteModal deleteMethod={this.deleteRecord} id={airport.id} title={airport.name} ref={"deleteModalRef-" + airport.id} />
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
