import React, {Component} from 'react';
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.less';
import Header from './components/Header';
import CongressMap from './components/Map';
import Config from './config';

import states from './data/states.json';

import {LegislatorIndex} from './utils/data-index';
import {setBBoxes, setDistrictsByState} from "./redux/actions/states";
import {setError} from "./redux/actions/errors";

const apiConfig = Config.apiGateway;

class App extends Component {
  state = {
    selectedState: '',
    selectedDistrict: '',
    legislatorIndex: LegislatorIndex(),
  };

  componentDidMount = () => {
    fetch(`${apiConfig.URL}/public/state/districts`)
      .then(res => res.json())
      .then(
        (result) => {
          this.props.dispatch(setDistrictsByState(result.data));
        },
        (error) => {
          this.props.dispatch(setError(error));
        }
      );
    fetch(`${apiConfig.URL}/public/state/bboxes`)
      .then(res => res.json())
      .then(
        (result) => {
          this.props.dispatch(setBBoxes(result.data));
        },
        (error) => {
          this.props.dispatch(setError(error));
        }
      )
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
    this.setState({legislatorIndex});
  };

  render = () => {
    const { districts } = this.props;
    return (
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
    )
  };

}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    districts: state.states.districtsByState
  };
}

export default connect(mapStateToProps)(App);
