import React, { Component } from 'react';
import './App.less';
import Header from './components/Header';
import FieldMap from './components/Map';

import geoViewport from "@mapbox/geo-viewport/index";

// Use GeoViewport and the window size to determine an appropriate center and zoom for the continental US
const continentalBbox = [-128.8, 23.6, -65.4, 60.2];
const continentalView = (w,h) => {
  return geoViewport.viewport(continentalBbox, [w, h]);
};
const continental = continentalView(window.innerWidth/2, window.innerHeight/2);

class App extends Component {
  constructor(props) {
    super(props);
    this.setDivision = this.setDivision.bind(this);
    this.setRegion = this.setRegion.bind(this);
    this.setBranch = this.setBranch.bind(this);
    this.setGrower = this.setGrower.bind(this);
    this.state = {
      region: null,
      division: null,
      branch: null,
      grower: null
    }
  }
  state = {
    zoom: [continental.zoom],
    center: continental.center,
  };

  getMapHandle = e => {
    this.map = e;
  };

  setRegion(region) {
    this.setState({ region: region });
  }

  setDivision(division) {
    this.setState({ division: division });
  }

  setBranch(branch) {
    this.setState({ branch: branch });
  }

  setGrower(grower) {
    this.setState({ grower: grower });
  }

  render() {
    return (
      <div className="App">
        <Header
          setRegion={this.setRegion}
          setDivision={this.setDivision}
          setBranch={this.setBranch}
          setGrower={this.setGrower}
        />
        <FieldMap
          getMapHandle={this.getMapHandle}
          focusMap={this.focusMap}
          zoom={[continental.zoom]}
          center={continental.center}
          region={this.state.region}
          division={this.state.division}
          branch={this.state.branch}
          grower={this.state.grower}
        />
      </div>
    );
  }

}

export default App;
