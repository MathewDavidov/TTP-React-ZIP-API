import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zip: 10016
        };
    }

    componentDidMount() {
        const zip = this.state.zip;
        const API_URL = `http://ctp-zip-api.herokuapp.com/zip/${zip}`;

        Axios
            .get(API_URL)
            .then((response) => {
                const data = response.data;
                console.log(data);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    componentDidUpdate() {
        const zip = this.state.zip;

        if (zip >= 10000 && zip <= 20000) {
            const API_URL = `http://ctp-zip-api.herokuapp.com/zip/${zip}`;

            Axios.get(API_URL)
            .then((response) => {
                const data = response.data;
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            console.log("Invalid ZIP");
        }
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="container text-center">
                Zip Code:
                <input type="number" name="zip" id="inputNumber" onChange={this.handleChange}></input> 
            </div>
        )
    }
}

export default Search;
