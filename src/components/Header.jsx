import React, { Component } from 'react';
import Select from 'react-select';
import "./Header.css";
import { getDistrictList } from "../utility/MapHelpers";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleDistrictChange = this.handleDistrictChange.bind(this);
    this.state = {
      districtOptions: [{ value: null, label: "Please select region first"}]
    };
  }
  handleRegionChange(option) {
    const districts = getDistrictList(option.value);
    this.setState({
      districtOptions: districts,
      selectedRegion: option.name,
      selectedDistrict: null
    });
    this.props.setRegion(option.value);
  }
  handleDistrictChange(option) {
    this.setState({
      selectedDistrict: option.name
    });
    this.props.setDistrict(option.value);
  }


  render() {
    const regionOptions = [
      { value: '0', label: 'CPS - West Region' },
      { value: '1', label: 'CPS - Central Cornbelt Region' },
      { value: '2', label: 'CPS - South Region' },
      { value: '3', label: 'Nutrien West Region' },
      { value: '4', label: 'Nutrien Western Cornbelt Region' },
      { value: '5', label: 'CPS - Eastern Cornbelt Region' },
      { value: '6', label: 'Nutrien South Region' },
      { value: '7', label: 'Nutrien Eastern Region' },
      { value: '8', label: 'Nutrien Central Cornbelt Region' },
      { value: '9', label: 'CPS - Western Cornbelt Region' }
    ];
    const { selectedRegion, selectedDistrict } = this.state;
    return (
      <header id="App-header">
        <a href="/" className="home-link">
          <div className="App-logo">
            <i className="fas fa-globe"></i>
          </div>
          <div className="App-title">
            <span className="light">Schroedinger’s </span>
            <span className="normal">Map</span>
          </div>
        </a>
        <div className="selectGroup">
          <Select
            value={selectedRegion}
            onChange={this.handleRegionChange}
            options={regionOptions}
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