import React, {Component} from 'react';
import { PropTypes } from "prop-types";

import Legislator from '../Legislator';

import "./InfoBox.css";

import closeSVG from "../../assets/close_icon.png"
import {connect} from "react-redux";

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.closeClick = this.closeClick.bind(this);
  }
  static propTypes = {
    expanded: PropTypes.bool,
    fieldProps: PropTypes.shape({}),
    weatherData: PropTypes.shape({})
  };
  closeClick() {
    this.props.closeClick();
  }
  render() {
    const {
      district,
      legislatorIndex,
      expanded
    } = this.props;

    const expandedClass = expanded ? "expanded" : "";
    const districtTitle = (district.properties) ? district.properties.title_long : '';

    if (district.properties) {
      const state = district.properties.state;
      const district_num = parseInt(district.properties.number, 10);
      const rep = legislatorIndex[state].rep[district_num];

      const sens = legislatorIndex[state].sen ? Object.values(legislatorIndex[state].sen) : [];

      // console.log(rep, sens);

      return (
        <div
          id="info_box_wrapper"
          className={`info_box_wrapper ${expandedClass}`}
        >
          <img
            className="modal_close"
            src={closeSVG}
            alt="close"
            onClick={this.closeClick}
          ></img>
          <div className="field_item_wrapper">
            <img
              className="modal_close"
              src={closeSVG}
              alt="close"
              onClick={this.closeClick}
            ></img>
            <div className="congress-info">
              <div className="district-name">
                {districtTitle}
              </div>
              <section id="rep-section">
                <div className="title">Representative</div>
                <Legislator
                  data={rep}
                />
              </section>
              <section id="sen-section">
                <div className="title">Senators</div>
                {sens.length ?
                  sens.map(sen => (
                      <Legislator
                        key={sen.id.bioguide}
                        data={sen}
                      />
                    )
                  ) : (
                    <div className="no-senators">
                      Commonwealths, Territories and the District of Columbia have no senators.
                    </div>
                  )}
              </section>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="no-info">
        </div>
      )
    }
  };
}

function mapStateToProps(state) {
  return {
    legislatorIndex: state.legislators.legislatorsByState,
  }
}

export default connect(mapStateToProps)(InfoBox);
