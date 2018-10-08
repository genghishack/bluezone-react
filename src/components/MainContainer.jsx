import React, {Component} from 'react';

import CongressInfo from './Info';
import CongressMap from './Map';

const rDistrictIds = ['districts_1', 'districts_2', 'districts_3', 'districts_4', 'districts_5'];

class MainContainer extends Component {
  state = {
    district: {},
  };

  handleMapClick = (map, evt) => {
    const features = map.queryRenderedFeatures(evt.point);

    // console.log('features: ', features);

    let district;
    const rFilteredDistricts = features.filter(feature => {
      return rDistrictIds.indexOf(feature.layer.id) !== -1;
    });
    if (rFilteredDistricts.length) {
      district = rFilteredDistricts[0];
    }

    if (!district) {
      this.setState({ district: {} });
      return;
    }

    // console.log('district: ', district);
    // console.log(map.getStyle());
    // console.log(map.getFilter('districts_1'));

    this.props.focusMap(district.properties.state, district.properties.number);

    this.setState({ district });
  };

  render() {

    return (
      <div id="main-container">
        <CongressMap
          zoom={this.props.zoom}
          center={this.props.center}
          handleMapClick={this.handleMapClick}
          rDistrictIds={rDistrictIds}
          getMaphandle={this.props.getMapHandle}
        />
        <CongressInfo
          district={this.state.district}
        />
      </div>
    )
  };

}

export default MainContainer;