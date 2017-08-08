import React from 'react';
import { Provider } from 'react-redux';
import {AppRegistry} from "react-native";

import store from './src/reducks';
import Index from './src';


export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
              <Index />
            </Provider>
        );
    }
}
AppRegistry.registerComponent('SliConf', () => App);
