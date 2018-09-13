import React, { Component } from 'react';

export class Header extends Component {

  render() {
    return (
      <header className="App-header">
        <a href="/" className="home-link">
          <span className="App-title">Congressional Map</span>
        </a>
      </header>
    )
  }
}

export default Header;