import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
	Alert
} from 'react-native';
import { connect } from 'react-redux';

import { TALK } from '../router';
import { actionCreators as actionTalk } from '../reducks/module/talk';
import { moderateScale } from '../theme/Scale';
import SpeakerInfoCard from './SpeakerInfoCard';

const mapStateToProps = (state) => ({
	user: state.auth.login ? state.auth.user : state.authDevice.user,
	event: state.event.event,
	userVote: state.talk.userVote,
	voteValue: state.talk.voteValue,
	voteMessage: state.talk.errorMessage,
	voteError: state.talk.error
});

class SpeakerInfoView extends Component {
	state = {
		talks: this.props.talks,
		user: this.props.user,
		event: this.props.event,
		scrollSize: 0
	}

	onSubmit = async (value, talkId) => {
		const { dispatch } = this.props;
		const { user, event } = this.state;
		const userId = user.id;
		const eventId = event.id;
		await dispatch(
			actionTalk.voteTalk(eventId, talkId, userId, value)
		);
		await dispatch(
			actionTalk.getVoteByUser(eventId, talkId, userId)
		);
		const { voteError, voteMessage, userVote, voteValue } = this.props;
		if (voteError) {
			Alert.alert(
				'Warning!',
				voteMessage,
				[
					{
						text: 'OK'
					},
				],
				{ cancelable: false }
			);
			return { userVote: false, voteValue: undefined };
		}
		return { userVote, voteValue };
	}

	onSizeChange = (contentWidth, contentHeight) => {
		this.setState({ scrollSize: contentHeight });
	}

	renderTalks = (talks, user, event) => {
		let buttons = [];
		
		talks.forEach((talk, index) => {
			buttons.push(
				<TouchableOpacity
					key={`${talk.id}+${index}`}
					style={{ width: '100%' }}
					onPress={() => this.props.navigation.navigate(TALK, talk)}
				>
					<SpeakerInfoCard
						key={`${talk.id}+${index}`}
						talk={talk}
						user={user.id}
						event={event.id}
						onSubmitPress={this.onSubmit}
					/>
				</TouchableOpacity>
			);
		});

		return buttons;
	}

	render() {
		const { talksContainer } = styles;
		const { talks, user, event, scrollSize } = this.state;
		const scrollHeight = scrollSize ?
			((talks.length * moderateScale(145)) + talks.length + 2) :
			scrollSize + (talks.length * moderateScale(253.75));

		return (
			<ScrollView style={{ height: scrollHeight }} onContentSizeChange={this.onSizeChange}>
				<View style={talksContainer}>
					{this.renderTalks(talks, user, event)}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	talksContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		margin: 10
	}
});

export default connect(mapStateToProps)(SpeakerInfoView);
