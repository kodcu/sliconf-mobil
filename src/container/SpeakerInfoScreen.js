import React, { Component } from 'react';
import {
	Animated,
	Dimensions,
	Image,
	Linking,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';

import Header from '../component/Header';
import SpeakerInfoView from '../component/SpeakerInfoView';
import Color from '../theme/Color';
import Font from '../theme/Font';
import { moderateScale } from '../theme/Scale';
import getImage from '../helpers/getImageHelper';

const phoneW = Dimensions.get('window').width - 50;
const phoneH = Dimensions.get('window').height - 50;
const AnimatedView = Animated.createAnimatedComponent(View);

const mapStateToProps = (state) => ({
	agenda: state.event.event.agenda
});

class SpeakerInfoScreen extends Component {

	state = {
		height: new Animated.Value(0),
		width: new Animated.Value(0),
		isAboutOpen: false,
		talkList: []
	};

	componentWillMount() {
		const speaker = this.props.navigation.state.params.item;
		const agenda = this.props.agenda;

		let talks = [];

		if (agenda !== undefined && agenda !== null && !agenda.isEmpty) {
			talks = agenda.filter(talk => talk.speaker === speaker.id);
		}

		this.setState({ talkList: talks });
	}

    /**
     * About tusunun animasyonunu yonetir
     */
	startAnimation = () => {
		const { height, width } = this.state;
		this.setState({
			isAboutOpen: !this.state.isAboutOpen
		});

		if (!this.state.isAboutOpen) {
			height.setValue(0);
			width.setValue(0);
			Animated.spring(height, { toValue: phoneH - 290, friction: 7 }).start();
			Animated.spring(width, { toValue: phoneW, friction: 7 }).start();
		} else {
			height.setValue(0);
			width.setValue(0);
		}
	};

    /**
     * Internet sitesine yonlendirir.
     * @param url
     */
	redirect(url) {
		if (url !== '') {
			Linking.canOpenURL(url).then(supported => {
				if (supported) {
					Linking.openURL(url);
				} else {
					console.log('Don\'t know how to go');
				}
			}).catch(err => console.error('An error occurred', err));
		}
	}

	render() {
		const { state } = this.props.navigation;
		const speaker = state.params.item;
		const { height, width, talkList } = this.state;
		return (
			<Container style={{ backgroundColor: '#fff' }}>
				<Header
					leftImage='chevron-left'
					rightImage='bars'
					onPressLeft={() => this.props.navigation.goBack()}
					onPressRight={() => this.props.navigation.navigate('DrawerOpen')}
				>
					<Header.Title title="Speaker Info" />
				</Header>
				<View style={{ alignItems: 'center', height: 230 }}>
					<Image
						source={!speaker.profilePicture.trim() ?
							require('../../images/hi.png') :
							{ uri: getImage(speaker.profilePicture) }
						}
						style={styles.profilePicture}
					/>
					<Text style={styles.speakerName}>{speaker.name}</Text>
					<Text style={styles.speakerWorking}>{speaker.workingAt}</Text>
					<View style={{ flexDirection: 'row' }}>
						{speaker.twitter === '' ?
							null :
							<TouchableOpacity onPress={() => this.redirect(speaker.twitter)}>
								<Icon
									name='twitter-with-circle'
									size={30} color="#379BD9"
									style={{ margin: 10 }}
								/>
							</TouchableOpacity>}
						{speaker.linkedin === '' ?
							null :
							<TouchableOpacity onPress={() => this.redirect(speaker.linkedin)}>
								<Icon
									name='linkedin-with-circle'
									size={30}
									color="#1574AE"
									style={{ margin: 10 }}
								/>
							</TouchableOpacity>}
						<TouchableOpacity style={{ margin: 10 }} onPress={this.startAnimation}>
							<View style={styles.aboutButtonField}>
								<Text style={styles.aboutButtonText}>ABOUT</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				{
					this.state.isAboutOpen ?
						(
							<View style={styles.infoField}>
								<AnimatedView
									style={{
										width,
										height,
										borderWidth: 1,
										borderColor: Color.green,
										borderRadius: 10
									}}
								>
									<ScrollView style={{ margin: 15 }} showsVerticalScrollIndicator={false}>
										<Text style={styles.aboutText}>{speaker.about}</Text>
									</ScrollView>
								</AnimatedView>
							</View>
						)
						:
						(
							<SpeakerInfoView
								talks={talkList}
								navigation={this.props.navigation}
							/>
						)
				}
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	profilePicture: {
		borderRadius: Platform.OS === 'ios' ? 60 : 90,
		width: 120,
		height: 120,
		margin: 10
	},
	aboutButtonField: {
		borderRadius: 10,
		backgroundColor: Color.green,
		width: 90,
		height: 30,
		justifyContent: 'center'
	},
	aboutButtonText: {
		...Font.regular,
		color: Color.white,
		textAlign: 'center',
		textAlignVertical: 'center'
	},
	infoField: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 10
	},
	aboutText: {
		...Font.regular,
		margin: 10,
	},
	talksField: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		margin: 10
	},
	speakerName: {
		...Font.regular,
		fontSize: moderateScale(15),
		color: Color.darkGray
	},
	speakerWorking: {
		...Font.light,
		fontSize: moderateScale(12),
		color: Color.darkGray3
	}

});

export default connect(mapStateToProps)(SpeakerInfoScreen);
