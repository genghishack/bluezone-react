import React, { Component } from 'react';
import ReactMapboxGl from "react-mapbox-gl";

const opts = {
  accessToken: "pk.eyJ1IjoiYWdyaWJsZSIsImEiOiJjaW1ubDBxeDMwMGpidTdsdmQwanExMDJ4In0.jUZhBfDP_3zEWdUUWCbQ5w",
  minZoom: 3
}
const Map = ReactMapboxGl(opts);

export class FieldMap extends Component {
  render() {
    const { zoom, center } = this.props;
    return (
      <Map
      style="mapbox://styles/mapbox/satellite-v8"
      zoom={zoom}
      center={center}
      minZoom={10}
      containerStyle={{
        height: "100%",
        width: "100%"
      }}>
      </Map>
    );
  }
}

export default FieldMap;