import React, { Component } from 'react';

export class Header extends Component {

  render() {
    return (
      <header className="App-header">
        <a href="/" className="home-link">
          <div class="App-title">
            <span className="light">Hackathon </span>
            <span className="normal">Congressional Map</span>
          </div>
        </a>
      </header>
    )
  }
}

export default Header;