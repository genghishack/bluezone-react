import React, {Component} from 'react';
import MapboxGl from "mapbox-gl";
import geoViewport from '@mapbox/geo-viewport';

import CongressInfo from './Info';
import CongressMap from './Map';

import states from '../data/states.json';
import bboxes from '../data/bboxes.json';

// Use GeoViewport and the window size to determine and appropriate center and zoom for the continental US
const continentalView = (w,h) => {
  return geoViewport.viewport([-128.8, 23.6, -65.4, 50.2], [w, h]);
};
const continental = continentalView(window.innerWidth/2, window.innerHeight/2);

class MainContainer extends Component {
  state = {
    feature: {},
    zoom: [continental.zoom],
    center: continental.center,
  };

  handleMapClick = (map, evt) => {
    const features = map.queryRenderedFeatures(evt.point);

    // console.log(features);

    if (!features.length) {
      this.setState({ feature: {} });
      return;
    }

    const feature = features[0];
    if (feature.sourceLayer !== 'districts') {
      this.setState({ feature: {} });
      return;
    }

    // console.log(feature);
    // console.log(map.getStyle());
    // console.log(map.getFilter('districts_1'));

    this.focusMap(map, feature.properties.state, feature.properties.number);

    this.setState({
      feature: feature,
    });
  };

  filterMap = (map, stateAbbr, districtCode) => {
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
  };

  focusMap = (map, stateAbbr, districtCode) => {
    const view = geoViewport.viewport(
      bboxes[stateAbbr + districtCode],
      [window.innerWidth/2.75, window.innerHeight/2.75]
    );
    map.easeTo(view);
  };

  render() {

    console.log(window.location.hash);

    if (window.location.hash) {
      const hash = window.location.hash;
      const hashData = hash.substring(1).split('&').map(d => d.split('='));
      let state;
      let district;
      hashData.map(d => {
        if (d[0] === 'state') state = d[1];
        if (d[0] === 'district') district = d[1];
      });

      if (state || (state && district)) {
        console.log(state, district);
      }

    }

    return (
      <div id="main-container">
        <CongressMap
          zoom={this.state.zoom}
          center={this.state.center}
          handleMapClick={this.handleMapClick}
        />
        <CongressInfo
          district={this.state.feature}
        />
      </div>
    )
  };

}

export default MainContainer;