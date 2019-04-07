import React, {Component} from 'react';
import { connect } from "react-redux";
import ReactMapGl, { NavigationControl } from 'react-map-gl';
import geoViewport from "@mapbox/geo-viewport/index";

import { InfoBox } from './InfoBox/';
import { MenuTree } from './MenuTree/';
import CongressionalDistricts from './Layers/CongressionalDistricts';

import { indexedLegislators, indexedCandidates } from '../utils/data-index';
import bboxes from "../data/bboxes";

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
  // style: "mapbox://styles/genghishack/cjnjjdyk64avs2rqgldz3j2ok", // 2018 congress map
  style: "mapbox://styles/genghishack/cjftwwb9b8kw32sqpariydkrk", // basic
  layerIds: ['districts_hover'],
};

export class CongressMap extends Component {

  constructor(props) {
    super(props);

    this.map = null;
    this.onMapLoad = this.onMapLoad.bind(this);
    this.closeClick = this.closeClick.bind(this);
    this.focusMap = this.focusMap.bind(this);
    this.hoveredDistrictId = null;
    this.legislatorIndex = indexedLegislators();
    this.candidateIndex = indexedCandidates();

    // console.log(this.legislatorIndex);

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

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.selectedState !== this.props.selectedState
    || prevProps.selectedDistrict !== this.props.selectedDistrict) {
      this.filterMap();
    }
  };

  onMapLoad() {
    this.map = this.mapRef.getMap();
    this.setState({ mapLoaded: true });
  }

  updateViewport = viewport => {
    this.setState({ viewport });
  };


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
    /*
    TODO: the mouse is no longer being changed with the new map.
     */
    const { mapLoaded } = this.state;

    if (mapLoaded) {
      const features = this.map.queryRenderedFeatures(evt.point);

      let cursorStyle = '';

      const {layerIds} = mapConf;

      // Make sure the district we are hovering is being displayed by the filter
      const hoveredDistrict = features.filter(feature => {
        return layerIds.indexOf(feature.layer.id) !== -1;
      });

      // console.log('hovered district: ', hoveredDistrict);

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

    this.focusMap(
      district.properties.state,
      district.properties.number
    );

    // this.map.setFeatureState({
    //   source: 'districts2018',
    //   sourceLayer: 'districts',
    //   id: district.id,
    // }, {
    //   color: true
    // });

    this.setState({
      district: district,
      expanded: true
    }, () => {
      // console.log('district: ', district);
      // console.log('source: ', this.map.getSource('composite'));
      // console.log('layer: ', this.map.getLayer('districts'));
    });

  };

  closeClick() {
    /*
     TODO: There's a bug in this which makes whatever district
     is underneath the X become selected when the X is clicked.
    */
    this.setState({expanded: false});
  };

  focusMap = (stateAbbr, districtNum) => {
    let bbox = continentalBbox;
    if (stateAbbr) {
      bbox = bboxes[stateAbbr + districtNum];
    }
    const view = geoViewport.viewport(
      bbox,
      [window.innerWidth / 2.75, window.innerHeight / 2.75]
    );
    this.map.easeTo(view);
  };

  filterMap = () => {

    const {
      selectedState,
      selectedDistrict
    } = this.props;

    // this.filterUnderlyingStyle();
    this.filterDataset();
    this.focusMap(selectedState, selectedDistrict);
  };

  filterUnderlyingStyle = () => {
    const {
      selectedState,
      selectedDistrict
    } = this.props;

    for (var i = 1; i <= 5; i++) {
      let existingFilter = this.map.getFilter('districts_' + i);
      if (existingFilter[0] === 'all') {
        existingFilter = existingFilter[existingFilter.length - 1];
      }
      const filter = ['all'];
      if (selectedState) filter.push(['==', 'state', selectedState]);
      if (selectedDistrict) filter.push(['==', 'number', selectedDistrict]);

      const layerFilter = filter.concat([existingFilter]);
      this.map.setFilter('districts_' + i, layerFilter);
      this.map.setFilter('districts_' + i + '_boundary', layerFilter);
      this.map.setFilter('districts_' + i + '_label', layerFilter);
    }
  };

  filterDataset = () => {
    const {
      selectedState,
      selectedDistrict
    } = this.props;

    let existingFilter = this.map.getFilter('districts_hover');

    if (existingFilter[0] === 'all') {
      existingFilter = existingFilter[existingFilter.length - 1];
    }
    const filter = ['all'];
    if (selectedState) filter.push(['==', 'state', selectedState]);
    if (selectedDistrict) filter.push(['==', 'number', selectedDistrict]);

    const layerFilter = filter.concat([existingFilter]);

    this.map.setFilter('districts_hover', layerFilter);
    this.map.setFilter('districts_boundary', layerFilter);
    this.map.setFilter('districts_label', layerFilter);
    this.map.setFilter('districts_fill', layerFilter);
  };

  render() {
    const { viewport, mapLoaded } = this.state;

    const CongressionalLayer = mapLoaded ? (
      <CongressionalDistricts
        map={this.map}
        legislatorIndex={this.legislatorIndex}
      />
    ) : null;

    return (
      <div id="main-container">

        <MenuTree
          filterMap={this.filterMap}
        />

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
          {CongressionalLayer}

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

function mapStateToProps(state) {
  return {
    currentId: state.entities.currentEntity,
    currentType: state.entities.currentType
  };
}

export default connect(mapStateToProps)(CongressMap);