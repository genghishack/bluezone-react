import React, { Component } from 'react';
import ReactMapboxGl, {
  Layer,
  Feature,
  ZoomControl,
  ScaleControl,
  RotationControl,
  Popup,
} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZ2VuZ2hpc2hhY2siLCJhIjoiZ2x6WjZhbyJ9.P8at90QQiy0C8W_mc21w6Q"
});

export class MyMap extends Component {

  render() {
    return (
      <Map
        style="mapbox://styles/genghishack/cjga1amoc2xx02ro7nzpv1e7s"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={[-97.000000, 38.000000]}
        zoom={[3.7]}
      >
        <ZoomControl />
        <ScaleControl
          measurement="mi"
        />
        <RotationControl />
      </Map>
    );
  }

}

export default MyMap;