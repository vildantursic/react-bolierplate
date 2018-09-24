import React from 'react';
import DeckGL, {
  LineLayer, PolygonLayer, FirstPersonView, MapView,
} from 'deck.gl';
import { InteractiveMap } from 'react-map-gl';
import config from '../config';

// Data to be used by the LineLayer
const data = [{ sourcePosition: [-122.41669, 37.8853], targetPosition: [-122.41669, 37.781] }];
const polygonData = [
  {
    contour: [
      [[-122.4, 37.7], [-122.4, 37.8], [-122.5, 37.8], [-122.5, 37.7], [-122.4, 37.7]],
    ],
    zipcode: 94107,
    population: 26599,
    area: 6.11,
  },
];
const polyLayer = new PolygonLayer({
  data: polygonData,
  pickable: true,
  stroked: true,
  filled: true,
  wireframe: true,
  lineWidthMinPixels: 1,
  getPolygon: d => d.contour,
  getElevation: d => d.population / d.area / 10,
  getFillColor: d => [d.population / d.area / 60, 140, 0],
  getLineColor: [80, 80, 80],
  getLineWidth: 1,
});

// DeckGL react component
const Deck = (props) => {
  const { viewportData, setNewViewport } = { ...props };

  return (
    <DeckGL viewState={viewportData} layers={[polyLayer]} controller>
      <LineLayer id="line-layer" data={data} />
      <MapView id="map">
        <InteractiveMap
          mapStyle="mapbox://styles/mapbox/dark-v9"
          {...viewportData}
          mapboxApiAccessToken={config.mapboxToken}
          onViewportChange={viewport => setNewViewport(viewport)}
        />
      </MapView>

      <FirstPersonView width="50%" x="50%" fovy={50} />
    </DeckGL>
  );
};

export default Deck;
