import React, { Component } from 'react';
import ReactMapboxGl, {
  Layer,
  Feature,
  ZoomControl,
  ScaleControl,
  RotationControl,
  Popup,
} from "react-mapbox-gl";
import MapboxGl from 'mapbox-gl';
import CurrentLegislators from '../data/legislators-current.json';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZ2VuZ2hpc2hhY2siLCJhIjoiZ2x6WjZhbyJ9.P8at90QQiy0C8W_mc21w6Q"
});

export class MyMap extends Component {

  handleMouseMove(map, evt) {
    const features = map.queryRenderedFeatures(evt.point);
    map.getCanvas().style.cursor = (features.length && features[0].sourceLayer === 'districts') ? 'pointer' : '';
  };

  handleMapClick(map, evt) {
    const features = map.queryRenderedFeatures(evt.point);
    if (!features.length) return;

    console.log(features);
    const feature = features[0];
    if (feature.sourceLayer !== 'districts') return;

    const [legislator] = CurrentLegislators.filter(thisLegislator => {
      return thisLegislator.id.bioguide === feature.properties.rep_id;
    });

    const terms = legislator.terms;
    const currentTerm = terms[terms.length - 1];

    const popup = new MapboxGl.Popup()
      .setLngLat(map.unproject(evt.point))
      .setHTML([
        '<div class="rep-info">',
        '   <div class="rep-photo">',
        '       <img src="https://theunitedstates.io/images/congress/225x275/' + feature.properties.rep_id + '.jpg"/>',
        '   </div>',
        '   <div class="legislator-name">',
            legislator.name.official_full,
        '       <span>(' + currentTerm.party + ')</span>',
        '   </div>',
        '   <div class="district-name">' + feature.properties.title_long + '</div>',
        '</div>'
      ].join('\n'))
      .addTo(map);
  };

  render() {
    return (
      <Map
        style="mapbox://styles/genghishack/cjga1amoc2xx02ro7nzpv1e7s"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={[-97.000000, 38.000000]}
        zoom={[4]}
        onMouseMove={this.handleMouseMove}
        onClick={this.handleMapClick}
      >
        <ZoomControl />
        <ScaleControl
          measurement="mi"
        />
      </Map>
    );
  }

}

export default MyMap;