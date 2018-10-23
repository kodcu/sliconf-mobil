import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AnswerButton from '../AnswerButton';

import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

const currentBiggest = 40;
const answer = {
	id: '11',
	text: 'Apple',
	voters: 25
};
const selectedAnswerId = '20';
const selectedAnswerText = 'Orange';
const answerSelected = Boolean(
	selectedAnswerId &&
	selectedAnswerText &&
	selectedAnswerText.trim() !== ''
);
const isPressed = Boolean(
	selectedAnswerId &&
	selectedAnswerText &&
	selectedAnswerId.trim() === answer.id.trim() &&
	selectedAnswerText.trim() === answer.text.trim()
);
const progress = answer.voters ?
	(100 * answer.voters) / currentBiggest :
	0;

describe('<AnswerButton /> testing with mock answer data', () => {
	it('Renders correctly', () => {
		const tree = renderer.create(
			<AnswerButton
				key={`${answer.id}${answer.text}`}
				answerId={answer.id.trim()}
				answer={answer.text.trim()}
				percentage={answer.voters || 0}
				progress={progress / 100}
				isBiggest={currentBiggest === answer.voters}
				isPressed={isPressed}
				anyAnswerSelected={answerSelected}
				onAnswerPress={this.onAnswerPress}
			/>
		).toJSON();
		expect(tree).to.be.ok;
		it('Pressed answerButton should render 6 View & 2 Text & 1 Touchable Opacity components', () => {
			const wrapper = shallow(
				<AnswerButton
					key={`${answer.id}${answer.text}`}
					answerId={answer.id.trim()}
					answer={answer.text.trim()}
					percentage={answer.voters || 0}
					progress={progress / 100}
					isBiggest={currentBiggest === answer.voters}
					isPressed={isPressed}
					anyAnswerSelected={answerSelected}
					onAnswerPress={this.onAnswerPress}
				/>
			);
			expect(wrapper.find(View)).to.have.length(6);
			expect(wrapper.find(Text)).to.have.length(2);
			expect(wrapper.find(TouchableOpacity)).to.have.length(1);
		});
		it('Not pressed answerButton should render 3 View & 1 Text & 1 TouchableOpacity components', () => {
			const wrapper = shallow(
				<AnswerButton
					key={`${answer.id}${answer.text}`}
					answerId={answer.id.trim()}
					answer={answer.text.trim()}
					percentage={answer.voters || 0}
					progress={progress / 100}
					isBiggest={currentBiggest === answer.voters}
					//isPressed={isPressed}
					//anyAnswerSelected={answerSelected}
					onAnswerPress={this.onAnswerPress}
				/>
			);
			expect(wrapper.find(View)).to.have.length(3);
			expect(wrapper.find(Text)).to.have.length(1);
			expect(wrapper.find(TouchableOpacity)).to.have.length(1);
		});
		it('AnswerButton should handle button press', () => {
			const onAnswerPress = sinon.spy();
			const wrapper = shallow(
				<AnswerButton
					key={`${answer.id}${answer.text}`}
					answerId={answer.id.trim()}
					answer={answer.text.trim()}
					percentage={answer.voters || 0}
					progress={progress / 100}
					isBiggest={currentBiggest === answer.voters}
					isPressed={isPressed}
					anyAnswerSelected={answerSelected}
					onAnswerPress={this.onAnswerPress}
				/>
			);
			wrapper.simulate('press');
			expect(onAnswerPress.calledOnce).to.equal(true);
		});
	});
});
