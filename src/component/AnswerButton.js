import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';

import Color from '../theme/Color';
import * as Scale from '../theme/Scale';
import Font from '../theme/Font';
import { Circle } from '../component/Selectables';

class AnswerButton extends React.Component {
	state = {
		answerId: this.props.answerId,
		answerText: this.props.answerText,
		onlyView: this.props.onlyView
	}

	/**
	 * Renders text on top of the bar
	 * @param {string} answerText displayed answerText
	 * @param {boolean} filled handles color of text
	 * @returns {Component} bar text
	 */
	renderBarText = (answerText, filled) => {
		const color = filled ? Color.white : Color.darkGray;
		return (
			<View style={styles.textViewContainer}>
				<View
					style={[
						styles.textViewStyle,
						{ flex: 0.83, paddingLeft: 2 }
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
					>{answerText}</Text>
				</View>
				<View
					style={[styles.textViewStyle, {
						flex: 0.17, paddingRight: 1
					}]}
				>
					<Text
						style={[
							styles.answerText,
							{
								alignSelf: 'flex-start',
								textAlign: 'right',
								width: '100%',
								color
							}
						]}
					>{`${Number(this.props.percentage * 100).toPrecision(3)}%`}</Text>
				</View>
			</View>
		);
	}

	/**
	 * Renders answerText bars
	 * @param {string} answerText text to be displayed
	 * @param {number} progress progress from vote count
	 * @param {boolean} pressed handless pressing
	 * @param {boolean} anyPressed handless not selected answers
	 * @returns {Component} button
	 */
	renderAnswerBar = (answerText, progress, pressed, anyPressed) => {
		//96% of the screen handless bar width this comes from design choices
		const width = ((Scale.width * 9.6) / 10);
		const hundred = 100;

		if (anyPressed) {
			return (
				<View style={[styles.answerView, { alignItems: 'center', justifyContent: 'center' }]}>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Progress.Bar
							color={pressed ? Color.green : Color.darkGray5}
							height={Scale.verticalScale(34)}
							width={width}
							borderRadius={8}
							progress={progress / hundred}
							indeterminate={false}
						>
							{this.renderBarText(answerText, (progress === 100))}
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
				><Circle isPressed color={Color.darkGray5} size={16} />{`  ${answerText}`}</Text>
			</View>
		);
	}

	/**
	 * Renders touchable button template
	 * @param {string} answerText text to be displayed
	 * @param {string} answerId unique id of answerText
	 * @param {number} progress progress of the bar proportioned to highest answerText
	 * @param {boolean} pressed handless color of selected answers
	 * @param {boolean} anyAnswerSelected handless color of not selected answers
	 * @param {boolean} onlyView - handless touchable opacity
	 */
	renderButton = (answerText, answerId, progress, pressed, anyAnswerSelected, onlyView) => {
		const displayAnswer = answerText.trim();
		if (onlyView) {
			return (
				this.renderAnswerBar(
					displayAnswer,
					progress,
					pressed,
					anyAnswerSelected
				)
			);
		}
		return (
			<TouchableOpacity onPress={() => this.props.onAnswerPress(answerId, answerText)}>
				{this.renderAnswerBar(
					displayAnswer,
					progress,
					pressed,
					anyAnswerSelected
				)}
			</TouchableOpacity>
		);
	};

	render() {
		const { container } = styles;
		const { answerText, answerId, onlyView } = this.state;
		const { progress, isPressed, anyAnswerSelected } = this.props;

		return (
			<View key={answerText} style={container}>
				{this.renderButton(
					answerText,
					answerId,
					progress,
					isPressed,
					anyAnswerSelected,
					onlyView
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
