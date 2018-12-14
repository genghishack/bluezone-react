import React, {Component} from 'react';

import FieldMap from './Map';


class MainContainer extends Component {
  state = {};

  render() {
    return (
      <div id="main-container">
        <FieldMap
          zoom={this.props.zoom}
          center={this.props.center}
          getMaphandle={this.props.getMapHandle}
        />
      </div>
    )
  };

}

export default MainContainer;