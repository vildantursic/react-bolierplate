import { init } from '@rematch/core';
import map from './models/map';
import deck from './models/deck';

const store = init({
  models: {
    map,
    deck,
  },
});

export default store;

export const { dispatch } = store;

// effects
dispatch({ type: 'map/setMapLayerAsync' });
dispatch.map.setMapLayerAsync();

dispatch({ type: 'deck/setMapLayerAsync' });
dispatch.deck.setMapLayerAsync();
