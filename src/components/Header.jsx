import React, { Component } from 'react';

export class Header extends Component {
  state = {
    selectedState: '',
    selectedDistrict: '',
    possibleDistricts: []
  };

  handleStateSelection = (evt) => {
    const { districts } = this.props;
    this.setState({
      selectedState: evt.target.value,
      selectedDistrict: '',
      possibleDistricts: districts[evt.target.value].sort()
    }, () => {
      // console.log(this.state);
    });
  };

  render() {
    const { states } = this.props;
    return (
      <header id="App-header">
        <a href="/" className="home-link">
          <div className="App-title">
            <span className="light">Hackathon </span>
            <span className="normal">Congressional Map</span>
          </div>
        </a>
        <div className="App-menu">
          <div className="control-title normal">Filter by:</div>
          <div className="selector light">
            <span className="label">State</span>
            <select
              className="state"
              onChange={this.handleStateSelection}
            >
              <option value=""></option>
              {states.map(state => {
                return (
                  <option
                    key={state.USPS}
                    value={state.USPS}>{state.Name}</option>
                );
              })}
            </select>
          </div>
          <div className="selector light">
            <span className="label">District</span>
            <select className="district">
              <option value="" selected></option>
              {this.state.possibleDistricts.map(districtNum => {
                return (
                  <option
                    key={districtNum}
                    value={districtNum}>{districtNum}</option>
                );
              })}
            </select>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;