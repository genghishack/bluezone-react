import React, {Component} from 'react';
import { connect } from "react-redux";
import "./Header.css";
import NutrienLogo from "../assets/nutrien_logo.jpg";
import closeSVG from "../assets/close_icon.png";
import {farmTreeClick} from '../redux/actions/entities';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.farmTreeClick = this.farmTreeClick.bind(this);
    this.closeClick = this.closeClick.bind(this);
  }

  farmTreeClick() {
    this.props.dispatch(farmTreeClick(true));
  }
  closeClick() {
    this.props.dispatch(farmTreeClick(false));
  }

  render() {
    const farmTreeButton = this.props.showFarmTree ?
      <img className="farmTreeClose" src={closeSVG} alt="close" onClick={this.closeClick}></img> :
      <div className="farmTreeButton" onClick={this.farmTreeClick}>Farm Tree</div>;
    return (
      <header id="App-header">
        <a href="/" className="home-link">
          <div className="appLogo">
            <img src={NutrienLogo} alt="nutrien"/>
          </div>
          <div className="appTitle">
            <span className="light">Schrödinger’s </span>
            <span className="normal">Map</span>
          </div>
        </a>
        {farmTreeButton}
      </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    showFarmTree: state.entities.showFarmTree
  };
}

export default connect(mapStateToProps)(Header);