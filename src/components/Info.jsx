import React, { Component } from 'react';

import CurrentLegislators from '../data/legislators-current.json';

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

    let legislator = {};
    let currentTerm = {};
    if (district.properties) {
      [legislator] = CurrentLegislators.filter(thisLegislator => {
        return thisLegislator.id.bioguide === district.properties.rep_id;
      });
      const terms = legislator.terms;
      currentTerm = terms[terms.length - 1];
    }

    return {
      name: (legislator.name) ? legislator.name.official_full : '',
      party: (currentTerm.party) ? '(' + currentTerm.party + ')' : '',
      districtTitle: (district.properties) ? district.properties.title_long : '',
      img: this.getLegislatorImg()
    };
  };

  render() {

    const legislator = this.getLegislatorData();

    return (
      <div className="congress-info">
        <div className="rep-info">
          <div className="rep-photo">
            { legislator.img }
          </div>
          <div class="legislator-name">
            { legislator.name }
            <span>{ legislator.party }</span>
          </div>
          <div class="district-name">
            { legislator.districtTitle }
          </div>
        </div>
      </div>
    )
  }
}

export default CongressInfo;