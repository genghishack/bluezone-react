import React, {Component} from 'react';
import { PropTypes } from "prop-types";
import "./HelpfulMessage.css";

class HelpfulMessage extends Component {
  static propTypes = {
    division: PropTypes.string,
    region: PropTypes.string,
    showMessage: PropTypes.bool
  };
  render() {
    const { region, division, branch, grower, showMessage } = this.props;
    let message = '';
    if (region) {
      if (division) {
        if (branch) {
          if (grower) {
            message = 'Click on a marker to zoom in and see field data';
          } else {
            message = 'Select a grower, or click on a marker to zoom in and see field data';
          }
        } else {
          message = 'Select a branch, or click on a marker to zoom in and see field data';
        }
      } else {
        message = 'Select a division';
      }
    } else {
      message = 'Select a region';
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