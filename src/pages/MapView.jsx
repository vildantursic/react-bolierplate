import React from 'react';
import { connect } from 'react-redux';

import Map from '../components/Map';

class MapView extends React.Component {
  state = {
    viewportData: { ...this.props }.options,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { viewportData, width, height } = { ...this.state, ...this.props };

    this.setState({
      viewportData: {
        ...viewportData,
        width: width || window.innerWidth,
        height: height || window.innerHeight,
      },
    });
  };

  render() {
    const { viewportData, mapStyle } = this.state;
    return (
      <div>
        <Map
          viewportData={viewportData}
          mapStyle={mapStyle}
          setNewViewport={newViewport => this.setState({ viewportData: newViewport })}
        />
      </div>
    );
  }
}

const mapState = state => ({
  options: state.map.options,
  settings: state.map.settings,
  layer: state.map.layer,
});

const mapDispatch = ({ map: { setMapLayerAsync } }) => ({
  setMapLayerAsync: () => setMapLayerAsync(),
});

export default connect(mapState, mapDispatch)(MapView);
