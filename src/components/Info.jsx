import React, { Component } from 'react';

import CurrentLegislators from '../data/legislators-current.json';

class CongressInfo extends Component {

  getLegislatorImg = (id) => {
    const src = 'https://theunitedstates.io/images/congress/225x275/' + id + '.jpg';
    return (
      <img
        src={src}
      />
    );
  };

  getLegislatorData = (id) => {

    let legislator;
    [legislator] = CurrentLegislators.filter(leg => {
      return leg.id.bioguide === id;
    });
    legislator = legislator || {};

    legislator.fullName = '';
    if (legislator.name) {
      legislator.fullName = legislator.name.official_full;
    }
    legislator.partyAbbrev = '';
    if (legislator.terms) {
      const currentTerm = legislator.terms[legislator.terms.length - 1];
      legislator.partyAbbrev = '(' + currentTerm.party[0] + ')';
    }
    legislator.img = '';
    if (legislator.id) {
      legislator.img = this.getLegislatorImg(legislator.id.bioguide);
    }
    // console.log(legislator);

    return legislator;
  };

  getLegislatorDisplay = legislator => {
    return (
      <div className="info">
        <div className="photo">
          { legislator.img }
        </div>
        <div className="name">
          { legislator.fullName }
        </div>
        <div className="party">
          { legislator.partyAbbrev }
        </div>
      </div>
    );
  };

  getInfoDisplay = () => {
    const { district } = this.props;

    const districtTitle = (district.properties) ? district.properties.title_long : ''

    if (district.properties) {
      const rep = this.getLegislatorData(district.properties.rep_id);

      let sens = [];
      const sSenIds = district.properties.sen_ids.replace(/(\[|\]|\")/g, '');
      const rSenIds = sSenIds.split(',');
      rSenIds.forEach(sen_id => {
        sens.push(this.getLegislatorData(sen_id));
      });
      console.log(sens);

      return (
        <div className="congress-info">
          <div className="district-name">
            {districtTitle}
          </div>
          <section id="rep-section">
            <div className="title">Representative</div>
            {this.getLegislatorDisplay(rep)}
          </section>
          <section id="sen-section">
            <div className="title">Senators</div>
            {sens.map(sen => this.getLegislatorDisplay(sen))}
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

  render() {
    return this.getInfoDisplay();
  }
}

export default CongressInfo;