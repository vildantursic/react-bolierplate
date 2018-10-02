import React from 'react';
import MapGL from 'react-map-gl';
import { fromJS } from 'immutable';
import { json as requestJson } from 'd3-request';
import updatePercentiles from './utils';
import ControlPanel from './ControlPanel';

import config from '../config';

import { dataLayer, defaultMapStyle } from './mapStyle';

class Map extends React.Component {
  state = {
    data: null,
    year: 2015,
    mapStyle: defaultMapStyle,
    hoveredFeature: null,
  }

  componentDidMount() {

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
          Props:
          { hoveredFeature.properties.name }
          <br />
          { hoveredFeature.properties.value }
          <br />
          { hoveredFeature.properties.percentile / 8 * 100 }
        </div>
      </div>
    );
  }

  render() {
    const {
      viewportData, settings,
      setNewViewport,
      containerComponent,
    } = this.props;
    const { mapStyle } = this.state;

    return (
      <div>
        <MapGL
          mapboxApiAccessToken={config.mapboxToken}
          {...viewportData}
          {...settings}
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
          loadNewData={this.newData}
        />
      </div>
    );
  }
}

export default Map;
