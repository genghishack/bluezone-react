import React, {Component} from 'react';
import { connect } from "react-redux";
import { getJsonData, getUSStateJsonData } from '../../utility/DataHelpers';
import { EntityItem } from '../EntityItem/';

export class MenuTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      USStateOptions: [],
    };
  }
  componentDidMount() {
    this.getUSStateOptions();
  }
  getUSStateOptions() {
    const USStateData = getUSStateJsonData();
    // console.log(USStateData);
    const USStates = USStateData.data.map((USState) => {
      return {
        value: USState.attributes.value,
        label: USState.attributes.label
      }
    });
    this.setState({
      USStateOptions: USStates
    });
  }

  render() {
    const showMenuTreeClass = this.props.showMenuTree ? "show" : "";
    const USStateList = this.state.USStateOptions.map((USState, index) => {
      return <EntityItem
        key={`USState${index}`}
        name={USState.label}
        value={USState.value}
        type="states"
      />;
    });
    // console.log(USStateList);
    return (
      <div className={`menuTreeWrapper ${showMenuTreeClass}`}>
        <div>{USStateList}</div>
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