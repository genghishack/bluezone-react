import React, { Component } from 'react';

export class CongressionalDistricts extends Component {
  constructor(props) {
    super(props);
    this.addLayer = this.addLayer.bind(this);
  }

  componentDidMount() {
    this.addLayer();
  }

  addLayer() {
    console.log(this.props.map);
    this.props.map.addSource('districts_boundary', {
      type: 'vector',
      url: 'mapbox://genghishack.cd-116-2018'
    });
    this.props.map.addLayer({
      'id': 'districts_boundary',
      'type': 'line',
      'source': 'districts2018',
      'source-layer': 'districts',
      'paint': {
        'line-color': 'rgba(128, 128, 128, 0.4)',
        'line-width': 1
      },
      'filter': ['all']
    });
  }

  render() {
    return (
      <div className="foo">
      </div>
    );
  }
}

export default CongressionalDistricts;