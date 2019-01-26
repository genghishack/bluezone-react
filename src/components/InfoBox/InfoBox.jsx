import React, {Component} from 'react';
import { get } from "lodash";
import { PropTypes } from "prop-types";

import Legislator from '../Legislator';
import Candidate from '../Candidate';

import "./InfoBox.css";

import closeSVG from "../../assets/close_icon.png"
import infoPng from "../../assets/info.png"

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
      candidateIndex,
      expanded
    } = this.props;

    const expandedClass = expanded ? "expanded" : "";
    const districtTitle = (district.properties) ? district.properties.title_long : '';

    if (district.properties) {
      const state = district.properties.state;
      const district_num = parseInt(district.properties.number);
      const rep = legislatorIndex[state].rep[district_num];
      const repCandidate = candidateIndex[state] ? candidateIndex[state].rep[district_num] : '';

      // console.log('repCandidate: ', repCandidate);

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
            {/*<div className="infoBoxTitle">*/}
              {/*<img*/}
                {/*className="infoBoxTitleIcon"*/}
                {/*src={infoPng}*/}
                {/*alt="info"*/}
              {/*></img>*/}
              {/*<h2>Information</h2>*/}
            {/*</div>*/}
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
              {/*{repCandidate ? (*/}
                {/*<section id="rep-candidate-section">*/}
                  {/*<div className="title">Challenger</div>*/}
                  {/*<Candidate*/}
                    {/*data={repCandidate}*/}
                  {/*/>*/}
                {/*</section>*/}
              {/*) : ''}*/}
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
          Please click on a congressional district to display information.
        </div>
      )
    }
  };
}

export default InfoBox;