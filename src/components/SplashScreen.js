import React from 'react';
import ReactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin';
import { Button, StyleSheet, Text, View, NetInfo } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { MAIN,SPLASH } from '../router';

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
});

@ReactMixin.decorate(TimerMixin)
class SplashScreen extends React.Component{

  state = {
    network : false
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({network:isConnected});
    });

    this.setTimeout(()=>{console.log("MAIN AÇ");this.props.navigation.dispatch({ type: MAIN })},5000);
  }

  render(){
    return <View style={styles.container}>
      <Text style={styles.welcome}>
        {this.state.network ? "Internet var" : "Internet Yok"}
      </Text>
      <Text onPress={()=>this.props.navigation.dispatch({ type: MAIN })}>Ana Sayfa</Text>
    </View>
  }
}

export default SplashScreen;
