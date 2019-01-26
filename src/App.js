import React, {Component} from 'react';
import './App.less';
import Header from './components/Header';
import CongressMap from './components/Map';

import states from './data/states.json';
import bboxes from './data/bboxes.json';
import geoViewport from "@mapbox/geo-viewport/index";

// Use GeoViewport and the window size to determine and appropriate center and zoom for the continental US
const continentalBbox = [-128.8, 23.6, -65.4, 50.2];
const continentalView = (w, h) => {
  return geoViewport.viewport(continentalBbox, [w, h]);
};
const continental = continentalView(window.innerWidth / 2, window.innerHeight / 2);

let districts = {};
states.map(state => {
  districts[state.USPS] = [];
});
Object.keys(bboxes).map(key => {
  if (key.slice(2, key.length) !== '') {
    districts[key.slice(0, 2)].push(key.slice(2, key.length));
  }
});

// console.log(districts);

class App extends Component {
  state = {
    selectedState: '',
    selectedDistrict: '',
    zoom: [continental.zoom],
    center: continental.center,
  };

  getMapHandle = e => {
    this.map = e;
  };

  handleSelection = (state, district = '') => {
    this.filterMap(state, district);
    this.focusMap(state, district);
  };

  filterMap = (stateAbbr, districtCode) => {
    const map = this.map.state.map;

    for (var i = 1; i <= 5; i++) {
      let existingFilter = map.getFilter('districts_' + i);
      if (existingFilter[0] === 'all') {
        existingFilter = existingFilter[existingFilter.length - 1];
      }
      const filter = ['all'];
      if (stateAbbr) filter.push(['==', 'state', stateAbbr]);
      if (districtCode) filter.push(['==', 'number', districtCode]);

      const layerFilter = filter.concat([existingFilter]);
      map.setFilter('districts_' + i, layerFilter);
      map.setFilter('districts_' + i + '_boundary', layerFilter);
      map.setFilter('districts_' + i + '_label', layerFilter);
    }

    let existingFilter = map.getFilter('districts_fill');

    if (existingFilter[0] === 'all') {
      existingFilter = existingFilter[existingFilter.length - 1];
    }
    const filter = ['all'];
    if (stateAbbr) filter.push(['==', 'state', stateAbbr]);
    if (districtCode) filter.push(['==', 'number', districtCode]);

    const layerFilter = filter.concat([existingFilter]);

    map.setFilter('districts_fill', layerFilter);
    map.setFilter('districts_boundary', layerFilter);
    map.setFilter('districts_label', layerFilter);
  };

  focusMap = (stateAbbr, districtCode) => {
    const map = this.map.state.map;

    let bbox = continentalBbox;
    if (stateAbbr) {
      bbox = bboxes[stateAbbr + districtCode];
    }
    const view = geoViewport.viewport(
      bbox,
      [window.innerWidth / 2.75, window.innerHeight / 2.75]
    );
    map.easeTo(view);
  };

  render() {
    return (
      <div className="App">
        <Header
          states={states}
          districts={districts}
          handleSelection={this.handleSelection}
        />
        <CongressMap
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
