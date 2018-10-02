import React from 'react';
import DeckGL, {
  PolygonLayer, MapView,
} from 'deck.gl';
import MapGL from 'react-map-gl';

import { fromJS } from 'immutable';
import { json as requestJson } from 'd3-request';

import config from '../config';

import updatePercentiles from './utils';
import ControlPanel from './ControlPanel';

import { dataLayer, defaultMapStyle } from './mapStyle';

// Data to be used by the LineLayer
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
const layers = [new PolygonLayer({
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
})];

// DeckGL react component
class Deck extends React.Component {
  state = {
    data: null,
    year: 2015,
    mapStyle: defaultMapStyle,
    hoveredFeature: null,
  }

  componentDidMount() {
    this.newData('https://raw.githubusercontent.com/uber/react-map-gl/master/examples/data/us-income.geojson');
  }

  newData = (url) => {
    requestJson(url, (error, response) => {
      if (!error) {
        this.loadData(response);
      }
    });
  }

  loadData = (data) => {
    updatePercentiles(data, f => f.properties.income[this.state.year]);

    const mapStyle = defaultMapStyle
      // Add geojson source to map
      .setIn(['sources', 'us-income'], fromJS({ type: 'geojson', data }))
      // Add point layer to map
      .set('layers', defaultMapStyle.get('layers').push(dataLayer));

    console.log(mapStyle);
    this.setState({ data, mapStyle });
  };

  updateSettings = (name, value) => {
    if (name === 'year') {
      this.setState({ year: value });

      const { data, mapStyle } = this.state;
      if (data) {
        updatePercentiles(data, f => f.properties.income[value]);
        const newMapStyle = mapStyle.setIn(['sources', 'us-income', 'data'], fromJS(data));
        this.setState({ mapStyle: newMapStyle });
      }
    }
  };

  render() {
    const { viewportData, setNewViewport, controller = true, baseMap = true, containerComponent } = { ...this.props };
    const { mapStyle } = { ...this.state };

    return (
      <div>
        <DeckGL
          viewState={viewportData}
          initialViewState={viewportData}
          layers={layers}
          controller={controller}
        >
          {baseMap && (
            <MapGL
              mapStyle={mapStyle}
              reuseMaps
              preventStyleDiffing={true}
              {...viewportData}
              mapboxApiAccessToken={config.mapboxToken}
            />
          )}
        </DeckGL>
        <ControlPanel
          containerComponent={containerComponent}
          settings={this.state}
          onChange={this.updateSettings}
          loadNewData={this.newData}
        />
      </div>
    );
  }
}

export default Deck;
