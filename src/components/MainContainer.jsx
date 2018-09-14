import React, {Component} from 'react';
import MapboxGl from "mapbox-gl";
import CongressInfo from './Info';
import CongressMap from './Map';

class MainContainer extends Component {
  state = {
    feature: {},
    zoom: [3.7],
    center: [-96.000000, 38.000000],
  };

  handleMapClick = (map, evt) => {
    const features = map.queryRenderedFeatures(evt.point);
    console.log(features);
    if (!features.length) {
      this.setState({ feature: {} });
      return;
    }

    const feature = features[0];
    if (feature.sourceLayer !== 'districts') {
      this.setState({ feature: {} });
      return;
    }

    // map.setPaintProperty(
    //   feature.layer.id,
    //   'fill-color',
    //   '#f00',
    // );

    this.setState({
      feature: feature,
    });
  };

  render() {
    return (
      <div id="main-container">
        <CongressMap
          zoom={this.state.zoom}
          center={this.state.center}
          handleMapClick={this.handleMapClick}
        />
        <CongressInfo
          district={this.state.feature}
        />
      </div>
    )
  };

}

export default MainContainer;