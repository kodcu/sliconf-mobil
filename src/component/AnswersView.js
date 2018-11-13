import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import _ from 'lodash';

import AnswerButton from './AnswerButton';
import Color from '../theme/Color';
import Font from '../theme/Font';
import * as Scale from '../theme/Scale';

class AnswersView extends React.Component {
	state = {
		currentIndex: this.props.currentIndex,
		questionId: this.props.questionId,
		questionName: this.props.questionName,
		answers: this.props.answers,
		selectedAnswers: this.props.selectedAnswers,
		onlyView: this.props.onlyView,
		participants: this.props.participants
	}

	/**
	 * Handless rendering of the new state
	 * @param {Object} nextProps next state as props
	 */
	componentWillReceiveProps(nextProps) {
		const { selectedAnswers, currentIndex } = this.state;
		if (nextProps.currentIndex !== currentIndex) {
			if (!_.isEqual(nextProps.selectedAnswers, selectedAnswers)) {
				this.setState(nextProps);
			}
			this.setState({
				currentIndex: nextProps.currentIndex,
				questionId: nextProps.questionId,
				questionName: nextProps.questionName,
				answers: nextProps.answers,
				onlyView: nextProps.onlyView,
				participants: nextProps.participants
			});
		}
	}
	/**
	 * Passes answer press to parent class PollScreen
	 * @param {string} answerId - id of pressed answer
	 * @param {string} answerText - text of pressed answer
	 */
	onAnswerPress = (answerId, answerText) => {
		const { currentIndex, questionId } = this.state;

		this.props.onAnswerSelect(currentIndex, questionId, answerId, answerText);
	}
	/**
	 * Renders answer inside answer view.
	 * @param {Object} answers - answers as an object array
	 * @param {string} answers.answer.text - answer text
	 * @param {number} answers.answer.voters - current percentage of the answer
	 * @param {string} selectedAnswerId - current selected answers id
	 * @param {string} selectedAnswerText - current selected answers text
	 * @param {number} participants - current surveys participants
	 * @param {boolean} onlyView - handless touchable opacity
	 * @returns {Array} answer buttons as array of components
	 */
	renderAnswers = (answers, selectedAnswerId, selectedAnswerText, participants, onlyView) => {
		const buttons = [];

		const anyAnswerPressed = Boolean(selectedAnswerId && selectedAnswerText);

		const hundred = 100;
		//Find the biggest vote from answers.
		const maxVote = answers.reduce((max, answer) => {
			const isPressed = Boolean(
				anyAnswerPressed &&
				selectedAnswerId.trim() === answer.id.trim() &&
				selectedAnswerText.trim() === answer.text.trim()
			);
			const vote = isPressed ? (answer.voters + 1) : answer.voters;
			return vote >= max ? vote : max;
		}, answers[0].voters); //Initial value of max variable

		const isMaxVoteNotZero = maxVote !== 0;

		answers.forEach((answer) => {
			const isPressed = Boolean(
				anyAnswerPressed &&
				selectedAnswerId.trim() === answer.id.trim() &&
				selectedAnswerText.trim() === answer.text.trim()
			);
			const vote = isPressed ? (answer.voters + 1) : answer.voters;
			const totalVoteCount = onlyView ? participants : (participants + 1);
			//Create a progress from vote ratio to maxVote.
			const progress = isMaxVoteNotZero ?
				(hundred * vote) / maxVote :
				0;
			const percentage = totalVoteCount && vote / totalVoteCount;

			buttons.push(
				(<AnswerButton
					key={`${answer.id}${answer.text}`}
					answerId={answer.id.trim()}
					answerText={answer.text.trim()}
					progress={progress}
					percentage={percentage}
					isPressed={isPressed}
					anyAnswerSelected={onlyView ? true : anyAnswerPressed}
					onAnswerPress={this.onAnswerPress}
					onlyView={onlyView}
				/>)
			);
		});

		return buttons;
	}
	/**
	 * Returns you already answered this question text.
	 * @param {string} questionId id of the current question.
	 * @param {Object} selectedAnswers propertie values are answer text and keys are question ids.
	 * @returns {Component} text component
	 */
	getAlreadyAnsweredComponent = (questionId, selectedAnswers) =>
		(<View style={{ alignItems: 'center', justifyContent: 'center' }}>
			<Text
				style={styles.alreadyAnswered}
			>{selectedAnswers[questionId] ?
				`You already answered this survey.\nYour answer is: ${selectedAnswers[questionId]}` :
				'You already answered this survey.\nHowever you did not answered this question'}</Text>
		</View>);

	render() {
		const {
			answersContainer,
			questionNameContainer,
			questionNameText,
			scrollView
		} = styles;

		const {
			questionId,
			questionName,
			answers,
			selectedAnswers,
			currentIndex,
			onlyView,
			participants
		} = this.state;

		let selectedAnswerId,
			selectedAnswerText;

		if (selectedAnswers) {
			if (selectedAnswers[currentIndex] && selectedAnswers[currentIndex].text.trim() !== '') {
				selectedAnswerId = selectedAnswers[currentIndex].id;
				selectedAnswerText = selectedAnswers[currentIndex].text;
			}
		}

		return (
			<View style={answersContainer}>
				<View style={questionNameContainer}>
					<Text
						style={questionNameText}
						numberOfLines={2}
					>{questionName}</Text>
				</View>
				{onlyView && this.getAlreadyAnsweredComponent(questionId, selectedAnswers)}
				<ScrollView style={scrollView}>
					{this.renderAnswers(
						answers,
						selectedAnswerId,
						selectedAnswerText,
						participants,
						onlyView
					)}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	answersContainer: {
		flex: 1,
		alignSelf: 'flex-start',
		backgroundColor: Color.white,
		marginBottom: 10
	},
	questionNameContainer: {
		justifyContent: 'center',
		borderBottomWidth: 0.8,
		borderColor: Color.green,
		height: Scale.verticalScale(68)
	},
	questionNameText: {
		...Font.regular,
		textAlign: 'center',
		color: Color.green,
		fontSize: Scale.verticalScale(16),
		padding: 2
	},
	scrollView: {
		flex: 1,
		alignSelf: 'flex-start',
		paddingBottom: 2,
		backgroundColor: Color.white,
		height: (Scale.verticalScale(72) * 5)
	},
	alreadyAnswered: {
		...Font.regular,
		alignSelf: 'center',
		paddingLeft: 4,
		fontSize: Scale.verticalScale(16)
	}
});

export default AnswersView;
