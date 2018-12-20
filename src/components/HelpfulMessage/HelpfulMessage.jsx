import React, {Component} from 'react';
import { PropTypes } from "prop-types";
import "./HelpfulMessage.css";

class HelpfulMessage extends Component {
  static propTypes = {
    district: PropTypes.string,
    region: PropTypes.string,
    showMessage: PropTypes.bool
  };
  render() {
    const { district, region, showMessage } = this.props;
    let message = region ? "Select a district" : "Select a region";
    if (district) {
      message = "Click on marker to zoom in and see field data";
    }
    const hidden = !showMessage ? "hidden" : "";
    return (
      <div id="helpfulMessage" className={`helpfulMessage ${hidden}`}>
        {message}
      </div>
    )
  };
}

export default HelpfulMessage;