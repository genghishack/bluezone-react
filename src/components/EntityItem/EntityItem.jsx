import React, {Component} from 'react';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {getJsonData} from '../../utility/DataHelpers';
import darkChevron from "../../assets/chevron.svg"
import lightChevron from "../../assets/light_chevron.svg"

import "./EntityItem.css";

class EntityItem extends Component {
  static propTypes = {
    name: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.handleChevronClick = this.handleChevronClick.bind(this);
    this.entityClick = this.entityClick.bind(this);
    this.state = {
      children: [],
      childrenType: null,
      open: false
    };
  }

  handleChevronClick() {
    this.setState({ open: !this.state.open });
    if (this.props.type === "regions") {
      getJsonData(`v1/geoData/divisions?region=${encodeURIComponent(this.props.name)}`)
      .then(data => {
        this.setState({
          children: data.data,
          childrenType: "divisions"
        })
      });
    }
    else if (this.props.type === "divisions") {
      getJsonData(`v1/geoData/branches?division=${encodeURIComponent(this.props.name)}`)
      .then(data => {
        this.setState({
          children: data.data,
          childrenType: "branches"
        })
      });
    }
    else if (this.props.type === "branches") {
      getJsonData(`v1/geoData/growers?branch=${encodeURIComponent(this.props.name)}`)
      .then(data => {
        this.setState({
          children: data.data,
          childrenType: "growers"
        })
      });
    }
  }

  entityClick() {
    this.props.handleClick(this.props.type, this.props.id || this.props.name);
  }

  render() {
    const openClass = this.state.open ? "open" : "closed";
    const children = this.state.children.map((entity, index) => {
      return (
        <EntityItemExport
          key={`entity${index}`}
          id={entity.attributes.growerId}
          name={entity.attributes.division || entity.attributes.branch || entity.attributes.growerName}
          type={this.state.childrenType}
          handleClick={this.props.handleClick}
        />
      );
    });
    const hideChevron = this.props.type === "growers" ? "hidden" : "";
    const entityId = this.props.id || this.props.name;
    const activeClass = this.props.currentId === entityId ? "active" : "";
    const chevron = this.props.currentId === entityId ? lightChevron : darkChevron;
    return (
      <div className="entityItem">
        <div className={`entityNameAndChevron ${activeClass}`}>
          <div className="entityName" onClick={this.entityClick}>
            <span>{this.props.name}</span>
          </div>
          <div className={`chevronContainer ${hideChevron}`}>
            <img className={`entityChevron ${openClass}`} src={chevron} alt="chevron" onClick={this.handleChevronClick}></img>
          </div>
        </div>
        <div className={`entityChildren ${openClass}`}>
          {children}
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    currentId: state.entities.currentEntity
  };
}

const EntityItemExport = connect(mapStateToProps)(EntityItem);

export default EntityItemExport;