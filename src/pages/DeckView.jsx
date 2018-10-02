import React from 'react';
import { connect } from 'react-redux';

import Deck from '../components/Deck';

class DeckView extends React.Component {
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
    const { viewportData } = this.state;

    return (
      <div>
        <Deck
          viewportData={viewportData}
          setNewViewport={(newViewport) => {
            console.log(newViewport);
            this.setState({ viewportData: newViewport });
          }}
        />
      </div>
    );
  }
}

const mapState = state => ({
  options: state.deck.options,
  layer: state.deck.layer,
});

const mapDispatch = ({ deck: { setMapLayerAsync } }) => ({
  setMapLayerAsync: () => setMapLayerAsync(),
});

export default connect(mapState, mapDispatch)(DeckView);
