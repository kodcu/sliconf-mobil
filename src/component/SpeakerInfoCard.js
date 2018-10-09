import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Slider
} from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';

import { actionCreators as actionTalk } from '../reducks/module/talk';
import If from './If';
import { Heart } from './Selectables';
import Emoji from '../helpers/rateEmoji';
import Font from '../theme/Font';
import { moderateScale, width } from '../theme/Scale';
import Color from '../theme/Color';

const mapStateToProps = (state) => ({
	rooms: state.event.event.rooms,
	speakers: state.event.event.speakers,
	userVote: state.talk.userVote,
	voteValue: state.talk.voteValue
});

class SpeakerInfoCard extends Component {
	state = {
		talk: this.props.talk,
		user: this.props.user,
		event: this.props.event,
		onSubmit: this.props.onSubmitPress,
		voteValue: {},
		userVote: false,
		heartPressed: false,
		sliderView: true,
		value: 3,
		smiley: Emoji[2],
		message: [
			'Wretched',
			'Bad',
			'Passable',
			'Good',
			'Wonderful'
		]
	};

	async componentWillMount() {
		const { talk, user, event } = this.state;

		await this.props.dispatch(
			actionTalk.getVoteByUser(event, talk.id, user)
		);

		const { userVote, voteValue } = this.props;

		if (voteValue && voteValue.vote && voteValue.vote.sessionId) {
			if (talk.id === voteValue.vote.sessionId) {
				if (userVote) {
					this.setState({ userVote, voteValue, sliderView: false });
				} else {
					this.setState({ userVote, voteValue, sliderView: true });
				}
			}
		}
	}

	onHeartPress = () => {
		this.setState({ heartPressed: !this.state.heartPressed });
	}

	onChange = () => {
		this.setState({ sliderView: true });
		setTimeout(() => this.setState({ sliderView: false }), 3600);
	}

	getSmiley = (value) => {
		this.setState({ smiley: Emoji[value - 1], value });
	};

	getColorByLevel(level) {
		let color;
		switch (level) {
			case 0:
				color = Color.green;
				break;
			case 1:
				color = Color.yellow;
				break;
			case 2:
				color = Color.red2;
				break;
			default:
				color = Color.white;
		}
		return color;
	}

	getRoomName(roomId) {
		return this.props.rooms.find(room => room.id === roomId).label;
	}

	getSpeakerName(speakerId) {
		return this.props.speakers.find(speaker => speaker.id === speakerId).name;
	}

    /**
     * params {value} = user vote value
     * params {id} = talk.id
     */
	submitPress = async (value, id) => {
		const { userVote, voteValue } = await this.state.onSubmit(value, id);

		if (voteValue && voteValue.vote) {
			if (voteValue.vote.sessionId === id) {
				this.setState({
					userVote,
					voteValue,
					sliderView: false
				});
			}
		}
	}

	render() {
		const {
			talk,
			userVote,
			voteValue,
			heartPressed,
			sliderView,
			value,
			smiley,
			message
		} = this.state;

		let talkValue = 3;
		let userValue = 3;

		if (voteValue) {
			const { session, vote } = voteValue;
			if (vote && vote.sessionId) {
				if (vote.sessionId === talk.id) {
					talkValue = session.star;
					userValue = vote.value;
				}
			}
		}

		return (
			heartPressed ?
				<View style={[styles.mainContainer, { flexDirection: 'column' }]}>
					<View style={styles.container}>
						<View style={[styles.cardLine, { borderColor: this.getColorByLevel(talk.level) }]} />
						<View style={styles.detailField}>
							<Text style={styles.topic}>{talk.topic}</Text>
							<Text style={styles.speaker}>{this.getSpeakerName(talk.speaker)}</Text>
							<View style={styles.infoField}>
								<Text style={styles.topic}>{moment(talk.date).format('HH:mm')}</Text>
								<Text style={styles.topic}>{moment(talk.date).format('DD MMM YYYY')}</Text>
								<Text style={styles.topic}>{this.getRoomName(talk.room)}</Text>
							</View>
						</View>
						<View style={styles.actionField}>
							<Heart
								color={Color.green} size={36}
								smiley={smiley}
								style={styles.heartField}
								onHeartPress={this.onHeartPress}
								heartPressed={heartPressed}
							/>
						</View>
					</View>
					<If con={!userVote || sliderView}>
						<If.Then>
							<View style={styles.changeView}>
								<Text style={styles.textQuestion}>Did you like talk?</Text>
								<Text
									style={styles.textDesc}
								>Use the slide to tell it in the language of Emojis.</Text>
								<Slider
									style={styles.slider}
									maximumValue={5}
									minimumValue={1}
									step={1}
									value={value}
									maximumTrackTintColor={Color.darkGray}
									minimumTrackTintColor={Color.green}
									onValueChange={(currentValue) => this.getSmiley(currentValue)}
								/>
								<View style={styles.selectView}>
									<Text style={styles.selectText}>I think it was</Text>
									<Text style={styles.selectTextBold}>{message[value - 1]}</Text>
								</View>
							</View>
							<View style={styles.buttonView}>
								<Button
									vertical
									transparent
									onPress={this.onHeartPress}
									style={styles.modalButton}
								>
									<Text style={styles.textButton}>Close</Text>
								</Button>
								<Button
									vertical
									transparent
									onPress={() => this.submitPress(value, talk.id)}
									style={styles.modalButton}
								>
									<Text style={styles.textButton}>Submit</Text>
								</Button>
							</View>
						</If.Then>
						<If.Else>
							<View style={styles.showView}>
								<View style={styles.resultView}>
									<Text style={styles.textQuestion}>You</Text>
									<Image
										source={Emoji[userValue - 1]}
										style={{ width: 50, height: 50, margin: 5 }}
									/>
									<Text style={styles.selectText}>Point: {userValue}</Text>
									<Text style={styles.selectTextBold}>{message[userValue - 1]}</Text>
								</View>
								<View style={styles.resultView}>
									<Text style={styles.textQuestion}>Total</Text>
									<Image
										source={Emoji[talkValue.toFixed(0) - 1]}
										style={{ width: 50, height: 50, margin: 5 }}
									/>
									<Text style={styles.selectText}>Point: {talkValue.toFixed(1)}</Text>
									<Text style={styles.selectTextBold}>{message[talkValue.toFixed(0) - 1]}</Text>
								</View>
							</View>
							<View style={styles.buttonView}>
								<Button
									vertical transparent
									onPress={this.onHeartPress}
									style={styles.modalButton}
								>
									<Text style={styles.textButton}>Close</Text>
								</Button>
								<Button
									vertical
									transparent
									onPress={this.onChange}
									style={styles.modalButton}
								>
									<Text style={styles.textButton}>Change</Text>
								</Button>
							</View>
						</If.Else>
					</If>
				</View>
				:
				<View style={styles.firstContainer}>
					<View
						style={
							[styles.cardLine, { borderColor: this.getColorByLevel(talk.level) }]
						}
					/>
					<View style={styles.detailField}>
						<Text style={styles.topic}>{talk.topic}</Text>
						<Text style={styles.speaker}>{this.getSpeakerName(talk.speaker)}</Text>
						<View style={styles.infoField}>
							<Text style={styles.topic}>{moment(talk.date).format('HH:mm')}</Text>
							<Text style={styles.topic}>{moment(talk.date).format('DD MMM YYYY')}</Text>
							<Text style={styles.topic}>{this.getRoomName(talk.room)}</Text>
						</View>
					</View>
					<View style={styles.actionField}>
						<Heart
							color={Color.green} size={36}
							smiley={smiley}
							style={styles.heartField}
							onHeartPress={this.onHeartPress}
							heartPressed={heartPressed}
						/>
					</View>
				</View>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: Color.white,
		borderRadius: 8,
		margin: 10,
		borderColor: Color.gray3,
		borderWidth: 1
	},
	firstContainer: {
		backgroundColor: Color.white,
		borderRadius: 8,
		flexDirection: 'row',
		margin: 10,
		borderColor: Color.gray3,
		borderWidth: 1
	},
	container: {
		backgroundColor: Color.white,
		flexDirection: 'row'
	},
	detailField: {
		flex: 0.8,
		justifyContent: 'space-between'
	},
	cardLine: {
		borderWidth: 1,
		margin: 10,
		marginTop: 0,
		marginBottom: 0
	},
	changeView: {
		margin: 2,
		padding: 2,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	},
	showView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	resultView: {
		flex: 1,
		alignSelf: 'center',
		alignItems: 'center'
	},
	buttonView: {
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		height: 60,
		backgroundColor: Color.green,
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
		flexDirection: 'row',
	},
	topic: {
		...Font.regular,
		fontSize: moderateScale(11),
		textAlign: 'left',
		textAlignVertical: 'center',
		color: '#000000',
		margin: 4
	},
	speaker: {
		...Font.regular,
		fontSize: moderateScale(9),
		textAlign: 'left',
		margin: 4
	},
	infoField: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	actionField: {
		flex: 0.2,
		margin: 4,
		padding: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	heartField: {
		width: 52,
		height: 52,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	},
	slider: {
		width: (width - 60) * 0.75,
		paddingTop: 10,
	},
	textQuestion: {
		...Font.medium,
		textAlign: 'center',
		fontSize: moderateScale(18),
		color: Color.darkGray
	},
	textDesc: {
		...Font.regular,
		textAlign: 'center',
		fontSize: moderateScale(15),
		color: Color.darkGray4,
	},
	modalButton: {
		width: (width - 60) / 2,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textButton: {
		...Font.medium,
		color: Color.white,
		fontSize: moderateScale(20)
	},
});

export default connect(mapStateToProps)(SpeakerInfoCard);
