import React from 'react';
import './App.less';
import Header from './components/Header';
import FieldMap from './components/Map/Map';

// Use GeoViewport and the window size to determine an appropriate center and zoom for the continental US
import geoViewport from "@mapbox/geo-viewport/index";

const continentalBbox = [-148.8, 32.6, -65.4, 50.2];
const continentalView = (w,h) => {
  return geoViewport.viewport(continentalBbox, [w, h]);
};
const continental = continentalView(window.innerWidth/2, window.innerHeight/2);

function App() {
  return (
    <div className="App">
      <Header />
      <FieldMap zoom={[continental.zoom]} center={continental.center}/>
    </div>
  );
}

export default App;
