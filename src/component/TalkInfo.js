import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Thumbnail } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import moment from 'moment';

import { moderateScale } from "../theme/Scale";
import getImageHelper from "../helpers/getImageHelper";

const mapStateToProps = (state) => ({
	rooms: state.event.event.rooms,
	speakers: state.event.event.speakers
});

class TalkInfo extends Component {
	getRoomName(roomId) {
		const roomsTags = this.props.rooms;
		const room = roomsTags.find(room => room.id === roomId)
		return room.label;
	}

	getSpeaker(speakerId) {
		const speakers = this.props.speakers;
		const speaker = speakers.find(speaker => speaker.id === speakerId)
		return speaker;
	}

	render() {
		const talk = this.props.talk;
		const speaker = this.getSpeaker(talk.speaker);
		return (
			<View style={styles.container}>
				<View
					style={{
						height: Dimensions.get('window').height - 200,
						alignItems: 'center',
						padding: 10,
						paddingTop: 0
					}}
				>
					<Text
						style={{
							fontSize: moderateScale(15),
							fontFamily: 'Montserrat-Medium',
							color: '#333',
							textAlign: 'center',
							paddingLeft: 10,
							paddingRight: 10
						}}
					>{talk.topic}</Text>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'flex-start',
							flexDirection: 'row',
							paddingLeft: 10,
							paddingRight: 10,
							width
						}}
					>
						<Text
							style={{
								fontSize: moderateScale(13),
								fontFamily: 'Montserrat-Bold',
								color: '#333',
								textAlign: 'center',
							}}
						>Level: </Text>
						<Text
							style={{
								fontSize: moderateScale(13),
								fontFamily: 'Montserrat-Regular',
								color: '#333',
								textAlign: 'center',
							}}
						>{talk.level === 1 ?
							'Beginner' :
							talk.level === 2 ?
								'Intermediate' :
								'Expert'}</Text>
					</View>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'flex-start',
							flexDirection: 'row',
							paddingLeft: 10,
							paddingRight: 10,
							width
						}}
					>
						<Text
							style={{
								fontSize: moderateScale(13),
								fontFamily: 'Montserrat-Bold',
								color: '#333',
								textAlign: 'center',
							}}
						>Tags: </Text>
						<Text
							style={{
								fontSize: moderateScale(13),
								fontFamily: 'Montserrat-Regular',
								color: '#333',
								textAlign: 'center',
							}}
						>{talk.tags.toString()}</Text>
					</View>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'flex-start',
							flexDirection: 'row',
							paddingLeft: 10,
							paddingRight: 10,
							width
						}}
					>
						<Text
							style={{
								fontSize: moderateScale(13),
								fontFamily: 'Montserrat-Bold',
								color: '#333',
								textAlign: 'center',
							}}
						>Room: </Text>
						<Text
							style={{
								fontSize: moderateScale(13),
								fontFamily: 'Montserrat-Regular',
								color: '#333',
								textAlign: 'center',
							}}
						>{this.getRoomName(talk.room)}</Text>
					</View>
					<ScrollView style={{ padding: 10 }}>
						<Text
							style={{
								color: '#666',
								fontFamily: 'Montserrat-Regular',
								fontSize: moderateScale(16),
								textAlign: 'left',
								paddingBottom: 10
							}}
						>{talk.detail}</Text>
					</ScrollView>
				</View>
				<View
					style={{
						alignItems: 'center',
						height: 60,
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 10,
						width
					}}
				>
					<View style={{ flexDirection: 'row', alignItems: 'center', width: width * 0.8 }}>
						<Thumbnail
							source={!speaker.profilePicture.trim() ? require('../../images/hi.png') :
								{ uri: getImageHelper(speaker.profilePicture) }}
							style={{ marginRight: 10 }}
						/>
						<Text
							style={{
								width: (width * 0.8) - 80,
								fontSize: moderateScale(16),
								fontFamily: 'Montserrat-Medium',
								color: '#333',
							}}
						>{speaker.name}</Text>
					</View>
					<View style={{ alignItems: 'flex-end', width: width * 0.2 }}>
						<View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 2, }}>
							<Text
								style={{
									color: '#333',
									fontFamily: 'Montserrat-Regular',
									fontSize: moderateScale(11)
								}}
							>{moment(talk.date).format('HH:mm')}</Text>
							<Icon style={{ paddingLeft: 10 }} color='#333' name='ios-clock-outline' size={18} />
						</View>
						<View style={{}}>
							<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
								<Text
									style={{
										color: '#333',
										fontFamily: 'Montserrat-Regular',
										fontSize: moderateScale(11)
									}}
								>{moment(talk.date).format('DD MMM')}</Text>
								<Icon
									style={{ paddingLeft: 10 }} size={18}
									color='#333' name='ios-calendar-outline'
								/>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const width = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
});

export default connect(mapStateToProps)(TalkInfo);
