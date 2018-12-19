import React, { Component } from 'react';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import { polys } from "./fields";
import { points } from "./fieldpoints";
import { get } from "lodash";
import { InfoBox } from "./InfoBox/"

const opts = {
  accessToken: "pk.eyJ1IjoiYWdyaWJsZSIsImEiOiJjaW1ubDBxeDMwMGpidTdsdmQwanExMDJ4In0.jUZhBfDP_3zEWdUUWCbQ5w",
  minZoom: 2
}

const Map = ReactMapboxGl(opts);

export class FieldMap extends Component {
  constructor(props) {
    super(props);
    this.closeClick = this.closeClick.bind(this);
    this.aerisCredentials = "dTDYoTwjuurB6gTfchSwy_KDGLAOouT5LqRcKHqbW7aJnwkj5McUPGhZstZdpg";
    this.state = {
      expanded: false,
      fieldProps: null,
      weatherData: null
    }
  }
  getBoundaries(boundingBox) {
    const boundaries = JSON.parse(boundingBox);
    var sw = new mapboxgl.LngLat(boundaries[0], boundaries[1]);
    var ne = new mapboxgl.LngLat(boundaries[2], boundaries[3]);
    return new mapboxgl.LngLatBounds(sw, ne);
  }
  mapLoad(map) {
    map.fitBounds(polys.boundingBox);
  }
  mapClick = (map, e) => {
    if (e) {
      const features = map.queryRenderedFeatures(e.point);
      if (get(features, "[0].properties")) {
        this.setState({
          fieldProps: features[0].properties,
          expanded: true
        });
        const centroidArr = JSON.parse( features[0].properties.centroid);
        const centroid = new mapboxgl.LngLat(centroidArr[0], centroidArr[1]);
        const url = `https://api.aerisapi.com/observations/summary?p=${centroidArr[1]},${centroidArr[0]}&client_id=dTDYoTwjuurB6gTfchSwy&client_secret=KDGLAOouT5LqRcKHqbW7aJnwkj5McUPGhZstZdpg`;
          fetch(url)
            .then(resp => resp.json())
            .then(data => {
              this.setState({ weatherData: data.response[0].periods[0].summary })
            })
            .catch(error => console.log(error));
        // map.fitBounds(this.getBoundaries(features[0].properties.boundingBox));
        map.flyTo({ center: centroid, zoom: 15, speed: 3 })
      }
    }
  }
  closeClick() {
    this.setState({ expanded: false });
  }
  render() {
    const { zoom, center } = this.props;
    return (
      <Map
      ref={e => { this.props.getMaphandle(e); }}
      style="mapbox://styles/mapbox/streets-v9"
      zoom={zoom}
      center={center}
      minZoom={10}
      onStyleLoad={this.mapLoad}
      onClick={this.mapClick}
      onZoom={this.onZoom}
      containerStyle={{
        height: "100%",
        width: "100%"
      }}>
      <GeoJSONLayer
        data={polys}
        fillPaint={{
          'fill-color': 'rgba(100, 149, 237, 0.5)',
          'fill-outline-color': 'rgba(200, 177, 139, 1)',
          'fill-antialias': true
        }}	
        symbolLayout={{
          "text-field": "{fieldName}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-anchor": "bottom"
        }}
        />
        <GeoJSONLayer
          maxZoom={18}
          data={points}
          symbolLayout={{
            "icon-image": "circle-stroked-15"
          }}>
        </GeoJSONLayer>
        <InfoBox
          fieldProps={this.state.fieldProps}
          weatherData={this.state.weatherData}
          expanded={this.state.expanded}
          closeClick={this.closeClick}
        />
      </Map>
    );
  }
}

export default FieldMap;