import React, { Component } from 'react';
import moment from 'moment';

import CurrentLegislatorData from '../data/legislators-current.json';

class Legislator extends Component {

  getImg = (id) => {
    const src = 'https://theunitedstates.io/images/congress/225x275/' + id + '.jpg';
    return (
      <img
        src={src}
      />
    );
  };

  getLink = (url, text) => {
    return (
      <a href={ url } target="legislator">
        { text }
        <i className="fas fa-external-link-alt"></i>
      </a>
    )
  };

  getData = (id) => {

    let legislator;
    [legislator] = CurrentLegislatorData.filter(leg => {
      return leg.id.bioguide === id;
    });
    legislator = legislator || {};

    legislator.attributes = {
      fullName: '',
      DOB: '',
      partyAbbrev: '',
      imgTag: '',
      links: {
        wikipedia: '',
        bioguide: '',
        website: ''
      }
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

      if (currentTerm.url) {
        legislator.attributes.links.website = this.getLink(currentTerm.url, 'Official Website');
      }
    }

    if (legislator.id) {
      legislator.attributes.imgTag = this.getImg(legislator.id.bioguide);

      const bioguideUrl = 'http://bioguide.congress.gov/scripts/biodisplay.pl?index=' + legislator.id.bioguide;
      legislator.attributes.links.bioguide = this.getLink(bioguideUrl, 'Official Bio');

      const wikipediaUrl = 'http://www.wikipedia.org/wiki/' + legislator.id.wikipedia;
      legislator.attributes.links.wikipedia = this.getLink(wikipediaUrl, 'Wikipedia');
    }
    // console.log(legislator);

    return legislator;
  };

  render() {
    const { id } = this.props;
    const legislator = this.getData(id);

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
          <div className="line heading">
            <div className="name">
              { l.fullName }
            </div>
            <div className="party">
              { l.partyAbbrev }
            </div>
          </div>
          <div className="links">
            <div className="line bioguide">
              { l.links.bioguide }
            </div>
            <div className="line website">
              { l.links.website }
            </div>
            <div className="line wikipedia">
              { l.links.wikipedia }
            </div>
          </div>
          <div className="line">
            <div className="dob">
              { l.DOB }
            </div>
          </div>
        </div>
      </div>
    );
  };

}

export default Legislator;
