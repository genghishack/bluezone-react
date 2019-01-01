import React, { Component } from 'react';
import ReactMapboxGl, {
  ZoomControl,
  ScaleControl,
  RotationControl,
} from "react-mapbox-gl";
import {InfoBox} from './InfoBox/';

import { indexedLegislators, indexedCandidates } from '../utils/data-index';

const mapConf = {
  accessToken: "pk.eyJ1IjoiZ2VuZ2hpc2hhY2siLCJhIjoiZ2x6WjZhbyJ9.P8at90QQiy0C8W_mc21w6Q",
  // style: "mapbox://styles/genghishack/cjga1amoc2xx02ro7nzpv1e7s", // 2017 congress map
  // style: "mapbox://styles/genghishack/cjnjjdyk64avs2rqgldz3j2ok", // 2018 congress map
  style: "mapbox://styles/genghishack/cjftwwb9b8kw32sqpariydkrk", // basic
  layerIds: ['districts_fill']
};

const Map = ReactMapboxGl(mapConf);

export class CongressMap extends Component {

  constructor(props) {
    super(props);
    this.closeClick = this.closeClick.bind(this);
    this.mapLoad = this.mapLoad.bind(this);
    this.addGeoJson = this.addGeoJson.bind(this);
    this.addDistrictLabels = this.addDistrictLabels.bind(this);
    this.setHoveredDistrict = this.setHoveredDistrict.bind(this);
    this.map = null;
    this.hoveredDistrictId = null;
    this.legislatorIndex = indexedLegislators();
    this.candidateIndex = indexedCandidates();
    this.state = {
      expanded: false,
      districtProps: null,
      hoveredDistrictId: null,
      district: {},
    }
  }

  componentDidUpdate(prevProps) {

  }

  mapLoad(map) {
    this.map = map;
    this.addGeoJson();
  }

  addGeoJson() {
    this.map.addSource('districts2018', {
      type: 'vector',
      url: 'mapbox://genghishack.cd-116-2018'
    });

    this.addDistrictBoundaries();

    this.addDistrictLabels();

    this.addDistrictFillLayer();

  };

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
          'rgba(123, 104, 238, 0.7)', // medium slate blue
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

  addMouseEvents() {

    this.map.on('mousemove', 'fieldPolygonsLayer', (e) => {
      if (this.hoveredDistrictId) {

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

  mouseMove = (map, evt) => {
    const features = map.queryRenderedFeatures(evt.point);
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

    map.getCanvas().style.cursor = cursorStyle;

  };

  mapClick = (map, evt) => {
    const features = map.queryRenderedFeatures(evt.point);

    console.log('features: ', features);

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

    map.setFeatureState({
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
      console.log('district: ', district);
      // console.log('source: ', map.getSource('composite'));
      // console.log('layer: ', map.getLayer('districts'));
    });
  };

  closeClick() {
    this.setState({expanded: false});
  };

  render() {
    const {
      zoom,
      center,
      handleMapClick,
    } = this.props;

    return (
      <div id="main-container">
        <Map
          ref={e => { this.props.getMapHandle(e); }}
          style={ mapConf.style }
          containerStyle={{
            height: "100%",
            width: "100%"
          }}
          attributionControl={false}
          renderWorldCopies={false}
          center={center}
          zoom={zoom}
          onMouseMove={this.mouseMove}
          onClick={this.mapClick}
          onStyleLoad={this.mapLoad}
        >
          <InfoBox
            district={this.state.district}
            expanded={this.state.expanded}
            closeClick={this.closeClick}
            legislatorIndex={this.legislatorIndex}
            candidateIndex={this.candidateIndex}
          />
          <ZoomControl
            position={'top-left'}
          />
          <ScaleControl
            measurement="mi"
            position={'bottom-left'}
          />
        </Map>
      </div>
    );
  }

}

export default CongressMap;