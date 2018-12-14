import React, { Component } from 'react';

export class Header extends Component {
  state = {
  };

  render() {
    return (
      <header id="App-header">
        <a href="/" className="home-link">
          <div className="App-logo">
            <i className="fas fa-globe"></i>
          </div>
          <div className="App-title">
            <span className="light">Schroedinger’s </span>
            <span className="normal">Map</span>
          </div>
        </a>
      </header>
    )
  }
}

export default Header;