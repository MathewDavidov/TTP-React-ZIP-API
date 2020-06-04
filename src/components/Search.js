import React, { Component } from "react";
import "../App.css";
import Axios from "axios";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: 0,
      city: "",
      state: "",
      longitude: "",
      latitude: "",
      population: 0,
      totalWages: 0,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const zip = this.state.zip;
    const API_URL = `http://ctp-zip-api.herokuapp.com/zip/${zip}`;

    Axios.get(API_URL)
      .then((response) => {
        const data = response.data;
        console.log(data);
        this.setState({
          city: data[0].City,
          state: data[0].State,
          longitude: data[0].Long,
          latitude: data[0].Lat,
          population: data[0].EstimatedPopulation,
          totalWages: data[0].TotalWages,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
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
          <output></output>
        </form>
        {this.state.city ? (
          <div>
            <h1>City:{this.state.city}</h1>
            <div>State:{this.state.state}</div>
            <div>
              Location:({this.state.longitude} , {this.state.latitude})
            </div>
            <div>Population:{this.state.population}</div>
            <div>Total Wages:{this.state.totalWages}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Search;
