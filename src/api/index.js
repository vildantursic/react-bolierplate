import axios from 'axios';

export const map = {
  async getLayer() {
    const res = await axios.get('https://cdn.rawgit.com/mapbox/mapbox-react-examples/master/data-overlay/src/data.json');
    return res.data;
  },
};

export const user = {
  async getUser() {
    // TODO change mocked api call
    const res = await axios.get('https://example.com/user');
    return res.data;
  },
};
