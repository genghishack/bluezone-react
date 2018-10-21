import React, {Component} from 'react';

import CongressInfo from './Info';
import CongressMap from './Map';

import { indexedLegislators, indexedCandidates } from '../utils/data-index';

const legislatorIndex = indexedLegislators();
const candidateIndex = indexedCandidates();

const rDistrictIds = ['districts_1', 'districts_2', 'districts_3', 'districts_4', 'districts_5'];

class MainContainer extends Component {
  state = {
    district: {},
  };

  handleMapClick = (map, evt) => {
    // set color on a layer
    // map.setPaintProperty('districts_1', 'fill-color', '#0000ff');

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
    // console.log('source: ', map.getSource('composite'));
    // console.log('layer: ', map.getLayer('districts_1'));

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
          getMapHandle={this.props.getMapHandle}
        />
        <CongressInfo
          district={this.state.district}
          legislatorIndex={legislatorIndex}
          candidateIndex={candidateIndex}
        />
      </div>
    )
  };

}

export default MainContainer;