import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.less';
import Header from './components/Header';
import CongressMap from './components/Map';

import states from './data/states.json';
import bboxes from './data/bboxes.json';

import { LegislatorIndex } from './utils/data-index';

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
    legislatorIndex: LegislatorIndex(),
  };

  Map = () => (
    <CongressMap
      selectedState={this.state.selectedState}
      selectedDistrict={this.state.selectedDistrict}
      legislatorIndex={this.state.legislatorIndex}
      getMapHandle={this.getMapHandle}
      handleDistrictSelection={this.handleDistrictSelection}
    />
  );

  getMapHandle = (map) => {
    this.map = map;
  };

  handleDistrictSelection = (stateAbbr, districtNum = '') => {
    this.setState({
      selectedState: stateAbbr,
      selectedDistrict: districtNum
    });
  };

  handleYearSelection = (year) => {
    const legislatorIndex = LegislatorIndex(year);
    this.setState({ legislatorIndex });
  };

  render = () => (
    <div className="App">
      <Header
        states={states}
        districts={districts}
        handleYearSelection={this.handleYearSelection}
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
