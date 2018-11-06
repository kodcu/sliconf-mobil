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
import { EVENT_STACK } from '../router';
import Loading from '../component/Loading';
import Header from '../component/Header';
import AnimatedInput from '../component/AnimatedInput';
import Color from '../theme/Color';
import Font from '../theme/Font';
import * as Scale from '../theme/Scale';

const logo = require('../../images/logo.png');

const mapStateToProps = (state) => ({
	loading: state.event.loading,
	error: state.event.error,
	errorMessage: state.event.errorMessage,
	login: state.auth.login,
	userDevice: state.authDevice.user,
	user: state.auth.user,
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
		this.setState({ loadingModal: true });
		const userId = !this.props.login ? this.props.userDevice.id : this.props.user.id;
		const { dispatch, loading } = this.props;
		await dispatch(actionCreators.fetchEvent(code, userId));
		const { error, errorMessage } = this.props;

		if (error)
			Alert.alert(
				'Warning!',
				errorMessage,
				[
					{ text: 'OK', onPress: () => this.setState({ loadingModal: loading }) },
				],
				{ cancelable: false }
			);

		if (!error && !loading) {
			this.setState({ loadingModal: loading });
			if (code !== this.state.code) {
				AsyncStorage.setItem('Code', code);
			}
			this.props.navigation.navigate(EVENT_STACK);
		}
	};

    /**
     * Etkinlik arama islemini tetikler
     * @param value aranan etkinlik kodu
     * @private
     */
	_handlePressSearch(value) {
		Keyboard.dismiss();
		if (value)
			this.getEvent(value);
	}

    /**
     * QR code sayfasini kapatir
     * @private
     */
	_hide() {
		this.setState({ search: true });
	}

	render() {
		const loading = this.state.loadingModal;
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
