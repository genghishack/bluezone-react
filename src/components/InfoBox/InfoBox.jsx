import React, {Component} from 'react';
import { get } from "lodash";
import { PropTypes } from "prop-types";
import "./InfoBox.css";

import closeSVG from "../../assets/close.svg"

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.closeClick = this.closeClick.bind(this);
  }
  static propTypes = {
    expanded: PropTypes.bool,
    fieldProps: PropTypes.shape({}),
    weatherData: PropTypes.shape({})
  };
  closeClick() {
    this.props.closeClick();
  }
  render() {
    const expandedClass = this.props.expanded ? "expanded" : "";
    return (
      <div id="info_box_wrapper" className={`info_box_wrapper ${expandedClass}`}>
        <img className="modal_close" src={closeSVG} alt="close" onClick={this.closeClick}></img>
        <div className="field_item_wrapper">
          <div className="field_item">
            <span>Field Name: </span>
            {get(this.props.fieldProps, "fieldName", "")}
          </div>
          <div className="field_item">
            <span>Farm Name: </span>
            {get(this.props.fieldProps, "farmName", "")}
          </div>
          <div className="field_item">
            <span>Division: </span>
            {get(this.props.fieldProps, "division", "")}
          </div>
          <div className="field_item">
            <span>Branch: </span>
            {get(this.props.fieldProps, "corporate", "")}
          </div>
          <div className="field_item">
            <span>Region: </span>
            {get(this.props.fieldProps, "region", "")}
          </div>
          <div className="field_item">
            <span>Corporate: </span>
            {get(this.props.fieldProps, "corporate", "")}
          </div>
          <div className="field_item">
            <span>Today's Precip: </span>
            {get(this.props.weatherData, "precip.totalIN", "")} in / {get(this.props.weatherData, "precip.totalMM", "")} mm
          </div>
          <div className="field_item">
            <span>Today's High Temp: </span>
            {get(this.props.weatherData, "temp.maxF", "")} °F / {get(this.props.weatherData, "temp.maxC", "")} °C
          </div>
        </div>
      </div>
    )
  };
}

export default InfoBox;