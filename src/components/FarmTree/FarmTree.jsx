import React, {Component} from 'react';
import { PropTypes } from "prop-types";
import {getJsonData} from '../../utility/DataHelpers';
import {EntityItem} from '../EntityItem/';
import "./FarmTree.css";

class FarmTree extends Component {
  static propTypes = {
    handleClick: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      regionOptions: []
    };
  }
  componentDidMount() {
    this.getRegionOptions();
  }
  getRegionOptions() {
    getJsonData('v1/geoData/regions')
      .then(data => {
        const regions = data.data.map((region) => {
          return {
            value: region.attributes.region,
            label: region.attributes.region
          };
        });
        this.setState({
          regionOptions: regions
        });
      });
  }
  handleClick() {
    this.props.entityClick
  }

  render() {
    const regionList = this.state.regionOptions.map((region, index) => {
      return <EntityItem key={`region${index}`} name={region.label} type="regions" handleClick={this.props.handleClick} />;
    });
    return (
      <div className="farmTreeWrapper">
        <div>{regionList}</div>
      </div>
    );
  };
}

export default FarmTree;