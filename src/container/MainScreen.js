import React, { Component } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Alert,
	AsyncStorage,
	Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { actionCreators } from '../reducks/module/event';
import { EVENT_STACK, EVENTSEARCH } from '../router';
import Loading from '../component/Loading';
import Header from '../component/Header';
import AnimatedInput from '../component/AnimatedInput';
import Color from '../theme/Color';
import Font from '../theme/Font';
import * as Scale from '../theme/Scale';
import Similarity from '../helpers/StringLikeliness';

const logo = require('../../images/logo.png');

const mapStateToProps = (state) => ({
	loading: state.event.loading,
	error: state.event.error,
	errorMessage: state.event.errorMessage,
	login: state.auth.login,
	userDevice: state.authDevice.user,
	user: state.auth.user,
	events: state.event.events
});

class MainScreen extends Component {
	state = {
		search: true,
		loadingModal: false,
		code: '',
		eventName: ''
	};

	componentWillMount() {
		AsyncStorage.multiGet(['Code', 'eventName']).then(results => {
			this.setState({
				code: results[0][1],
				eventName: results[1][1]
			});
		});
	}

    /**
     * Girilen etkinkik koduna gore servisten etkinligi getirir
     * @param code aranan etkinlik kodu
     * @returns {Promise.<void>}
     */
	getEvent = async (code) => {
		if (code.length !== 4) return false;

		//this.setState({ loadingModal: true });
		const { dispatch, login, userDevice, user } = this.props;
		const userId = !login ? userDevice.id : user.id;
		await dispatch(actionCreators.fetchEvent(code, userId));
		const { error, loading } = this.props;
		//const { error, errorMessage } = this.props;

		if (error) return false;
		/*if (error) {
			Alert.alert(
				'Warning!',
				errorMessage,
				[
					{ text: 'OK', onPress: () => this.setState({ loadingModal: loading }) },
				],
				{ cancelable: false }
			);
			return false;
		}*/

		if (!error && !loading) {
			//this.setState({ loadingModal: loading });
			if (code !== this.state.code) {
				AsyncStorage.setItem('Code', code);
			}
			this.props.navigation.navigate(EVENT_STACK);
			return true;
		}
		return false;
	};

	goToEventSearch = async (code) => {
		await this.props.dispatch(actionCreators.getEventsWithName(code));
		const { events } = this.props;
		if (events && events.length > 0) {
			if (events.length === 1 && events[0]) {
				this.getEvent(events[0].key);
			} else {
				for (const event of events) {
					//Used to calculate how close our event's code is to the code input
					const codeSimilarity = Similarity(event.key, code);
					const eventName = event.name.length > 8 ? event.name.slice(0, 8) : event.name;
					//Used to calculate how close our event's name is to the name input
					const nameSimilarity = Similarity(eventName, code);
					event.similarity = (codeSimilarity + nameSimilarity) / 2.0;
				}
				const filtered = events.filter(
					event => event.name.toLowerCase().includes(code.toLowerCase())
				);
				filtered.sort((a, b) => {
					const similarityA = Number(a.similarity);
					const similarityB = Number(b.similarity);
					if (similarityA < similarityB) return 1;
					if (similarityA > similarityB) return -1;
					return 0;
				});
				this.props.navigation.navigate(
					EVENTSEARCH,
					{ events: filtered, getEvent: this.getEvent, dispatch: this.props.dispatch }
				);
			}
		} else {
			Alert.alert('Warning!', 'Search result not exists.');
			return;
		}
	}

    /**
     * Etkinlik arama islemini tetikler
     * @param value aranan etkinlik kodu
     * @private
     */
	async _handlePressSearch(value) {
		if (value) {
			const check = await this.getEvent(value);
			if (!check) {
				this.goToEventSearch(value);
				Keyboard.dismiss();
			}
		}
	}

    /**
     * QR code sayfasini kapatir
     * @private
     */
	_hide() {
		this.setState({ search: true });
	}

	render() {
		const loading = this.props.loading;
		const { search, code, eventName } = this.state;

		return (
			<View style={styles.container}>
				<Loading visible={loading} />
				{search ?
					(<KeyboardAwareScrollView keyboardShouldPersistTaps={'never'}>
						<View style={styles.container}>
							<Header />
							<View style={styles.logoContainer}>
								<Image style={styles.image} source={logo} />
								<Text style={styles.title}>Welcome to SliConf</Text>
								<Text style={styles.subtitle}>Conferences at your fingertips</Text>
							</View>
							<View style={styles.containerBottom}>
								<View style={styles.search}>
									<AnimatedInput
										label={'Event Code'}
										iconClass={FontAwesomeIcon}
										iconName={'search'}
										iconColor={Color.white}
										inputStyle={{ color: Color.green }}
										onSubmitEditing={(value) => {
											this._handlePressSearch(value);
										}}
									/>
									{<TouchableOpacity
										style={styles.search}
										onPress={() => this._handlePressSearch(code)}
									>
										<View style={{ flex: 1, flexDirection: 'row' }}>
											<Text
												style={styles.title2}
												numberOfLines={1}
											>{eventName}</Text>
										</View>
									</TouchableOpacity>}
									<TouchableOpacity
										style={styles.qrcode}
										onPress={() => this.setState({ search: false })}
									>
										<Icon name='qrcode-scan' size={64} color={Color.darkGray} />
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</KeyboardAwareScrollView>) : (<View style={styles.container}>
						<Header
							rightImage='close'
							onPressRight={() => this._hide()}
						>
							<Header.Title title="QR Code" />
						</Header>
						<QRCodeScanner
							onRead={(e) => {
								this._hide();
								this.getEvent(e.data);
							}}
						/>
						<View />
					</View>)
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Color.white
	},
	containerBottom: {
		flex: 1,
		padding: 10
	},
	search: {
		flex: 1,
		width: Scale.width - 80,
		justifyContent: 'flex-start',
		padding: 10
	},
	image: {
		height: 100,
		width: 100,
		marginBottom: 10,
		marginTop: 40
	},
	logoContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		...Font.semiBold,
		color: Color.green,
		marginTop: 10,
		textAlign: 'center',
		fontSize: Scale.verticalScale(18)
	},
	title1: {
		...Font.semiBold,
		color: Color.green,
		marginTop: 10,
		textAlign: 'center',
		fontSize: Scale.verticalScale(18),
		marginRight: 5
	},
	title2: {
		...Font.semiBold,
		color: Color.green,
		marginTop: 8,
		fontSize: Scale.verticalScale(16),
		width: '100%'
	},
	subtitle: {
		...Font.light,
		fontSize: Scale.verticalScale(12),
		marginBottom: 5,
		color: Color.darkGray5
	},
	qrcode: {
		marginTop: 30,
		alignItems: 'center'
	}
});

export default connect(mapStateToProps)(MainScreen);
