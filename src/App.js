import React, { Component } from 'react';
import './App.less';
import Header from './components/Header';
import MainContainer from './components/MainContainer';

import states from './data/states.json';
import bboxes from './data/bboxes.json';

let districts = {};
states.map(state => {
  districts[state.USPS] = [];
});
Object.keys(bboxes).map(key => {
  if (key.slice(2,key.length) !== '') {
    districts[key.slice(0,2)].push(key.slice(2,key.length));
  }
});

// console.log(districts);

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header
          states={states}
          districts={districts}
        />
        <MainContainer
          bboxes={bboxes}
        />
      </div>
    );
  }

}

export default App;
