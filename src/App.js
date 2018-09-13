import React, { Component } from 'react';
import './App.less';
import Header from './components/Header';
import MainContainer from './components/MainContainer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <MainContainer />
      </div>
    );
  }

}

export default App;
