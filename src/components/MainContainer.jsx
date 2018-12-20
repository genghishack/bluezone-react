import React, {Component} from 'react';

import FieldMap from './Map';


class MainContainer extends Component {
  render() {
    return (
      <div id="main-container">
        <FieldMap
          zoom={this.props.zoom}
          center={this.props.center}
          getMaphandle={this.props.getMapHandle}
          district={this.props.district}
          region={this.props.region}
        />
      </div>
    )
  };

}

export default MainContainer;