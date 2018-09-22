import { map as mapAPI } from '../../api';

export default {
  state: {
    layer: {},
    options: {
      longitude: -122.41669,
      latitude: 37.7853,
      zoom: 10,
      pitch: 50,
      bearing: 20,
    },
  },
  reducers: {
    setMapLayer(state, payload) {
      return { ...state, layer: payload };
    },
  },
  effects: dispatch => ({
    async setMapLayerAsync() {
      const data = await mapAPI.getLayer();
      dispatch.deck.setMapLayer(data);
    },
  }),
};
