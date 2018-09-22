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
    this.setState({
      viewportData: {
        ...this.state.viewportData,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight,
      },
    });
  };

  render() {
    const { viewportData } = this.state;

    return (
      <div>
        <Deck
          viewportData={viewportData}
          setNewViewport={newViewport => this.setState({ viewportData: newViewport })}
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
