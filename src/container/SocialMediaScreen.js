import React, { Component } from 'react';
import { Platform, Linking, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';

import Header from '../component/Header';
import { actionCreators } from '../reducks/module/drawer';
import Color from '../theme/Color';
import { scale } from '../theme/Scale';

const mapStateToProps = (state) => ({
	event: state.event.event
});

const firstRegex = /^https?:\/\//i;
const secondRegex = /^https?:\\\\/i;

class SocialMediaScreen extends Component {
	componentWillMount() {
		const { dispatch, navigation } = this.props;
		dispatch(actionCreators.changedDrawer(navigation.state.routeName));
	}

	renderButton = (button) => {
		const icon = `${button[0]}-with-circle`;
		let url = button[1];

		if (url && url.trim() && (url.trim().length > 2)) {
			if (!firstRegex.test(url) && !secondRegex.test(url))
				url = 'http://' + url;

			if (Linking.canOpenURL(url)) {
				return (
					<TouchableOpacity
						key={button[0]}
						style={styles.button}
						onPress={() => Linking.openURL(url)}
					>
						<View
							style={{
								margin: 8,
								borderRadius: Platform.OS === 'ios' ? 45 : 90,
								borderColor: Color.darkGray,
								backgroundColor: Color.darkGray
							}}
						>
							<Icon
								name={icon}
								size={64}
								color={Color.white}
							/>
						</View>
					</TouchableOpacity>
				);
			}
		}
	}

	render() {
		const event = this.props.event;
		const social = event.about.social;
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
					<Header.Title title="Social Media" />
				</Header>
				<View style={styles.subContainer}>
					<FlatList
						data={Object.entries(social)}
						renderItem={(button) => this.renderButton(button.item)}
						keyExtractor={(item, index) => index}
						numColumns={2}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white
	},
	subContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		width: scale(100),
		height: scale(100),
	}
});

export default connect(mapStateToProps)(SocialMediaScreen);
