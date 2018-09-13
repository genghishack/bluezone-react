import React, { Component } from 'react';

import CurrentLegislators from '../data/legislators-current.json';
import '../App.less';

class CongressInfo extends Component {

  getLegislatorImg = () => {
    const { district } = this.props;

    let src = '';
    if (district.properties) {
      src = 'https://theunitedstates.io/images/congress/225x275/' + district.properties.rep_id + '.jpg';
    }
    return (
      <img
        src={src}
      />
    );
  };

  getLegislatorData = () => {
    const { district } = this.props;

    console.log(district);

    let representative = {};
    let repCurrentTerm = {};
    if (district.properties) {
      [representative] = CurrentLegislators.filter(legislator => {
        return legislator.id.bioguide === district.properties.rep_id;
      });
      const repTerms = representative.terms;
      repCurrentTerm = repTerms[repTerms.length - 1];
    }

    return {
      representative: {
        img: this.getLegislatorImg(),
        name: (representative.name) ? representative.name.official_full : '',
        party: (repCurrentTerm.party) ? '(' + repCurrentTerm.party + ')' : '',
      },
      districtTitle: (district.properties) ? district.properties.title_long : '',
    };
  };

  render() {

    const data = this.getLegislatorData();
    const rep = data.representative;

    return (
      <div className="congress-info">
        <div className="district-name">
          {data.districtTitle}
        </div>
        <div className="rep-info">
          <div className="rep-photo">
            { rep.img }
          </div>
          <div className="rep-name">
            { rep.name }
            <span>{ rep.party }</span>
          </div>
        </div>
      </div>
    )
  }
}

export default CongressInfo;