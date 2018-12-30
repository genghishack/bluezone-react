import React, {Component} from 'react';
import Select from 'react-select';
import {getJsonData} from '../utility/DataHelpers';
import "./Header.css";
import NutrienLogo from "../assets/nutrien_logo.jpg";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleDivisionChange = this.handleDivisionChange.bind(this);
    this.handleBranchChange = this.handleBranchChange.bind(this);
    this.state = {
      divisionOptions: [{value: null, label: "Please select region first"}],
      branchOptions: [{value: null, label: "Please select division first"}]
    };
  }

  componentDidMount() {
    this.getRegionOptions();
  }

  getRegionOptions() {
    getJsonData('v1/geoData/regions')
      .then(data => {
        const regions = data.data.map((region) => {
          return {
            value: region.attributes.region,
            label: region.attributes.region
          };
        });
        this.setState({
          regionOptions: regions
        });
      });
  }

  getDivisionOptions(region) {
    getJsonData(`v1/geoData/divisions?region=${encodeURIComponent(region.label)}`)
      .then(data => {
        const divisions = data.data.map((division) => {
          return {
            value: division.attributes.division,
            label: division.attributes.division
          };
        });
        this.setState({
          divisionOptions: divisions
        });
      });
  }

  getBranchOptions(division) {
    getJsonData(`v1/geoData/branches?division=${encodeURIComponent(division.label)}`)
      .then(data => {
        const branches = data.data.map((branch) => {
          return {
            value: branch.attributes.branch,
            label: branch.attributes.branch
          };
        });
        this.setState({
          branchOptions: branches
        });
      });
  }

  handleRegionChange(option) {
    this.getDivisionOptions(option);
    this.setState({
      selectedRegion: option,
      selectedDivision: null
    });
    this.props.setRegion(option.label);
  }

  handleDivisionChange(option) {
    this.getBranchOptions(option);
    this.setState({
      selectedDivision: option,
      selectedBranch: null
    });
    this.props.setDivision(option.label);
  }

  handleBranchChange(option) {
    // this.getGrowerOptions(option);
    this.setState({
      selectedBranch: option,
      selectedGrower: null
    });
    this.props.setBranch(option.label);
  }

  render() {
    const {selectedRegion, selectedDivision, selectedBranch} = this.state;
    return (
      <header id="App-header">
        <a href="/" className="home-link">
          <div className="appLogo">
            <img src={NutrienLogo} alt="nutrien"/>
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
            value={selectedDivision}
            onChange={this.handleDivisionChange}
            options={this.state.divisionOptions}
            className="selectMenu"
            placeholder="Select Division..."
          />
          <Select
            value={selectedBranch}
            onChange={this.handleBranchChange}
            options={this.state.branchOptions}
            className="selectMenu"
            placeholder="Select Branch..."
          />
        </div>
      </header>
    )
  }
}

export default Header;