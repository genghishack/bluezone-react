import React, { Component } from 'react';

class Candidate extends Component {

  getLink = (url, text) => {
    return (
      <a href={ url } target="candidate">
        { text }
        <i className="fas fa-external-link-alt"></i>
      </a>
    )
  };

  getModel = candidate => {

    candidate.attributes = {
      fullName: '',
      partyAbbrev: '',
      links: {
        website: ''
      }
    };

    if (candidate.name) {
      candidate.attributes.fullName = candidate.name.official_full;
    }

    if (candidate.campaign) {
      const campaign = candidate.campaign;
      candidate.attributes.partyAbbrev = '(' + campaign.party[0] + ')';

      if (campaign.url) {
        candidate.attributes.links.website = this.getLink(campaign.url, 'Campaign Website');
      }
    }
    // console.log(candidate);

    return candidate;
  };

  render() {
    const { data } = this.props;
    // console.log(data);
    const candidate = this.getModel(data);

    const c = candidate.attributes;

    return (
      <div
        key={ c.fullName }
        className="info"
      >
        <div className="column">
          <div className="line heading">
            <div className="name">
              { c.fullName }
            </div>
            <div className="party">
              { c.partyAbbrev }
            </div>
          </div>
          <div className="links">
            <div className="line bioguide">
              { c.links.bioguide }
            </div>
            <div className="line website">
              { c.links.website }
            </div>
            <div className="line wikipedia">
              { c.links.wikipedia }
            </div>
          </div>
          <div className="line">
            <div className="dob">
              { c.DOB }
            </div>
          </div>
        </div>
      </div>
    );
  };

}

export default Candidate;
