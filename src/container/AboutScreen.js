import React, { Component } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSocial from 'react-native-vector-icons/Entypo';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';

import Header from "../component/Header";
import { actionCreators } from '../reducks/module/drawer';
import Font from "../theme/Font";
import Color from "../theme/Color";
import { moderateScale } from "../theme/Scale";
import getImage from "../helpers/getImageHelper";

const mapStateToProps = (state) => ({
	event: state.event.event
});

export class About extends Component {
	componentWillMount() {
		const { dispatch, navigation } = this.props;
		dispatch(actionCreators.changedDrawer(navigation.state.routeName));
	}

	render() {
		const event = this.props.event;
		const about = event.about;
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
					<Header.Title title="General Info" />
				</Header>
				<ScrollView>
					<View style={styles.aboutField}>
						<Thumbnail large source={{ uri: getImage(event.logoPath) }} />
						<View style={styles.aboutPanel}>
							<Text style={styles.eventNameText}>{event.name}</Text>
							<Text style={styles.descText}>{event.description}</Text>
						</View>
					</View>					
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white
	},
	aboutPanel: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	aboutField: {
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	descText: {
		...Font.light,
		fontSize: moderateScale(13),
		color: Color.darkGray3,
		textAlign: 'center'
	},
	eventNameText: {
		...Font.medium,
		fontSize: moderateScale(25),
		color: Color.darkGray,
		margin: 10,
		textAlign: 'center'
	}
});

export default connect(mapStateToProps)(About);
