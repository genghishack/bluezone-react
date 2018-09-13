import React, {Component} from 'react';
import MapboxGl from "mapbox-gl";
import CongressInfo from './Info';
import CongressMap from './Map';

class MainContainer extends Component {
  state = {
    feature: {}
  };

  handleMapClick = (map, evt) => {
    const features = map.queryRenderedFeatures(evt.point);
    if (!features.length) {
      this.setState({ feature: {} });
      return;
    }

    const feature = features[0];
    if (feature.sourceLayer !== 'districts') {
      this.setState({ feature: {} });
      return;
    }

    this.setState({ feature });
  };

  render() {
    return (
      <div id="main-container">
        <CongressMap
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