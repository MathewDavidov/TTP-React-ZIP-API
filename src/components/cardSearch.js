import React, { Component } from "react";
import Search from "./Search";

export class cardSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      State: "",
      Location: (Latitude, Longitude),
      TotalWages: wage,
    };
  }

  render() {
    return (
      <div>
        <label for="City"> List of Cities Found </label>
        <form onInput={Search}>
          <output name="results" for="" />
        </form>
      </div>
    );
  }
}

export default cardSearch;
