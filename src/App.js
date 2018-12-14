import React, { Component } from 'react';
import './App.less';
import Header from './components/Header';
import MainContainer from './components/MainContainer';

import geoViewport from "@mapbox/geo-viewport/index";

// Use GeoViewport and the window size to determine and appropriate center and zoom for the continental US
const continentalBbox = [-128.8, 23.6, -65.4, 65.2];
const continentalView = (w,h) => {
  return geoViewport.viewport(continentalBbox, [w, h]);
};
const continental = continentalView(window.innerWidth/2, window.innerHeight/2);

class App extends Component {
  state = {
    zoom: [continental.zoom],
    center: continental.center,
  };

  getMapHandle = e => {
    this.map = e;
  };

  render() {
    return (
      <div className="App">
        <Header />
        <MainContainer
          getMapHandle={this.getMapHandle}
          focusMap={this.focusMap}
          zoom={[continental.zoom]}
          center={continental.center}
        />
      </div>
    );
  }

}

export default App;
