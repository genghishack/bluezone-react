import React, { Component } from 'react';
import Select from 'react-select';
import "./Header.css";
import NutrienLogo from "../assets/nutrien_logo.jpg";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleDistrictChange = this.handleDistrictChange.bind(this);
    this.state = {
      districtOptions: [{ value: null, label: "Please select region first"}]
    };
  }
  componentDidMount() {
    const url = `http://localhost:4000/v1/geoData/regions`;
    fetch(url, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'allow',
          'x-api-key' : 'Q1GG6AytvH471DnYzeCjj5lXOwoDEZgB1REqR7vD'
        }
      })
      .then(resp => resp.json())
      .then(data => {
        const regions = data.data.map((region) => {
          return {value: region.attributes.region, label: region.attributes.region};
        })
        this.setState({
          regionOptions: regions
        });
      })
      .catch(error => console.log(error));
  }
  handleRegionChange(option) {
    const url = `http://localhost:4000/v1/geoData/divisions?region=${encodeURIComponent(option.label)}`;
    fetch(url, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'allow',
          'x-api-key' : 'Q1GG6AytvH471DnYzeCjj5lXOwoDEZgB1REqR7vD'
        }
      })
      .then(resp => resp.json())
      .then(data => {

        const districts = data.data.map((district) => {
          return {value: district.attributes.division, label: district.attributes.division};
        });
        this.setState({
          districtOptions: districts
        });
      })
      .catch(error => console.log(error));
    this.setState({
      selectedRegion: option,
      selectedDistrict: null
    });
    this.props.setRegion(option.label);
  }
  handleDistrictChange(option) {
    this.setState({
      selectedDistrict: option
    });
    this.props.setDistrict(option.label);
  }


  render() {
    const { selectedRegion, selectedDistrict } = this.state;
    return (
      <header id="App-header">
        <a href="/" className="home-link">
          <div className="appLogo">
            <img src={NutrienLogo} alt="nutrien" />
          </div>
          <div className="appTitle">
            <span className="light">Schröedinger’s </span>
            <span className="normal">Map</span>
          </div>
        </a>
        <div className="selectGroup">
          <Select
            value={selectedRegion}
            onChange={this.handleRegionChange}
            options={this.state.regionOptions}
            className="selectMenu"
            placeholder="Select Region..."
          />
          <Select
            value={selectedDistrict}
            onChange={this.handleDistrictChange}
            options={this.state.districtOptions}
            className="selectMenu"
            placeholder="Select District..."
          />
        </div>
      </header>
    )
  }
}

export default Header;