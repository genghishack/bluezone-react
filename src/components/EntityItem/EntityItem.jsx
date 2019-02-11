import React, {Component} from 'react';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getJsonData, getCongressionalDistrictJsonData } from '../../utility/DataHelpers';
import darkChevron from "../../assets/chevron.svg"
import lightChevron from "../../assets/light_chevron.svg"
import {setCurrentEntity, menuTreeClick} from '../../redux/actions/entities';

class EntityItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string
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
    if (this.props.type === 'states') {
      const USStateDistricts = getCongressionalDistrictJsonData(this.props.value);
      // console.log(USStateDistricts);
      this.setState({
        children: USStateDistricts.data,
        childrenType: 'districts'
      });
    }
  }

  entityClick() {
    this.props.dispatch(menuTreeClick(false));
    this.props.dispatch(setCurrentEntity({id: this.props.id || this.props.name, type: this.props.type}));
  }

  render() {
    const openClass = this.state.open ? "open" : "closed";
    const children = this.state.children.map((entity, index) => {
      return (
        <EntityItemExport
          key={`entity${index}`}
          id={entity.attributes.value}
          name={entity.attributes.label}
          type={this.state.childrenType}
        />
      );
    });
    const hideChevron = this.props.type === "districts" ? "hidden" : "";
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
            <img
              className={`entityChevron ${openClass}`}
              src={chevron}
              alt="chevron"
              onClick={this.handleChevronClick}
            />
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