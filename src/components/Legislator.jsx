import React, { Component } from 'react';
import moment from 'moment';

import CurrentLegislatorData from '../data/legislators-current.json';

class Legislator extends Component {

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
    [legislator] = CurrentLegislatorData.filter(leg => {
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

  render() {
    const { id } = this.props;
    const legislator = this.getLegislatorData(id);

    const l = legislator.attributes;

    return (
      <div
        key={ l.fullName }
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

}

export default Legislator;