import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	Keyboard,
	Platform
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { actionCreators } from '../reducks/module/event';
import EventCard from '../component/EventCard';
import AnimatedInput from '../component/AnimatedInput';
import Color from '../theme/Color';
import * as Scale from '../theme/Scale';
import Font from '../theme/Font';
import Similarity from '../helpers/StringLikeliness';

const mapStateToProps = (state) => ({
	events: state.event.events
});

class EventSearch extends Component {
	state = {
		events: Array,
		getEvent: Function,
		dispatch: Function
	}

	componentWillMount() {
		const { events, getEvent, dispatch } = this.props.navigation.state.params;
		this.setState({
			events,
			getEvent,
			dispatch
		});
	}

	onSearch = async (code) => {
		await this.state.dispatch(actionCreators.getEvents());
		const { events } = this.props;
		if (events && events.length > 0) {
			if (code && code.trim().length > 0) {
				for (const event of events) {					
					//Used to calculate how close our event's code is to the code input
					const codeSimilarity = Similarity(event.key, code);
					const eventName = event.name.length > 8 ? event.name.slice(0, 8) : event.name;
					//Used to calculate how close our event's name is to the name input
					const nameSimilarity = Similarity(eventName, code);
					event.similarity = (codeSimilarity + nameSimilarity) / 2.0;
				}				
				events.sort((a, b) => {
					const similarityA = Number(a.similarity);
					const similarityB = Number(b.similarity);
					if (similarityA < similarityB) return 1;
					if (similarityA > similarityB) return -1;
					return 0;
				});
			}
			Keyboard.dismiss();
			this.setState({ events });
		}
	}

	renderItem = (item, getEvent) =>
		<EventCard key={item.key} event={item} getEvent={() => getEvent(item.key)} />

	render() {
		const { events, getEvent } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.search}>
					<AnimatedInput
						label={'Search Event'}
						iconClass={Icon}
						iconName={'search'}
						iconColor={Color.white}
						inputStyle={{ color: Color.green }}
						onSubmitEditing={(value) => this.onSearch(value)}
					/>
				</View>
				{events && events.length > 0 ?
					(<ScrollView keyboardShouldPersistTaps={'never'}>
						{events.map(event => this.renderItem(event, getEvent))}
					</ScrollView>) :
					(<View key={'expired'} style={styles.notFoundPanel}>
						<Text style={styles.notFoundText}>No results found.</Text>
					</View>)
				}
				{/*events && events.length > 0 ?
					(<FlatList
						data={events}
						keyExtractor={(item, index) => index}
						renderItem={({ item }) => this.renderItem(item, getEvent)}
						extraData={this.state.events}
					/>) :
					(<View key={'expired'} style={styles.notFoundPanel}>
						<Text style={styles.notFoundText}>No results found.</Text>
					</View>)
				*/}
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
		backgroundColor: Color.white,
		marginTop: (Platform.OS === 'ios' ? 20 : 0)
	},
	search: {
		flex: 0.1,
		width: Scale.width - 16,
		justifyContent: 'flex-start',
		padding: 10
	},
	notFoundText: {
		...Font.thin,
		flex: 1,
		fontSize: Scale.verticalScale(16),
		alignSelf: 'center',
		color: Color.darkGray
	},
	notFoundPanel: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center'
	}
});

export default connect(mapStateToProps)(EventSearch);
