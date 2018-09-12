import React, { Component } from 'react';

export class Header extends Component {

  render() {
    return (
      <nav id="header-nav" className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <div className="logo navbar-brand">
              <i className="fa fa-globe" aria-hidden="true"></i>
              <a href="{{urlRoot}}" className="home-link">
              <span id="dashboard-title" className="app-title light">Project<span
                className="semibold">BlueZone</span></span>
              </a>
            </div>
          </div>

        </div>
      </nav>
    )
  }
}

export default Header;