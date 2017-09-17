import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { Container} from 'native-base';
import Header from "../component/Header";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Entypo'

export default class LocationScreen extends Component {
    render() {
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {this.props.navigation.navigate('DrawerOpen')}}>
                    <Header.Title title="Location" />
                </Header>
                <View style={styles.container}>
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
                </View>
                <TouchableOpacity onPress={() => {}}>
                    <View style={styles.getDirections}>
                        <View style={styles.addressContainer}>
                            <Text style={styles.venueName}>
                                Javaday Istanbul 2018 G
                            </Text>
                            <Text style={styles.venueAddress}>
                                Hilton Kongre Ve Fuar Salonu, Hilton Hotel 50 N, 34367 Şişli / Istanbul
                            </Text>
                        </View>
                        <View style={styles.directionsIcon}>
                            <Icon name='address' size={35}/>
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
    },
    map: {
        width: '100%',
        flex:1,
        zIndex: 2
    },
    venueAddress: {
        fontFamily: 'vincHand',
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: 0,
    },
    directionsIcon: {
        alignItems: 'center',
        flex: 1
    },
    directionsLabel: {
        fontSize: 11,
        letterSpacing: 0,

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
        fontSize: 17,
        letterSpacing: 0,
        fontWeight:'bold',
        fontFamily: 'Montserrat-Regular'
    },
    addressContainer: {
        flex: 4,
        margin:5
    },
});
