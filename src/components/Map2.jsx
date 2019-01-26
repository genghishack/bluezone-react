import React, {Component} from 'react';
import ReactMapGl from 'react-map-gl';

import geoViewport from "@mapbox/geo-viewport/index";

// Use GeoViewport and the window size to determine an
// appropriate center and zoom for the continental US
const continentalBbox = [-128.8, 23.6, -65.4, 50.2];
const continentalView = (w, h) => {
  return geoViewport.viewport(continentalBbox, [w, h]);
};
const continental = continentalView(window.innerWidth / 2, window.innerHeight / 2);

const mapConf = {
  accessToken: "pk.eyJ1IjoiZ2VuZ2hpc2hhY2siLCJhIjoiZ2x6WjZhbyJ9.P8at90QQiy0C8W_mc21w6Q",
  // style: "mapbox://styles/genghishack/cjga1amoc2xx02ro7nzpv1e7s", // 2017 congress map
  style: "mapbox://styles/genghishack/cjnjjdyk64avs2rqgldz3j2ok", // 2018 congress map
  // style: "mapbox://styles/genghishack/cjftwwb9b8kw32sqpariydkrk", // basic
};

export class CongressMap2 extends Component {

  constructor(props) {
    super(props);
    this.map = null;
    this.onMapLoad = this.onMapLoad.bind(this);
    this.state = {
      viewport: {
        longitude: continental.center[0],
        latitude: continental.center[1],
        zoom: continental.zoom,
        bearing: 0,
        pitch: 0
      },
      mapLoaded: false,
    };
  }

  onMapLoad() {
    this.map = this.mapRef.getMap();
    this.setState({ mapLoaded: true });
  }

  updateViewport = viewport => {
    this.setState({ viewport });
  };

  render() {
    const { viewport, mapLoaded } = this.state;
    return (
      <div id="main-container">
        <ReactMapGl
          ref={map => {
            this.mapRef = map;
          }}
          {...viewport}
          width="100%"
          height="100%"
          mapStyle={ mapConf.style }
          mapboxApiAccessToken={ mapConf.accessToken }
          onViewportChange={this.updateViewport}
          onLoad={this.onMapLoad}
        >
        </ReactMapGl>
      </div>
    )
  }
}

export default CongressMap2;