import React, {Component} from 'react';

import FieldMap from './Map';


class MainContainer extends Component {
  render() {
    return (
      <div id="main-container">
        <FieldMap
          zoom={this.props.zoom}
          center={this.props.center}
          getMapHandle={this.props.getMapHandle}
          region={this.props.region}
          division={this.props.division}
          branch={this.props.branch}
          grower={this.props.grower}
        />
      </div>
    )
  };

}

export default MainContainer;