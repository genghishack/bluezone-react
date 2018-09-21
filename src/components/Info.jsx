import React, { Component } from 'react';

import Legislator from './Legislator';

class CongressInfo extends Component {

  render() {
    const { district } = this.props;

    // console.log(district);

    const districtTitle = (district.properties) ? district.properties.title_long : '';

    if (district.properties) {
      const rep_id = district.properties.rep_id;

      const sSenIds = district.properties.sen_ids.replace(/(\[|\]|\")/g, '');
      const rSenIds = sSenIds.split(',');

      return (
        <div className="congress-info">
          <div className="district-name">
            {districtTitle}
          </div>
          <section id="rep-section">
            <div className="title">Representative</div>
            <Legislator
              id={rep_id}
            />
          </section>
          <section id="sen-section">
            <div className="title">Senators</div>
            {rSenIds.map(sen_id => (
              <Legislator
                id={sen_id}
              />
            ))}
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