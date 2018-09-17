import React, { Component } from 'react';
import moment from 'moment';

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

    legislator.attributes = {
      fullName: '',
      DOB: '',
      partyAbbrev: '',
      imgTag: ''
    };

    if (legislator.name) {
      legislator.attributes.fullName = legislator.name.official_full;
    }
    if (legislator.bio) {
      legislator.attributes.DOB = 'DOB: ' + moment(legislator.bio.birthday).format('MMMM Do, YYYY');
    }
    if (legislator.terms) {
      const currentTerm = legislator.terms[legislator.terms.length - 1];
      legislator.attributes.partyAbbrev = '(' + currentTerm.party[0] + ')';
    }
    if (legislator.id) {
      legislator.attributes.imgTag = this.getLegislatorImg(legislator.id.bioguide);
      const wikipediaUrl = 'http://www.wikipedia.org/wiki/' + legislator.id.wikipedia;
      legislator.attributes.wikipediaLink = (<a href={ wikipediaUrl } target="legislator">Wikipedia</a>)
    }
    // console.log(legislator);

    return legislator;
  };

  getLegislatorDisplay = legislator => {

    const l = legislator.attributes;

    return (
      <div
        // key={ legislator.id.bioguide }
        className="info"
      >
        <div className="photo">
          { l.imgTag }
        </div>
        <div className="column">
          <div className="line">
            <div className="name">
              { l.fullName }
            </div>
            <div className="party">
              { l.partyAbbrev }
            </div>
          </div>
          <div className="line">
            <div className="dob">
              { l.DOB }
            </div>
          </div>
          <div className="line">
            <div className="wikipedia">
              { l.wikipediaLink }
            </div>
          </div>
        </div>
      </div>
    );
  };

  getInfoDisplay = () => {
    const { district } = this.props;

    // console.log(district);

    const districtTitle = (district.properties) ? district.properties.title_long : ''

    if (district.properties) {
      const rep = this.getLegislatorData(district.properties.rep_id);

      let sens = [];
      const sSenIds = district.properties.sen_ids.replace(/(\[|\]|\")/g, '');
      const rSenIds = sSenIds.split(',');
      rSenIds.forEach(sen_id => {
        sens.push(this.getLegislatorData(sen_id));
      });
      // console.log(sens);

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