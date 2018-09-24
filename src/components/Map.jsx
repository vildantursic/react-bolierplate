import React from 'react';
import MapGL from 'react-map-gl';
import { fromJS } from 'immutable';
import { json as requestJson } from 'd3-request';

import config from '../config';

import { dataLayer, defaultMapStyle } from './mapStyle';
import updatePercentiles from './utils';
import ControlPanel from './ControlPanel';

class Map extends React.Component {
  state = {
    mapStyle: defaultMapStyle,
    year: 2015,
    data: null,
    hoveredFeature: null,
  }

  componentDidMount() {
    requestJson('https://raw.githubusercontent.com/uber/react-map-gl/master/examples/data/us-income.geojson', (error, response) => {
      console.log(response);
      if (!error) {
        this.loadData(response);
      }
    });
  }

  loadData = (data) => {
    const { year } = this.state;

    updatePercentiles(data, f => f.properties.income[year]);

    const mapStyle = defaultMapStyle
      // Add geojson source to map
      .setIn(['sources', 'incomeByState'], fromJS({ type: 'geojson', data }))
      // Add point layer to map
      .set('layers', defaultMapStyle.get('layers').push(dataLayer));

    this.setState({ data, mapStyle });
  };

  updateSettings = (name, value) => {
    if (name === 'year') {
      this.setState({ year: value });

      const { data, mapStyle } = this.state;
      if (data) {
        updatePercentiles(data, f => f.properties.income[value]);
        const newMapStyle = mapStyle.setIn(['sources', 'incomeByState', 'data'], fromJS(data));
        this.setState({ mapStyle: newMapStyle });
      }
    }
  };

  onHover = (event) => {
    const { features, srcEvent: { offsetX, offsetY } } = event;
    const hoveredFeature = features && features.find(f => f.layer.id === 'data');

    this.setState({ hoveredFeature, x: offsetX, y: offsetY });
  };

  renderTooltip() {
    const {
      hoveredFeature,
      x,
      y,
    } = this.state;

    return hoveredFeature && (
      <div className="tooltip" style={{ left: x, top: y }}>
        <div>
          State:
          { hoveredFeature.properties.name }
        </div>
        <div>
          Median Household Income:
          { hoveredFeature.properties.value }
        </div>
        <div>
          Percentile:
          { hoveredFeature.properties.percentile / 8 * 100 }
        </div>
      </div>
    );
  }

  render() {
    const { viewportData, setNewViewport, containerComponent } = this.props;
    const { mapStyle } = this.state;

    return (
      <div>
        <MapGL
          mapboxApiAccessToken={config.mapboxToken}
          {...viewportData}
          mapStyle={mapStyle}
          onHover={this.onHover}
          onViewportChange={viewport => setNewViewport(viewport)}
        >
          { this.renderTooltip() }
        </MapGL>

        <ControlPanel
          containerComponent={containerComponent}
          settings={this.state}
          onChange={this.updateSettings}
        />
      </div>
    );
  }
}

export default Map;
