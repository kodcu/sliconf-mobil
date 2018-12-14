import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	FlatList
} from 'react-native';

import EventCard from '../component/EventCard';

export default class EventSearch extends Component {
	renderItem = (item, getEvent) => <EventCard event={item} getEvent={() => getEvent(item.key)} />

	render() {
		const { events, getEvent } = this.props.navigation.state.params;
		return (
			<View style={styles.container}>
				<FlatList
					data={events}
					keyExtractor={(item, index) => item.id}
					renderItem={({ item }) => this.renderItem(item, getEvent)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		backgroundColor: 'white'
	}
});
