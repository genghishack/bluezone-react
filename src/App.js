import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import './App.less';
import Header from './components/Header';
import CongressMap from './components/Map';

import states from './data/states.json';
import bboxes from './data/bboxes.json';

let districts = {};
states.forEach(state => {
  districts[state.USPS] = [];
});
Object.keys(bboxes).forEach(key => {
  if (key.slice(2, key.length) !== '') {
    districts[key.slice(0, 2)].push(key.slice(2, key.length));
  }
});

// console.log(districts);

class App extends Component {
  state = {
    selectedState: '',
    selectedDistrict: '',
  };

  Map = () => (
    <CongressMap
      // focusMap={this.focusMap}
      getMapHandle={this.getMapHandle}
      selectedState={this.state.selectedState}
      selectedDistrict={this.state.selectedDistrict}
      handleSelection={this.handleSelection}
    />
  );

  getMapHandle = (map) => {
    this.map = map;
  };

  handleSelection = (stateAbbr, districtNum = '') => {
    this.setState({
      selectedState: stateAbbr,
      selectedDistrict: districtNum
    });
  };

  render = () => (
    <div className="App">
      <Header
        states={states}
        districts={districts}
        handleSelection={this.handleSelection}
      />
      <Router>
        <Switch>
          <Route
            path="/"
            component={this.Map}
          />
        </Switch>
      </Router>
    </div>
  );

}

export default App;
