import { map as mapAPI } from '../../api';

export default {
  state: {
    layer: {},
    options: {
      longitude: -122.41669,
      latitude: 37.7853,
      zoom: 5,
      width: 800,
      height: 500,
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
      dispatch.map.setMapLayer(data);
    },
  }),
};
