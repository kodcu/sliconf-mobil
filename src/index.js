import React from 'react'
import {connect} from 'react-redux'
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import AppNavigator from './router'

import {AppState, BackHandler, Platform, StatusBar} from 'react-native';

class App extends React.Component {

    state = {
        appState: AppState.currentState
    }
    onBackPress = () => {
        const {dispatch, nav} = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;

    };
    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState});
    };

    componentDidMount() {
        // internet baglantisinin degisme olayı buradan yönetilebilir
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        AppState.removeEventListener('change', this._handleAppStateChange);

    }

    componentWillMount() {
        StatusBar.setHidden(false);
        if (Platform.OS === 'android')
            StatusBar.setBackgroundColor("#fff")
        StatusBar.setBarStyle("dark-content", true)
    }

    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })}/>
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

export default connect(mapStateToProps)(App);
