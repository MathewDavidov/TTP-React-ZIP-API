import React, { Component } from "react";
import "../App.css";
import Axios from "axios";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipArray: [],
      zip: 0
    };
  }

  handleChange = (e) => {
    this.setState({
          zip: [e.target.value]
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const zip = this.state.zip;
    const API_URL = `http://ctp-zip-api.herokuapp.com/zip/${zip}`;

    Axios.get(API_URL)
      .then((response) => {
        const data = response.data;
        let arr = [];

        for (const i in data) {
          const city = data[i].City;

          const state = data[i].State;

          const loc = `${city}, ${state}`;

          const lat = data[i].Lat;
          const long = data[i].Long;
          const coordinates = `(${lat}, ${long})`;

          const population = data[i].EstimatedPopulation;

          const totalWages = data[i].TotalWages;

          arr.push({
            zip: zip,
            loc: loc,
            state: state,
            coordinates: coordinates,
            population: population,
            totalWages: totalWages,
          });

          this.setState({zipArray: arr});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let defArray;

    if (this.state.zipArray.length <= 0) {
      defArray = 
        <>
          <div>
            No Results
          </div>
        </>;
    } else {
      defArray = (
        <div className="container">
          {this.state.zipArray.map((obj, i) => (
            <div className="card" key={i}>
              <div className="card-header">{obj.loc}</div>
              <div className="card-body">
                <ul>
                  <li>State: {obj.state}</li>
                  <li>Location: {obj.coordinates}</li>
                  <li>Population (estimated): {obj.population}</li>
                  <li>Total Wages: {obj.totalWages}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="container text-center">
        <form onSubmit={this.handleSubmit}>
          <label>Zipcode:</label>
          <input
            type="number"
            name="zip"
            id="inputNumber"
            onChange={this.handleChange}
          ></input>
        </form>
        {defArray}
      </div>
    );
  }
}

export default Search;
