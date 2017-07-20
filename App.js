import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/reducks';
import Index from './src';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

export default App;
