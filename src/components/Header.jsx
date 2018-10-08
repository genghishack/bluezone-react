import React, { Component } from 'react';

export class Header extends Component {
  state = {
    selectedState: '',
    selectedDistrict: '',
    possibleDistricts: []
  };

  handleStateSelection = evt => {
    const { districts } = this.props;
    this.setState({
      selectedState: evt.target.value,
      selectedDistrict: '',
      possibleDistricts: (districts[evt.target.value]) ? districts[evt.target.value].sort() : []
    }, () => {
      // console.log(this.state);
      this.props.handleSelection(this.state.selectedState);
    });
  };

  handleDistrictSelection = evt => {
    this.setState({ selectedDistrict: evt.target.value }, () => {
      // console.log(this.state);
      this.props.handleSelection(this.state.selectedState, this.state.selectedDistrict);
    })
  };

  render() {
    const { states } = this.props;
    return (
      <header id="App-header">
        <a href="/" className="home-link">
          <div className="App-logo">
            <i className="fas fa-globe"></i>
          </div>
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
            <select
              className="district"
              onChange={this.handleDistrictSelection}
            >
              <option value=""></option>
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