import React from 'react';
import { StyleSheet, View,Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = () => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
  </View>
);

MainScreen.navigationOptions = {
  title: 'Home Screen',
};

export default MainScreen;
