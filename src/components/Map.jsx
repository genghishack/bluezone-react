import React, { Component } from 'react';
import ReactMapboxGl, {
  ZoomControl,
  ScaleControl,
  RotationControl,
} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZ2VuZ2hpc2hhY2siLCJhIjoiZ2x6WjZhbyJ9.P8at90QQiy0C8W_mc21w6Q"
});

const mapConf = {

};

export class CongressMap extends Component {

  state = {
    hoveredStateId: null
  };

  handleMapLoad = (map, evt) => {
    map.addSource('districts2018', {
      type: 'vector',
      url: 'mapbox://genghishack.cd-116-2018'
    });

    map.addLayer({
      'id': 'districts_boundary',
      'type': 'line',
      'source': 'districts2018',
      'source-layer': 'districts',
      'paint': {
        'line-color': '#292929',
        'line-width': 1
      }
    });

    // map.addLayer({
    //   'id': 'districts_label',
    //   'type': 'symbol',
    //   'source': 'districts2018',
    //   'source-layer': 'districts',
    //   'layout': {
    //     'text-field': '{title_short}',
    //   },
    //   'paint': {
    //     'text-color': '#000000',
    //     'text-halo-color': '#fed9a6',
    //     'text-halo-width': {
    //       'base': 1,
    //       'stops': [
    //         [1,1],
    //         [8,2]
    //       ]
    //     }
    //   }
    // });

    map.addLayer({
      'id': 'districts_fill',
      'type': 'fill',
      'source': 'districts2018',
      'source-layer': 'districts',
      'paint': {
        // 'fill-color': '#7b68ee',
        // 'fill-opacity': 1,
        'fill-color': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          'medium slate blue',
          'transparent'
        ],
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          0.2
        ],
        'fill-outline-color': 'white'
      }
    });
  };
  
  handleMouseMove = (map, evt) => {
    const {rDistrictIds} = this.props;
    const features = map.queryRenderedFeatures(evt.point);

    let cursorStyle = '';
    let hoveredStateId = this.state['hoveredStateId'];

    const hoveredDistricts = features.filter(feature => {
      return rDistrictIds.indexOf(feature.layer.id) !== -1;
    });
    if (hoveredDistricts.length) {
      cursorStyle = 'pointer';
      if (hoveredStateId) {
        map.setFeatureState({
          source: 'districts2018',
          sourceLayer: 'districts',
          id: hoveredStateId
        }, {
          hover: false
        });
      }

      hoveredStateId = hoveredDistricts[0].id;
      this.setState({hoveredStateId: hoveredStateId}, () => {
        map.setFeatureState({
          source: 'districts2018',
          sourceLayer: 'districts',
          id: hoveredStateId
        }, {
          hover: true
        });
      })

    }
    map.getCanvas().style.cursor = cursorStyle;

  };

  render() {
    const {
      zoom,
      center,
      handleMapClick,
    } = this.props;

    return (
      <Map
        ref={e => { this.props.getMapHandle(e); }}
        // style="mapbox://styles/genghishack/cjga1amoc2xx02ro7nzpv1e7s" // 2017 congress map
        style="mapbox://styles/genghishack/cjnjjdyk64avs2rqgldz3j2ok" // 2018 congress map
        // style="mapbox://styles/genghishack/cjftwwb9b8kw32sqpariydkrk" // basic
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        attributionControl={false}
        renderWorldCopies={false}
        center={center}
        zoom={zoom}
        onMouseMove={this.handleMouseMove}
        onClick={handleMapClick}
        onStyleLoad={this.handleMapLoad}
      >
        <ZoomControl />
        <ScaleControl
          measurement="mi"
          position={'top-left'}
        />
      </Map>
    );
  }

}

export default CongressMap;