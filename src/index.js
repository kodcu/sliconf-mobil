import React from 'react'
import {connect} from 'react-redux'
import {addNavigationHelpers} from 'react-navigation';
import AppNavigator from './router'

class App extends React.Component {
    componentDidMount() {
        // internet bağlantısının dğeişme olayı buradan yönetilebilir
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
