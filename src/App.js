import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import MyMap from './components/Map';

class App extends Component {

  render() {
    return (
      <div className="App">
      <Header />
      <MyMap />
      </div>
    );
  }

}

export default App;
