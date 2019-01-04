import React, {Component} from 'react';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {getJsonData} from '../../utility/DataHelpers';
import {EntityItem} from '../EntityItem/';
import "./FarmTree.css";

class FarmTree extends Component {
  static propTypes = {
    handleClick: PropTypes.func,
    showFarmTree: PropTypes.bool,
    currentId: PropTypes.string
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
  render() {
    const showFarmTreeClass = this.props.showFarmTree ? "show" : "";
    const regionList = this.state.regionOptions.map((region, index) => {
      return <EntityItem key={`region${index}`} name={region.label} type="regions" handleClick={this.props.handleClick} />;
    });
    return (
      <div className={`farmTreeWrapper ${showFarmTreeClass}`}>
        <div>{regionList}</div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    showFarmTree: state.entities.showFarmTree
  };
}

export default connect(mapStateToProps)(FarmTree);