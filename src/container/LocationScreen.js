import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,Linking } from 'react-native';
import { Container} from 'native-base';
import Header from "../component/Header";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Entypo'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
    event: state.event.event,
})

const s ='https://www.google.com/maps/search/?api=1&query=41.045013,28.988804';
class LocationScreen extends Component {

    redirectToMap(lat,lng) {

        Linking.canOpenURL('https://www.google.com/maps/dir/?api=1&destination='+lat+','+lng).then(supported => {
            if (supported) {
                Linking.openURL('https://www.google.com/maps/dir/?api=1&destination'+lat+','+lng);
            } else {
                Linking.canOpenURL('http://maps.apple.com/?ll='+lat+','+lng).then(supported => {
                    if (supported) {
                        Linking.openURL('http://maps.apple.com/?ll='+lat+','+lng);
                    } else {
                        alert('Unable to find maps application')
                    }
                }).catch(err => console.error('An error occurred', err));
            }
        }).catch(err => console.error('An error occurred', err));
    }


    render() {
        const event = this.props.event;
        const location = event.about.location;

        return (
            <Container style={{backgroundColor:'#fff'}}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {this.props.navigation.navigate('DrawerOpen')}}>
                    <Header.Title title="Location" />
                </Header>
                <View style={styles.container}>
                    <MapView
                        //provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: location.lat,
                            longitude: location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        <MapView.Marker.Animated coordinate={{latitude: location.lat,longitude: location.lng}}
                                                 title={event.name}
                                                 description={location.description}
                                                 onCalloutPress={()=> this.redirectToMap(location.lat,location.lng)} />

                    </MapView>
                </View>
                <TouchableOpacity onPress={() => this.redirectToMap(location.lat,location.lng)}>
                    <View style={styles.getDirections}>
                        <View style={styles.addressContainer}>
                            <Text style={styles.venueName}>{event.name}</Text>
                            <Text style={styles.venueAddress}>{location.description}</Text>
                        </View>
                        <View style={styles.directionsIcon}>
                            <Icon name='address' size={35} style={{color:'#29B673'}}/>
                            <Text style={styles.directionsLabel}>Directions</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#DEDEDE',
        borderBottomWidth: 1,
        borderBottomColor: '#DEDEDE'
    },
    map: {
        width: '100%',
        flex:1,
        zIndex: 2,
    },
    venueAddress: {
        fontFamily: 'Montserrat-Light',
        fontSize: 10,
        lineHeight: 18,
        letterSpacing: 0,
    },
    directionsIcon: {
        alignItems: 'center',
        flex: 1
    },
    directionsLabel: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 10,
        letterSpacing: 0,
        color:'#29B673'
    },
    getDirections: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#DEDEDE'
    },
    venueName: {
        fontSize: 15,
        letterSpacing: 0,
        fontFamily: 'Montserrat-SemiBold',
        color:'#29B673'
    },
    addressContainer: {
        flex: 4,
        marginLeft:5
    },

});

export default connect(mapStateToProps)(LocationScreen)
