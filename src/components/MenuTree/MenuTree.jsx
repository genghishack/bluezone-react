import React, {Component} from 'react';
import { connect } from "react-redux";
import { getJsonData, getUSStateJsonData } from '../../utility/DataHelpers';
import { EntityItem } from '../EntityItem/';
import "./MenuTree.css";

export class MenuTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionOptions: [],
      USStateOptions: [],
    };
  }
  componentDidMount() {
    this.getRegionOptions();
    this.getUSStateOptions();
  }
  getUSStateOptions() {
    const USStateData = getUSStateJsonData();
    // console.log(USStateData);
    const USStates = USStateData.map((USState) => {
      return {
        value: USState.USPS,
        label: USState.Name
      }
    });
    this.setState({
      USStateOptions: USStates
    });
  }

  getRegionOptions() {
    getJsonData('v1/geoData/regions')
      .then(data => {
        // console.log(data);
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
    const showMenuTreeClass = this.props.showMenuTree ? "show" : "";
    const regionList = this.state.regionOptions.map((region, index) => {
      return <EntityItem key={`region${index}`} name={region.label} type="regions" />;
    });
    const USStateList = this.state.USStateOptions.map((USState, index) => {
      return <EntityItem
        key={`USState${index}`}
        name={USState.label}
        value={USState.value}
        type="states"
      />;
    });
    console.log(USStateList);
    console.log(regionList);
    return (
      <div className={`menuTreeWrapper ${showMenuTreeClass}`}>
        <div>{USStateList}</div>
        <div>{regionList}</div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    showMenuTree: state.entities.showMenuTree
  };
}

export default connect(mapStateToProps)(MenuTree);