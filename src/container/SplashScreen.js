import React,{Component} from 'react';
import {StyleSheet, View, Text, NetInfo} from 'react-native'
import {Image} from 'react-native-animatable'
import {MAIN} from '../router';

const logo = require("../../images/logo.png");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff'
    },
    image: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: 150,
        width: 150,
        marginBottom:50
    },
    text: {
        color: '#2AB673'
    },
})


class SplashScreen extends Component {

    state = {
        network: false
    };

    static navigationOptions = {
        header: null,
    };

    componentWillMount() {
        NetInfo.isConnected.fetch().then(this._handleConnectionInfoChange);
        NetInfo.isConnected.addEventListener('change',this._handleConnectionInfoChange);
     }

     componentWillUnmount(){
         NetInfo.isConnected.removeEventListener('change',this._handleConnectionInfoChange);
     }

    _handleConnectionInfoChange = (isConnected) => {
        if(isConnected){
          setTimeout(() => {
                  this.props.navigation.dispatch({type: MAIN});
          }, 500);
        }
    };


    /*componentDidMount() {
        setTimeout(() => {
                this.props.navigation.dispatch({type: MAIN});
        }, 5000);
    }*/

    render() {
        return (
            <View style={styles.container}>
                <Text/>
                <Image
                    source={logo}
                    animation="swing"
                    iterationCount='infinite'
                    style={styles.image}/>
                <Text style={styles.text}>kodcu.com</Text>
            </View>
        )
    }
}

export default SplashScreen;
