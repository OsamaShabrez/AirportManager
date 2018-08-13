import React, { Component } from "react";
import axios from "axios";

import { FETCH_ALL_COUNTRIES } from "../../_Constants";

export default class countriesDashboard extends Component {
  constructor() {
    super();
    const cancelToken = axios.CancelToken;
    this.state = {
      countries: [],
      axios: {
        source: cancelToken.source()
      }
    };
  }

  componentDidMount() {
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
  }

  componentWillUnmount() {
    this.state.axios.source.cancel("Operation canceled by the user: page switched");
  }

  render() {
    const { countries } = this.state;

    return (
      <div className="container">
        <div className="row top-buffer">
          <h2>Countries list</h2>
        </div>
        <div className="row">
          <table className="table table-sm table-hover thead-light">
          <caption>List of countries we have in database.</caption>
          <thead>
            <tr className="d-flex">
              <th className="col-1"></th>
              <th className="col-1"></th>
              <th className="col-8 text-center">Name</th>
              <th className="col-2">ISO Code</th>
            </tr>
          </thead>
          <tbody>
            {
              countries.map(function(country, index, countries) {
                return (
                  <tr key={index} className="d-flex">
                    <td className="col-1">{index+1}</td>
                    <td className="col-1 svg-wrapper"><img src={"flag-svg/" + country.ISO + ".svg"} alt={"country flag " + country.ISO} /></td>
                    <td className="col-8">{country.name}</td>
                    <td className="col-2">{country.ISO}</td>
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
