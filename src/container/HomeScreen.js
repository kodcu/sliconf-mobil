import React, { Component } from 'react';
import {
	AsyncStorage,
	Dimensions,
	FlatList,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { actionCreators } from '../reducks/module/drawer';
import {
	AGENDA,
	ASK,
	INFO,
	LOCATION,
	SPEAKERS,
	SPONSOR,
	MAIN,
	POLL,
	CONTACT,
	SOCIAL
} from '../router';
import Header from '../component/Header';
import If from '../component/If';
import { moderateScale, scale, verticalScale } from '../theme/Scale';
import Color from '../theme/Color';
import Font from '../theme/Font';
import getImage from '../helpers/getImageHelper';

const mapStateToProps = (state) => ({
	event: state.event.event,
	connection: state.connection.connectionStatus,
	login: state.auth.login,
});

class HomeScreen extends Component {
	state = {
		buttons: [
			{ name: 'Schedule', icon: 'ios-calendar-outline', nav: AGENDA },
			{ name: 'Ask Question', icon: 'ios-chatbubbles', nav: ASK },
			{ name: 'Speakers', icon: 'ios-microphone-outline', nav: SPEAKERS },
			{ name: 'Location', icon: 'ios-map-outline', nav: LOCATION },
			{ name: 'Sponsors', icon: 'ios-ribbon-outline', nav: SPONSOR },
			{ name: 'Survey', icon: 'ios-list', nav: POLL },
			{ name: 'Info', icon: 'ios-information-outline', nav: INFO },
			{ name: 'Contact Us', icon: 'ios-phone-portrait-outline', nav: CONTACT },
			{ name: 'Social Media', icon: 'ios-link-outline', nav: SOCIAL }
		]
	};

	componentWillMount() {
		const { dispatch, navigation } = this.props;
		dispatch(actionCreators.changedDrawer(navigation.state.routeName));

		AsyncStorage.setItem('eventName', this.props.event.name);
	}

    /**
     *Bir buton tasarimi
     * @param btn butonun icerigi
     * @returns {XML}
     */
	renderButton = (btn) => {
		return (
			<TouchableOpacity
				style={styles.button}
				onPress={() => this.props.navigation.navigate(btn.item.nav)}
			>
				<If con={btn.item.name === 'Ask Question'}>
					<If.Then>
						<View style={[styles.buttonIcon, { backgroundColor: Color.green, borderColor: Color.green }]}>
							<Icon name={btn.item.icon} size={40} color={Color.white} />
						</View>
					</If.Then>
					<If.Else>
						<View style={styles.buttonIcon}>
							<Icon name={btn.item.icon} size={40} color={Color.darkGray} />
						</View>
					</If.Else>
				</If>
				<Text
					style={btn.item.name === 'Ask Question' ?
						{ ...Font.semiBold, color: Color.green } :
						styles.buttonText
					}
				>{btn.item.name}</Text>
			</TouchableOpacity>
		);
	}

	render() {
		const { event } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.headerPanel}>
					<Header
						active
						homeScreen
						headerStyle={{ backgroundColor: Color.green, overflow: 'hidden' }}
						leftImage='chevron-left' rightImage='bars'
						onPressLeft={() => this.props.navigation.navigate(MAIN)}
						onPressRight={() => this.props.navigation.navigate('DrawerOpen')}
					/>
					<View style={styles.topInfo}>
						<View style={{ flex: 0.68, flexDirection: 'row' }}>
							<View style={{ flex: 0.6, flexDirection: 'column' }}>
								<View style={styles.date}>
									<View style={{ flexDirection: 'row', marginVertical: '0.2%', marginHorizontal: '4%' }}>
										<Icon color={Color.white} name='ios-calendar-outline' size={24} />
										<Text
											style={styles.dateText}
										>{moment(event.startDate).format('Do MMM YYYY')}</Text>
									</View>
									<View style={{ flexDirection: 'row', marginVertical: '0.2%', marginHorizontal: '4%' }}>
										<Icon color={Color.white} name='ios-clock-outline' size={24} />
										<Text
											style={styles.dateText}
										>{moment(event.startDate).format('HH:mm')}</Text>
									</View>
								</View>
							</View>
							<View style={{ flex: 0.4, alignItems: 'flex-end' }}>
								<Image
									source={{ uri: getImage(event.logoPath) }}
									style={styles.eventLogo}
								/>
							</View>
						</View>
						<View style={styles.eventName}>
							<View
								style={{
									flex: 1,
									width: '100%',
									height: '100%',
									flexDirection: 'column',
									alignItems: 'center'
								}}
							>
								<View
									style={{
										flex: 1,
										width: '100%',
										height: '100%',
										flexDirection: 'row',
										alignItems: 'center',
										paddingBottom: '2%'
									}}
								>
									<Text numberOfLines={1} style={styles.eventNameText}>
										{`${event.name}`}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.buttonPanel}>
					<FlatList
						data={this.state.buttons}
						renderItem={(button) => this.renderButton(button)}
						keyExtractor={(item, index) => index}
						numColumns={3}
					/>
				</View>
			</View>
		);
	}
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
		width: '100%',
		height: '100%',
		marginTop: Platform.OS === 'ios' ? 20 : 0
	},
	headerPanel: {
		flex: 0.38,
		backgroundColor: Color.transparent,
		margin: '2%',
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
		overflow: 'hidden'
	},
	topInfo: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: Color.green,
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingLeft: 12,
		paddingRight: 12,
		overflow: 'hidden'
	},
	eventLogo: {
		width: height * 0.15,
		height: height * 0.15,
		borderRadius: Platform.OS === 'ios' ? scale(45) : 90
	},
	date: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start'
	},
	dateText: {
		...Font.regular,
		color: Color.white,
		fontSize: moderateScale(15),
		paddingLeft: 6
	},
	eventName: {
		flex: 0.32,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignSelf: 'center',
		alignItems: 'flex-start',
		paddingTop: verticalScale(4),
		height: moderateScale(24)
	},
	eventNameText: {
		...Font.regular,
		color: Color.white,
		fontSize: moderateScale(24),
		textAlign: 'left',
		lineHeight: moderateScale(24)
	},
	buttonPanel: {
		flex: 0.62,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: '4%',
		backgroundColor: Color.white,
	},
	buttonIcon: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: Platform.OS === 'ios' ? 45 : 90,
		borderWidth: 1,
		width: scale(54),
		height: scale(54),
		borderColor: Color.darkGray
	},
	buttonText: {
		...Font.light,
		color: Color.darkGray
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		width: width / 3.00,
		height: height * 0.18
	}
});

export default connect(mapStateToProps)(HomeScreen);
