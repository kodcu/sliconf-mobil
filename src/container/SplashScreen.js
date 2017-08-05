import React from 'react';
import ReactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin';
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


@ReactMixin.decorate(TimerMixin)
class SplashScreen extends React.Component {

    state = {
        network: false
    };

    static navigationOptions = {
        header: null,
    };

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
        });
    }

    componentDidMount() {

        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({network: isConnected});
        });

        this.setTimeout(() => {
            if (this.state.network) {
                console.log("open success");
                this.props.navigation.dispatch({type: MAIN});
            } else
                alert("İnternet bağlantınızı kontrol edeniz...")

        }, 5000);

    }

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