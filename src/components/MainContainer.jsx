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

    const view = geoViewport.viewport(bboxes[feature.properties.state + feature.properties.number], [window.innerWidth/3, window.innerHeight/3])
    map.easeTo(view);

    this.setState({
      feature: feature,
    });
  };

  render() {

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