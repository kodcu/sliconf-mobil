import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';

import Color from '../theme/Color';
import * as Scale from '../theme/Scale';
import Font from '../theme/Font';

class AnswerButton extends React.Component {
	state = {
		answer: this.props.answer,
		answerId: this.props.answerId,
		percentage: this.props.percentage || 0,
		progress: this.props.progress,
		isBiggest: this.props.isBiggest
	}

	/**
	 * Renders text on top of the bar
	 * @param {string} answer displayed answer
	 * @param {number} percentage displayed percentage
	 * @param {boolean} biggest handles color of text
	 * @returns {Component} bar text
	 */
	renderBarText = (answer, percentage, biggest) => {
		const color = biggest ? Color.white : Color.darkGray;
		return (
			<View style={styles.textViewContainer}>
				<View
					style={[
						styles.textViewStyle,
						{ flex: 0.84, paddingLeft: 2 }
					]}
				>
					<Text
						style={[
							styles.answerText,
							{
								alignSelf: 'flex-start',
								textAlign: 'left',
								width: '100%',
								color
							}
						]}
						numberOfLines={1}
					>{answer}</Text>
				</View>
				<View
					style={[styles.textViewStyle, {
						flex: 0.16, paddingRight: 2
					}]}
				>
					<Text
						style={[
							styles.answerText,
							{	
								alignSelf: 'flex-end',
								textAlign: 'right',
								width: '100%',
								color
							}
						]}
					>{`${percentage}%`}</Text>
				</View>
			</View>
		);
	}

	/**
	 * Renders answer bars
	 * @param {string} answer text to be displayed
	 * @param {number} percentage handless progress
	 * @param {boolean} pressed handless pressing
	 * @param {boolean} biggest handless black/white text
	 * @param {boolean} anyPressed handless not selected answers
	 * @returns {Component} button
	 */
	renderAnswerBar = (answer, percentage, progress, pressed, biggest, anyPressed) => {
		//96% of the screen handless bar width
		const width = ((Scale.width * 9.6) / 10);
		//console.log('answer: ' + answer);
		//console.log('percentage: ' + percentage)
		//console.log('\n')
		if (anyPressed) {
			if (pressed) {
				return (
					<View style={[styles.answerView, { alignItems: 'center', justifyContent: 'center' }]}>
						<View style={{ flex: 1, alignItems: 'center' }}>
							<Progress.Bar
								color={Color.green}
								height={Scale.verticalScale(34)}
								width={width}
								borderRadius={8}
								progress={biggest ? 1 : progress}
								indeterminate={false}
							>
								{this.renderBarText(answer, percentage, biggest)}
							</Progress.Bar>
						</View>
					</View>
				);
			}
			return (
				<View style={[styles.answerView, { alignItems: 'center', justifyContent: 'center' }]}>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Progress.Bar
							color={Color.darkGray5}
							height={Scale.verticalScale(34)}
							width={width}
							borderRadius={8}
							progress={progress}
							indeterminate={false}
						>
							{this.renderBarText(answer, percentage, biggest)}
						</Progress.Bar>
					</View>
				</View>
			);
		}

		return (
			<View style={styles.answerView}>
				<Text
					style={[styles.answerText, { width, paddingHorizontal: 8 }]}
					numberOfLines={1}
				>{answer}</Text>
			</View>
		);
	}

	/**
	 * Renders touchable button template
	 * @param {string} answer text to be displayed
	 * @param {string} answerId unique id of answer
	 * @param {number} percentage voter count of answer
	 * @param {number} progress progress of the bar proportioned to highest answer
	 * @param {boolean} pressed handless color of selected answers
	 * @param {boolean} biggest handless proportioning and text color
	 * @param {boolean} anyAnswerSelected handless color of not selected answers
	 */
	renderButton = (answer, answerId, percentage, progress, pressed, biggest, anyAnswerSelected) => {
		const displayAnswer = answer.trim();

		return (
			<TouchableOpacity onPress={() => this.props.onAnswerPress(answerId, answer)}>
				{this.renderAnswerBar(
					displayAnswer,
					percentage,
					progress,
					pressed,
					biggest,
					anyAnswerSelected
				)}
			</TouchableOpacity>
		);
	};

	render() {
		const { container } = styles;
		const { answer, answerId, percentage, progress, isBiggest } = this.state;
		const { isPressed, anyAnswerSelected } = this.props;

		return (
			<View key={answer} style={container}>
				{this.renderButton(
					answer,
					answerId,
					percentage,
					progress,
					isPressed,
					isBiggest,
					anyAnswerSelected
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'flex-start',
		backgroundColor: Color.white
	},
	textViewContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: Scale.verticalScale(34),
		width: '100%',
		position: 'absolute',
	},
	textViewStyle: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		alignSelf: 'center'
	},
	answerView: {
		flexDirection: 'row',
		height: Scale.verticalScale(72),
		width: Scale.width
	},
	answerText: {
		...Font.regular,
		alignSelf: 'center',
		paddingLeft: 4,
		fontSize: Scale.verticalScale(16)
	},
	percentageText: {
		...Font.regular,
		alignSelf: 'flex-end',
		paddingLeft: 4,
		textAlign: 'left',
		color: Color.darkGray,
		fontSize: Scale.verticalScale(16)
	}
});

export default AnswerButton;
