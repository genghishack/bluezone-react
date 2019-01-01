import React, { Component } from 'react';
import ReactMapboxGl, {
  ZoomControl,
  ScaleControl,
  RotationControl,
} from "react-mapbox-gl";
import {InfoBox} from './InfoBox/';

const mapConf = {
  accessToken: "pk.eyJ1IjoiZ2VuZ2hpc2hhY2siLCJhIjoiZ2x6WjZhbyJ9.P8at90QQiy0C8W_mc21w6Q",
  // style: "mapbox://styles/genghishack/cjga1amoc2xx02ro7nzpv1e7s", // 2017 congress map
  style: "mapbox://styles/genghishack/cjnjjdyk64avs2rqgldz3j2ok", // 2018 congress map
  // style: "mapbox://styles/genghishack/cjftwwb9b8kw32sqpariydkrk", // basic
  rDistrictIds: ['districts_1', 'districts_2', 'districts_3', 'districts_4', 'districts_5', 'districts_fill']
};

const Map = ReactMapboxGl(mapConf);

export class CongressMap extends Component {

  constructor(props) {
    super(props);
    this.closeClick = this.closeClick.bind(this);
    this.mapLoad = this.mapLoad.bind(this);
    this.addGeoJson = this.addGeoJson.bind(this);
    this.addDistrictLabels = this.addDistrictLabels.bind(this);
    this.map = null;
    this.hoveredDistrictId = null;
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
    // this.addGeoJson();
  }

  addGeoJson() {
    this.map.addSource('districts2018', {
      type: 'vector',
      url: 'mapbox://genghishack.cd-116-2018'
    });

    // this.addDistrictBoundaries();

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
        'line-color': '#292929',
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
      'paint': {
        // 'fill-color': '#7b68ee',
        // 'fill-opacity': 1,
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
        'fill-outline-color': 'rgba(128, 128, 128, 0)',
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

  mouseMove = (map, evt) => {
    const features = map.queryRenderedFeatures(evt.point);
    let cursorStyle = '';

    const {rDistrictIds} = mapConf;

    const hoveredDistricts = features.filter(feature => {
      return rDistrictIds.indexOf(feature.layer.id) !== -1;
    });

    if (hoveredDistricts.length) {

      // Make sure the cursor is a pointer over any visible district.
      cursorStyle = 'pointer';

      // remove the hover setting from whatever district was being hovered before
      if (this.hoveredDistrictId) {
        map.setFeatureState({
          source: 'districts2018',
          sourceLayer: 'districts',
          id: this.hoveredDistrictId
        }, {
          hover: false
        });
      }

      // Change the hovered district id to the current one
      this.hoveredDistrictId = hoveredDistricts[0].id;

      // Set hover to true on the currently hovered district
      map.setFeatureState({
        source: 'districts2018',
        sourceLayer: 'districts',
        id: this.hoveredDistrictId
      }, {
        hover: true
      });

    }

    map.getCanvas().style.cursor = cursorStyle;

  };

  mapClick = (map, evt) => {
    const features = map.queryRenderedFeatures(evt.point);

    console.log('features: ', features);

    let district;
    const rFilteredDistricts = features.filter(feature => {
      return mapConf.rDistrictIds.indexOf(feature.layer.id) !== -1;
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