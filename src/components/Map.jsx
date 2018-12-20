import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import { get } from "lodash";
import bbox from '@turf/bbox';
// import buffer from '@turf/buffer';
import { InfoBox } from "./InfoBox/"
import { HelpfulMessage } from "./HelpfulMessage/"
import { ZoomControl, ScaleControl } from 'react-mapbox-gl';

import { createGeoJsonPolys, createGeoJsonPoints } from "../utility/MapHelpers";

const opts = {
  accessToken: "pk.eyJ1IjoiYWdyaWJsZSIsImEiOiJjaW1ubDBxeDMwMGpidTdsdmQwanExMDJ4In0.jUZhBfDP_3zEWdUUWCbQ5w",
  minZoom: 2
}

const Map = ReactMapboxGl(opts);

export class FieldMap extends Component {
  constructor(props) {
    super(props);
    this.closeClick = this.closeClick.bind(this);
    this.mapLoad = this.mapLoad.bind(this);
    this.aerisCredentials = "dTDYoTwjuurB6gTfchSwy_KDGLAOouT5LqRcKHqbW7aJnwkj5McUPGhZstZdpg";
    this.map = null;
    this.state = {
      expanded: false,
      fieldProps: null,
      weatherData: null,
      polys: null,
      points: null,
      showMessage: true
    }
  }
  static propTypes = {
    district: PropTypes.string,
    region: PropTypes.string,
    zoom: PropTypes.arrayOf(PropTypes.number),
    center: PropTypes.arrayOf(PropTypes.number)
  };
  mapLoad(map) {
    this.map = map;
  }
  handleMouseMove = (map, evt) => {
    const features = map.queryRenderedFeatures(evt.point);
    let cursorStyle = '';
    if (features.length > 0) {
      cursorStyle = 'pointer';
    }
    map.getCanvas().style.cursor = cursorStyle;
  };
  mapClick = (map, e) => {
    if (e) {
      const features = map.queryRenderedFeatures(e.point);
      if (get(features, "[0].properties")) {
        this.setState({
          fieldProps: features[0].properties,
          expanded: true,
          showMessage: false
        });
        const centroidJson = JSON.parse(features[0].properties.centroid);
        const url = `https://api.aerisapi.com/observations/summary?p=${centroidJson.coordinates[1]},${centroidJson.coordinates[0]}&client_id=dTDYoTwjuurB6gTfchSwy&client_secret=KDGLAOouT5LqRcKHqbW7aJnwkj5McUPGhZstZdpg`;
          fetch(url)
            .then(resp => resp.json())
            .then(data => {
              this.setState({ weatherData: data.response[0].periods[0].summary })
            })
            .catch(error => console.log(error));
        map.flyTo({ center: centroidJson.coordinates, zoom: 15, speed: 3 })
      }
    }
  }
  closeClick() {
    this.setState({ expanded: false });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.district !== this.props.district && this.props.district) {
      const districtId = encodeURIComponent(this.props.district);
      const url = `http://localhost:4000/v1/geoData/division/${districtId}`;
      fetch(url, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'allow',
            'x-api-key' : 'Q1GG6AytvH471DnYzeCjj5lXOwoDEZgB1REqR7vD'
          }
        })
          .then(resp => resp.json())
          .then(data => {
            const featureCollectionPolys = createGeoJsonPolys(data.data);
            const featureCollectionPoints = createGeoJsonPoints(data.data);
            const extent = bbox(featureCollectionPolys);
            this.setState({ polys: featureCollectionPolys });
            this.setState({ points: featureCollectionPoints });
            this.map.fitBounds(extent);
          })
          .catch(error => console.log(error));
    }
  }
  render() {
    const { zoom, center } = this.props;
    return (
      <Map
      ref={e => { this.props.getMaphandle(e); }}
      style="mapbox://styles/sdfricke1986/cjpw30wsz1u6f2rla9zn3ge5r"
      zoom={zoom}
      center={center}
      minZoom={10}
      onStyleLoad={this.mapLoad}
      onClick={this.mapClick}
      onMouseMove={this.handleMouseMove}
      containerStyle={{
        height: "100%",
        width: "100%"
      }}>
      <GeoJSONLayer
        data={this.state.polys}
        fillOnMouseEnter={this.mouseEnter}
        fillPaint={{
          'fill-color': 'rgba(167, 199, 130, 0.7)',
          'fill-outline-color': 'rgba(0, 0, 0, 1)',
          'fill-antialias': true,
        }}
        />
        <GeoJSONLayer
          maxZoom={18}
          data={this.state.points}
          symbolLayout={{
            "icon-image": "marker-15",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-field": "{fieldName}",
            "text-anchor": "bottom",
            "text-offset": [1, 0]
          }}
          symbolPaint={{
            "text-color": 'rgba(255, 255, 255, 1)',
            "text-halo-color": 'rgba(0, 0, 0, 1)',
            "text-halo-width": 1
          }}
        >
        </GeoJSONLayer>
        <InfoBox
          fieldProps={this.state.fieldProps}
          weatherData={this.state.weatherData}
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
        <HelpfulMessage
          region={this.props.region}
          district={this.props.district}
          showMessage={this.state.showMessage}
        />
      </Map>
    );
  }
}

export default FieldMap;