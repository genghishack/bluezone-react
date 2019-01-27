import React, {Component} from 'react';
import ReactMapGl, { NavigationControl } from 'react-map-gl';
import geoViewport from "@mapbox/geo-viewport/index";

import {InfoBox} from './InfoBox/';
import CongressionalDistricts from './Layers/CongressionalDistricts';

import { indexedLegislators, indexedCandidates } from '../utils/data-index';

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
  layerIds: ['districts_fill'],
};

export class CongressMap extends Component {

  constructor(props) {
    super(props);
    this.map = null;
    this.onMapLoad = this.onMapLoad.bind(this);
    this.closeClick = this.closeClick.bind(this);
    this.hoveredDistrictId = null;
    this.legislatorIndex = indexedLegislators();
    this.candidateIndex = indexedCandidates();
    this.state = {
      viewport: {
        longitude: continental.center[0],
        latitude: continental.center[1],
        zoom: continental.zoom,
        bearing: 0,
        pitch: 0
      },
      mapLoaded: false,
      expanded: false,
      hoveredDistrictId: null,
      district: {},
    };
  }

  onMapLoad() {
    this.map = this.mapRef.getMap();
    this.setState({ mapLoaded: true });
    this.addGeoJson();
  }

  updateViewport = viewport => {
    this.setState({ viewport });
  };

  addGeoJson() {
    this.map.addSource('districts2018', {
      type: 'vector',
      url: 'mapbox://genghishack.cd-116-2018'
    });

    this.addDistrictBoundaries();

    this.addDistrictLabels();

    this.addDistrictFillLayer();

  }

  addDistrictBoundaries() {

    this.map.addLayer({
      'id': 'districts_boundary',
      'type': 'line',
      'source': 'districts2018',
      'source-layer': 'districts',
      'paint': {
        'line-color': 'rgba(128, 128, 128, 0.4)',
        'line-width': 1
      },
      'filter': ['all']
    });

  }

  addDistrictLabels() {

    this.map.addLayer({
      'id': 'districts_label',
      'type': 'symbol',
      'source': 'districts2018',
      'source-layer': 'districts',
      'layout': {
        'text-field': '{title_short}',
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Regular'],
        'text-size': {'base': 1, stops: [[1,8], [7,18]]}
      },
      'paint': {
        'text-color': 'hsl(0, 0%, 27%)',
        'text-halo-color': '#decbe4',
        'text-halo-width': {
          'base': 1,
          'stops': [
            [1,1],
            [8,2]
          ]
        }
      }
    });

  }

  addDistrictFillLayer() {

    this.map.addLayer({
      'id': 'districts_fill',
      'type': 'fill',
      'source': 'districts2018',
      'source-layer': 'districts',
      'filter': ['!=', 'fill', ''],
      'paint': {
        'fill-color': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          'rgba(123, 104, 238, 0.3)', // medium slate blue
          'rgba(0, 0, 0, 0)'
        ],
        // 'fill-opacity': [
        //   'case',
        //   ['boolean', ['feature-state', 'hover'], false],
        //   1,
        //   0.2
        // ],
        // 'fill-outline-color': 'rgba(128, 128, 128, 0.4)',
        'fill-antialias': true
      }
    });

  }

  setHoveredDistrict(district) {

    // remove the hover setting from whatever district was being hovered before
    if (this.hoveredDistrictId) {
      this.map.setFeatureState({
        source: 'districts2018',
        sourceLayer: 'districts',
        id: this.hoveredDistrictId
      }, {
        hover: false
      });
    }

    // Change the hovered district id to the current one
    this.hoveredDistrictId = district[0].id;

    // Set hover to true on the currently hovered district
    this.map.setFeatureState({
      source: 'districts2018',
      sourceLayer: 'districts',
      id: this.hoveredDistrictId
    }, {
      hover: true
    });

  }

  mouseMove = (evt) => {
    const { mapLoaded } = this.state;

    if (mapLoaded) {
      const features = this.map.queryRenderedFeatures(evt.point);

      let cursorStyle = '';

      const {layerIds} = mapConf;

      // Make sure the district we are hovering is being displayed by the filter
      const hoveredDistrict = features.filter(feature => {
        return layerIds.indexOf(feature.layer.id) !== -1;
      });

      // console.log(hoveredDistrict);

      if (hoveredDistrict.length) {

        // Make sure the cursor is a pointer over any visible district.
        cursorStyle = 'pointer';

        this.setHoveredDistrict(hoveredDistrict);

      }

      this.map.getCanvas().style.cursor = cursorStyle;
    }

  };

  mapClick = (evt) => {
    const features = this.map.queryRenderedFeatures(evt.point);

    // console.log('features: ', features);

    const layerIds = mapConf.layerIds;

    let district;
    const rFilteredDistricts = features.filter(feature => {
      return layerIds.indexOf(feature.layer.id) !== -1;
    });
    if (rFilteredDistricts.length) {
      district = rFilteredDistricts[0];
    }

    if (!district) {
      this.setState({
        district: {},
        expanded: false
      });
      return;
    }

    this.props.focusMap(
      district.properties.state,
      district.properties.number
    );

    this.map.setFeatureState({
      source: 'districts2018',
      sourceLayer: 'districts',
      id: district.id,
    }, {
      color: true
    });

    this.setState({
      district: district,
      expanded: true
    }, () => {
      // console.log('district: ', district);
      // console.log('source: ', map.getSource('composite'));
      // console.log('layer: ', map.getLayer('districts'));
    });
  };

  closeClick() {
    /*
     TODO: There's a bug in this which makes whatever district
     is underneath the X become selected when the X is clicked.
    */
    this.setState({expanded: false});
  };

  render() {
    const { viewport, mapLoaded } = this.state;

    // const CongressionalLayer = mapLoaded ? (
    //   <CongressionalDistricts
    //     map={this.map}
    //   />
    // ) : null;

    return (
      <div id="main-container">
        <ReactMapGl
          ref={map => {
            this.mapRef = map;
            this.props.getMapHandle(map);
          }}
          {...viewport}
          width="100%"
          height="100%"
          mapStyle={ mapConf.style }
          mapboxApiAccessToken={ mapConf.accessToken }
          onViewportChange={this.updateViewport}
          onLoad={this.onMapLoad}
          onMouseMove={this.mouseMove}
          onClick={this.mapClick}
        >
          {/*{CongressionalLayer}*/}
          <InfoBox
            district={this.state.district}
            expanded={this.state.expanded}
            closeClick={this.closeClick}
            legislatorIndex={this.legislatorIndex}
            candidateIndex={this.candidateIndex}
          />
          <div style={{position: 'absolute', left: 10, top: 10}}>
            <NavigationControl
              onViewportChange={this.updateViewport}
            />
          </div>
        </ReactMapGl>
      </div>
    )
  }
}

export default CongressMap;