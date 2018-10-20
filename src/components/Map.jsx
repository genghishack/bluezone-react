import React, { Component } from 'react';
import ReactMapboxGl, {
  ZoomControl,
  ScaleControl,
  RotationControl,
} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZ2VuZ2hpc2hhY2siLCJhIjoiZ2x6WjZhbyJ9.P8at90QQiy0C8W_mc21w6Q"
});

export class CongressMap extends Component {

  handleMapLoad = (map, evt) => {
    console.log('map loaded');
  };
  
  handleMouseMove = (map, evt) => {
    const {rDistrictIds} = this.props;
    const features = map.queryRenderedFeatures(evt.point);

    let cursorStyle = '';

    const rFilteredDistricts = features.filter(feature => {
      return rDistrictIds.indexOf(feature.layer.id) !== -1;
    });
    if (rFilteredDistricts.length) {
      cursorStyle = 'pointer';
    }
    map.getCanvas().style.cursor = cursorStyle;
  };

  render() {
    const {
      zoom,
      center,
      handleMapClick,
    } = this.props;

    return (
      <Map
        ref={e => { this.props.getMaphandle(e); }}
        style="mapbox://styles/genghishack/cjga1amoc2xx02ro7nzpv1e7s"
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        attributionControl={false}
        renderWorldCopies={false}
        center={center}
        zoom={zoom}
        onMouseMove={this.handleMouseMove}
        onClick={handleMapClick}
        onStyleLoad={this.handleMapLoad}
      >
        <ZoomControl />
        <ScaleControl
          measurement="mi"
          position={'top-left'}
        />
      </Map>
    );
  }

}

export default CongressMap;