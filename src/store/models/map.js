import { map as mapAPI } from '../../api';

export default {
  state: {
    layer: {},
    options: {
      width: 800,
      height: 500,
      latitude: 42.7577,
      longitude: 13.4376,
      zoom: 5,
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
