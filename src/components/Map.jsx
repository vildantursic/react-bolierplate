import React from 'react';
import ReactMapGL, { experimental } from 'react-map-gl';
import config from '../config';
import { defaultMapStyle } from './mapStyle';

class MyMapControls extends experimental.MapControls {
  _onDoubleTap() {
    this.updateViewport(this.getMapState(), {
      longitude: -74.0,
      latitude: 40.7,
      zoom: 10,
    });
  }
}

const Map = (props) => {
  const { viewportData, setNewViewport } = props;

  const mapControls = new MyMapControls();

  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={config.mapboxToken}
        {...viewportData}
        mapStyle={defaultMapStyle}
        mapControls={mapControls}
        onViewportChange={viewport => setNewViewport(viewport)}
      />
    </div>
  );
};

export default Map;
