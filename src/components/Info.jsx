import React, { Component } from 'react';

import Legislator from './Legislator';
import Candidate from './Candidate';

class CongressInfo extends Component {

  render() {
    const { district, legislatorIndex, candidateIndex } = this.props;

    // console.log('candidateIndex: ', candidateIndex);

    const districtTitle = (district.properties) ? district.properties.title_long : '';

    if (district.properties) {
      const rep_id = district.properties.rep_id;
      const state = district.properties.state;
      const district_num = parseInt(district.properties.number);
      const rep = legislatorIndex[state].rep[district_num];
      const repCandidate = candidateIndex[state] ? candidateIndex[state].rep[district_num] : '';

      // console.log('repCandidate: ', repCandidate);

      const sens = legislatorIndex[state].sen ? Object.values(legislatorIndex[state].sen) : [];

      // console.log(rep, sens);

      return (
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
          {repCandidate ? (
            <section id="rep-candidate-section">
              <div className="title">Challenger</div>
              <Candidate
              data={repCandidate}
              />
            </section>
          ) : ''}
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

export default CongressInfo;