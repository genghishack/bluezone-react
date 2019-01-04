import React, {Component} from 'react';
import { connect } from "react-redux";
import {getJsonData} from '../utility/DataHelpers';
import "./Header.css";
import NutrienLogo from "../assets/nutrien_logo.jpg";
import closeSVG from "../assets/close_icon.png";
import {farmTreeClick} from '../redux/actions/entities';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleDivisionChange = this.handleDivisionChange.bind(this);
    this.handleBranchChange = this.handleBranchChange.bind(this);
    this.handleGrowerChange = this.handleGrowerChange.bind(this);
    this.farmTreeClick = this.farmTreeClick.bind(this);
    this.closeClick = this.closeClick.bind(this);
    this.state = {
      divisionOptions: [{value: null, label: "Please select region first"}],
      branchOptions: [{value: null, label: "Please select division first"}],
      growerOptions: [{value: null, label: "Please select branch first"}]
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

  getGrowerOptions(branch) {
    getJsonData(`v1/geoData/growers?branch=${encodeURIComponent(branch.label)}`)
      .then(data => {
        const growers = data.data.map((grower) => {
          return {
            value: grower.attributes.growerId,
            label: grower.attributes.growerName
          };
        });
        this.setState({
          growerOptions: growers
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
    this.getGrowerOptions(option);
    this.setState({
      selectedBranch: option,
      selectedGrower: null
    });
    this.props.setBranch(option.label);
  }

  handleGrowerChange(option) {
    this.setState({
      selectedGrower: option,
    });
    this.props.setGrower(option.value);
  }

  farmTreeClick() {
    this.props.dispatch(farmTreeClick(true));
  }
  closeClick() {
    this.props.dispatch(farmTreeClick(false));
  }

  render() {
    const farmTreeButton = this.props.showFarmTree ?
      <img className="farmTreeClose" src={closeSVG} alt="close" onClick={this.closeClick}></img> :
      <div className="farmTreeButton" onClick={this.farmTreeClick}>Farm Tree</div>;
    return (
      <header id="App-header">
        <a href="/" className="home-link">
          <div className="appLogo">
            <img src={NutrienLogo} alt="nutrien"/>
          </div>
          <div className="appTitle">
            <span className="light">Schrödinger’s </span>
            <span className="normal">Map</span>
          </div>
        </a>
        {farmTreeButton}
      </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    showFarmTree: state.entities.showFarmTree
  };
}

export default connect(mapStateToProps)(Header);