import React from 'react';
import ReactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin';
import {Button, StyleSheet, Text, View, NetInfo, Dimensions, Image} from 'react-native';
import {Container, Content, Spinner} from 'native-base';
import {MAIN} from '../router';

const window = Dimensions.get('window');
const background = require("../../images/splash.png");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    splash: {
        width: window.width,
        height: window.height
    },
    spinner: {
        position: 'absolute',
        height: 40,
        padding: 10,
        marginTop: window.height - 100,
        width: window.width,
    }
});

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
            if (this.state.network){
                console.log("open success");
                this.props.navigation.dispatch({type: MAIN});
            }else
                alert("İnternet bağlantınızı kontrol edeniz...")

        }, 5000);

    }

    render() {
        return <Container>
            <Image style={styles.splash} source={background}>
                <View style={styles.spinner}>
                    <Spinner color='white' />
                </View>
            </Image>
        </Container>
        /*<View style={styles.container}>
         <Image style={styles.splash}>

         </Image>
         <Text style={styles.welcome}>
         {this.state.network ? "Internet var" : "Internet Yok"}
         </Text>
         <Text onPress={() => this.props.navigation.dispatch({type: MAIN})}>Ana Sayfa</Text>
         </View>*/
    }
}

export default SplashScreen;
