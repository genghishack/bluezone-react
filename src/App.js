import React, { Component } from 'react';
import './App.less';
import Header from './components/Header';
import MainContainer from './components/MainContainer';

import geoViewport from "@mapbox/geo-viewport/index";

// Use GeoViewport and the window size to determine and appropriate center and zoom for the continental US
const continentalBbox = [-128.8, 23.6, -65.4, 50.2];
const continentalView = (w,h) => {
  return geoViewport.viewport(continentalBbox, [w, h]);
};
const continental = continentalView(window.innerWidth/2, window.innerHeight/2);

class App extends Component {
  constructor(props) {
    super(props);
    this.setDistrict = this.setDistrict.bind(this);
    this.setRegion = this.setRegion.bind(this);
    this.state = {
      district: null,
      region: null
    }
  }
  state = {
    zoom: [continental.zoom],
    center: continental.center,
  };

  getMapHandle = e => {
    this.map = e;
  };

  setDistrict(district) {
    this.setState({ district: district })
  }
  setRegion(region) {
    this.setState({ region: region })
  }

  render() {
    return (
      <div className="App">
        <Header setDistrict={this.setDistrict} setRegion={this.setRegion} />
        <MainContainer
          getMapHandle={this.getMapHandle}
          focusMap={this.focusMap}
          zoom={[continental.zoom]}
          center={continental.center}
          district={this.state.district}
          region={this.state.region}
        />
      </div>
    );
  }

}

export default App;
