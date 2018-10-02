import { map as mapAPI } from '../../api';

export default {
  state: {
    layer: {},
    options: {
      latitude: 40,
      longitude: -100,
      zoom: 3,
      bearing: 0,
      pitch: 0,
      width: 800,
      height: 500,
      style: 'mapbox://styles/vildantursic/cjh1n4w1t0ksg2rpfob8g751s',
    },
    settings: {
      dragPan: true,
      dragRotate: true,
      scrollZoom: true,
      touchZoom: true,
      touchRotate: true,
      keyboard: true,
      doubleClickZoom: true,
      minZoom: 0,
      maxZoom: 20,
      minPitch: 0,
      maxPitch: 85,
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
