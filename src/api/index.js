import axios from 'axios';

export const map = {
  async getLayer() {
    const res = await axios.get('https://cdn.rawgit.com/mapbox/mapbox-react-examples/master/data-overlay/src/data.json');
    return res.data;
  },
};
