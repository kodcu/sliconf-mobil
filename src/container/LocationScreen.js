import React, { Component } from 'react';
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';

import Header from "../component/Header";
import { actionCreators } from '../reducks/module/drawer';
import Color from "../theme/Color";
import Font from "../theme/Font";

const mapStateToProps = (state) => ({
	event: state.event.event,
});

class LocationScreen extends Component {
	componentWillMount() {
		const { dispatch, navigation } = this.props;
		dispatch(actionCreators.changedDrawer(navigation.state.routeName));
		const location = this.props.event.about.location;
		if (!(location === undefined || location === null || location.isEmpty))
			Object.values(location).every((key) => (key === '') ? delete this.props.event.about.location : false);
	}

    /**
     * Platforma gore harita sitesine yonlendirir
     * @param lat
     * @param lng
     * @param os uygulamanin hangi platformda calistigi (ios - android)
     */
	redirectToMap(lat, lng, os) {
		if (os !== 'ios') {
			Linking.canOpenURL('https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng).then(supported => {
				if (supported) {
					Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng);
				}
			}).catch(err => console.error('An error occurred', err));
		} else {
			Linking.canOpenURL(`http://maps.apple.com/?saddr=&daddr=(${lat},${lng})`).then(supported => {
				if (supported) {
					Linking.openURL(`http://maps.apple.com/?saddr=&daddr=(${lat},${lng})`);
				}
			}).catch(err => console.error('An error occurred', err));
		}
	}

	render() {
		const event = this.props.event;
		const location = event.about.location;
		if (location === undefined || location === null || location.isEmpty) {
			return (
				<View style={styles.container}>
					<Header
						leftImage='chevron-left'
						rightImage='bars'
						onPressLeft={() => this.props.navigation.goBack()}
						onPressRight={() =>
							this.props.navigation.navigate('DrawerOpen')
						}
					>
						<Header.Title title="Location" />
					</Header>
					<View style={styles.notFoundPanel}>
						<Text style={styles.notFoundText}>
							Location Not Found
                    </Text>
					</View>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<Header
					leftImage='chevron-left'
					rightImage='bars'
					onPressLeft={() => this.props.navigation.goBack()}
					onPressRight={() =>
						this.props.navigation.navigate('DrawerOpen')
					}
				>
					<Header.Title title="Location" />
				</Header>
				<View style={styles.mapContainer}>
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: parseFloat(location.lat),
							longitude: parseFloat(location.lng),
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
					>
						<MapView.Marker.Animated
							coordinate={{
								latitude: parseFloat(location.lat),
								longitude: parseFloat(location.lng)
							}}
							title={event.name}
							description={location.description}
							onCalloutPress={() => this.redirectToMap(
								parseFloat(location.lat),
								parseFloat(location.lng),
								Platform.OS)}
						/>
					</MapView>
				</View>
				<TouchableOpacity
					onPress={() => this.redirectToMap(
						parseFloat(location.lat),
						parseFloat(location.lng),
						Platform.OS)}
				>
					<View style={styles.getDirections}>
						<View style={styles.addressContainer}>
							<Text style={styles.venueName}>{event.name}</Text>
							<Text style={styles.venueName}>{location.venue}</Text>
							<Text style={styles.venueAddress}>{location.description}</Text>
						</View>
						<View style={styles.directionsIcon}>
							<Icon name='address' size={35} style={{ color: '#29B673' }} />
							<Text style={styles.directionsLabel}>Directions</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white
	},
	mapContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: Color.gray,
		borderBottomWidth: 1,
		borderBottomColor: Color.gray
	},
	map: {
		width: '100%',
		flex: 1,
		zIndex: 2,
	},
	venueAddress: {
		...Font.light,
		fontSize: 10,
		lineHeight: 18,
		letterSpacing: 0,
	},
	directionsIcon: {
		alignItems: 'center',
		flex: 1
	},
	directionsLabel: {
		...Font.regular,
		fontSize: 10,
		letterSpacing: 0,
		color: Color.green
	},
	getDirections: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Color.gray
	},
	venueName: {
		...Font.bold,
		fontSize: 15,
		letterSpacing: 0,
		color: Color.green
	},
	addressContainer: {
		flex: 4,
		marginLeft: 5
	},
	notFoundText: {
		...Font.thin,
		color: Color.darkGray
	},
	notFoundPanel: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default connect(mapStateToProps)(LocationScreen);
