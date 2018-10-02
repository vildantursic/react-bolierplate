import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Drawer, Button, List } from 'antd';

import store from './store/index';

import 'mapbox-gl/dist/mapbox-gl.css';
import './assets/styles/App.css';

import MapView from './pages/MapView';
import DeckView from './pages/DeckView';

class App extends Component {
  state = {
    visible: false,
    routes: [
      { name: 'Map', link: '/' },
      { name: 'Deck', link: '/deck' },
    ],
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, routes } = this.state;

    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <div>
              <Drawer
                title="Links"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={visible}
              >
                <List
                  dataSource={routes}
                  renderItem={
                    item => (<List.Item><Link to={item.link}>{item.name}</Link></List.Item>)
                  }
                />
              </Drawer>
              <div>
                <Button
                  className="menu-button"
                  type="primary"
                  shape="circle"
                  icon="setting"
                  onClick={this.showDrawer}
                />
                <Route exact path="/" component={MapView} />
                <Route exact path="/deck" component={DeckView} />
              </div>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
