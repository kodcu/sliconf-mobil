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
		selectedAnswers: this.props.selectedAnswers
	}

	/**
	 * Handless rendering of the new state
	 * @param {Object} nextProps next state as props
	 */
	componentWillReceiveProps(nextProps) {
		const { questionId, questionName, answers, selectedAnswers, currentIndex } = this.state;
		if (nextProps.currentIndex !== currentIndex) {
			if (nextProps.questionId.trim() !== questionId.trim()) {
				if (nextProps.questionName.trim() !== questionName.trim()) {
					if (!_.isEqual(nextProps.answers, answers)) {
						if (!_.isEqual(nextProps.selectedAnswers, selectedAnswers)) {
							this.setState(nextProps);
						}
						this.setState({
							currentIndex: nextProps.currentIndex,
							questionId: nextProps.questionId,
							questionName: nextProps.questionName,
							answers: nextProps.answers
						});
					}
				}
			} else {
				if (!_.isEqual(nextProps.selectedAnswers, selectedAnswers)) {
					this.setState(nextProps);
				}
				this.setState({
					currentIndex: nextProps.currentIndex,
					questionId: nextProps.questionId,
					questionName: nextProps.questionName,
					answers: nextProps.answers
				});
			}
		}
	}
	/**
	 * Handless answer press
	 * @param {string} answerId - id of pressed answer
	 * @param {string} answerText - text of pressed answer
	 */
	onAnswerPress = (answerId, answerText) => {
		const { currentIndex, questionId, selectedAnswers } = this.state;

		this.props.onAnswerSelect(currentIndex, questionId, answerId, answerText);

		if (answerId && answerText && answerText.trim() !== '') {
			selectedAnswers[currentIndex] = {};
			selectedAnswers[currentIndex]['question'] = questionId;
			selectedAnswers[currentIndex]['id'] = answerId;
			selectedAnswers[currentIndex]['text'] = answerText;
		} else {
			selectedAnswers[currentIndex] = {};
			selectedAnswers[currentIndex]['question'] = '';
			selectedAnswers[currentIndex]['id'] = '';
			selectedAnswers[currentIndex]['text'] = '';
		}

		this.setState({
			selectedAnswers
		});
	}
	/**
	 * Renders answer inside answer view.
	 * @param {Object} answers - answers as an object array
	 * @param {string} answers.answer.text - answer text
	 * @param {number} answers.answer.voters - current percentage of the answer
	 * @param {string} selectedAnswerId - current selected answers id
	 * @param {string} selectedAnswerText - current selected answers text
	 * @returns {Array} answer buttons as array of components
	 */
	renderAnswers = (answers, selectedAnswerId, selectedAnswerText) => {
		let buttons = [];

		const answerSelected = Boolean(
			selectedAnswerId &&
			selectedAnswerText &&
			selectedAnswerText.trim() !== ''
		);
		
		const hundred = 100;
		//Find biggest vote percentage for display as 100% percentage	
		var maxVoters = answers.reduce(
			(max, answer) => (max > answer.voters ? max : answer.voters, max)
		).voters;

		answers.forEach((answer) => {
			const isPressed = Boolean(
				selectedAnswerId &&
				selectedAnswerText &&
				selectedAnswerId.trim() === answer.id.trim() &&
				selectedAnswerText.trim() === answer.text.trim()
			);
			//Find ratio of individual answers
			const progress = answer.voters ?
				(hundred * answer.voters) / maxVoters :
				0
				;

			buttons.push(
				(<AnswerButton
					key={`${answer.id}${answer.text}`}
					answerId={answer.id.trim()}
					answer={answer.text.trim()}
					percentage={answer.voters || 0}
					progress={progress / hundred}
					isBiggest={maxVoters === answer.voters}
					isPressed={isPressed}
					anyAnswerSelected={answerSelected}
					onAnswerPress={this.onAnswerPress}
				/>)
			);
		});

		return buttons;
	}

	render() {
		const {
			answersContainer,
			questionNameContainer,
			questionNameText,
			scrollView
		} = styles;

		const {
			questionName,
			answers,
			selectedAnswers,
			currentIndex
		} = this.state;

		let selectedAnswerId,
			selectedAnswerText;
		//Will be deleted check in test first
		if (currentIndex > -1) {
			if (selectedAnswers) {
				if (selectedAnswers[currentIndex] && selectedAnswers[currentIndex].text.trim() !== '') {
					selectedAnswerId = selectedAnswers[currentIndex].id;
					selectedAnswerText = selectedAnswers[currentIndex].text;
				}
			}
		}

		return (
			<View style={answersContainer}>
				<View style={questionNameContainer}>
					<Text style={questionNameText}>{questionName}</Text>
				</View>
				<ScrollView style={scrollView}>
					{this.renderAnswers(answers, selectedAnswerId, selectedAnswerText)}
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
	}
});

export default AnswersView;
