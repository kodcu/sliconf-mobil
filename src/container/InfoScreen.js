import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,Dimensions,Linking } from 'react-native';
import { Container,Tab, Tabs} from 'native-base';
import {connect} from 'react-redux'
import Header from "../component/Header";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
const mapStateToProps = (state) => ({

})
class InfoScreen extends Component {

    static navigationOptions = {
        header: null
    };
    redirectToMap() {
        Linking.canOpenURL('https://www.google.com/maps/search/?api=1&query=41.045013,28.988804').then(supported => {
            if (supported) {
                Linking.openURL('https://www.google.com/maps/search/?api=1&query=41.045013,28.988804');
            } else {
                console.log('Don\'t know how to go');
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {
        return (
            <Container>
                <Header leftImage='close' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}>
                    <Header.Title title="Info" />
                </Header>
                <Tabs initialPage={2}>
                    <Tab heading="Exhibition"
                         tabStyle={{backgroundColor:'#fff'}}
                         activeTabStyle={{backgroundColor:'#fff'}}
                         activeTextStyle={{color:'#000'}}
                         textStyle={{color:'#000'}}>
                        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                            <Image source={{uri:'http://im.htemlak.com/2/5/2011/04/30/10484/10484_41f1846773a0a8c8308a8338886b4bc9.png'}} style={styles.plans}/>
                        </View>
                    </Tab>
                    <Tab heading="Session Rooms"
                         tabStyle={{backgroundColor:'#fff'}}
                         activeTabStyle={{backgroundColor:'#fff'}}
                         activeTextStyle={{color:'#000'}}
                         textStyle={{color:'#000'}}>
                        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                            <Image source={{uri:'http://docplayer.biz.tr/docs-images/59/43501500/images/19-0.png'}} style={styles.plans}/>
                        </View>
                    </Tab>
                    <Tab heading="Venue"
                         tabStyle={{backgroundColor:'#fff'}}
                         activeTabStyle={{backgroundColor:'#fff'}}
                         activeTextStyle={{color:'#000'}}
                         textStyle={{color:'#000'}}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            initialRegion={{
                                latitude: 41.045013,
                                longitude: 28.988804,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}>
                            <MapView.Marker.Animated coordinate={{latitude: 41.045013,longitude: 28.988804}}
                                                     title={'Javaday Istanbul 2018'}
                                                     description={'Hilton Kongre Ve Fuar Salonu, Hilton Hotel 50 N, 34367 Şişli / Istanbul'}
                                                     onCalloutPress={()=> this.redirectToMap()} />

                        </MapView>
                    </Tab>
                    <Tab heading="About"
                         tabStyle={{backgroundColor:'#fff'}}
                         activeTabStyle={{backgroundColor:'#fff'}}
                         activeTextStyle={{color:'#000'}}
                         textStyle={{color:'#000'}}>
                        <Text style={{fontSize:35,color:'#29B673',alignSelf:'center',fontWeight:'bold'}}>About Us</Text>
                        <Text  style={{alignSelf:'center',fontWeight:'bold',margin:15}}>Java Day Istanbul is one of the most effective international community driven software conference
                            of Turkey organised by Istanbul Java User Group. The conference helps developers to learn the
                            newest technologies about Java, Web, Mobile, Big DATA, Cloud, DevOps, Agile and Future.
                            Java Day Istanbul also helps developers, tech companies, and startups to establish good network among them.</Text>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    plans:{
        width:width*0.8,
        height:height*0.3,

    }
})

export default connect(mapStateToProps)(InfoScreen)