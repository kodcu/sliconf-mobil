import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import AnswersView from '../AnswersView';
import AnswerButton from '../AnswerButton';

import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

const mockSurveys = [
	{
		id: 'survey11Id',
		name: 'Best programming languge',
		userId: '5b6c42070662c173865e020e',
		eventId: '9z7v',
		time: 1534252380320,
		description: 'This is survey 1',
		questions: [
			{
				id: 'question11Id',
				text: 'Which programming language you use?',
				totalVoters: 0,
				options: [
					{
						id: 'option11id',
						text: 'Very long answer probably wont fit',
						voters: 32
					},
					{
						id: 'option22id',
						text: 'This is answer language C',
						voters: 18
					},
					{
						id: 'option33id',
						text: 'C++',
						voters: 20
					},
					{
						id: 'option44id',
						text: 'This answer also must not fit in green',
						voters: 30
					},
					{
						id: 'option55id',
						text: 'This answer is 5th answer',
						voters: 0
					}
				]
			},
			{
				id: 'question22Id',
				text: 'How many programming language you use?',
				totalVoters: 0,
				options: [
					{
						id: 'option11id',
						text: 'This answer is created to test longness',
						voters: 60
					},
					{
						id: 'option22id',
						text: '99999999999999999999999999999999999999999',
						voters: 15
					},
					{
						id: 'option33id',
						text: 'Checking if this answer will fit',
						voters: 10
					},
					{
						id: 'option44id',
						text: '1234512345123451234512345123451234512345',
						voters: 15
					}
				]
			},
			{
				id: 'question33Id',
				text: 'How many languages you know?',
				totalVoters: 0,
				options: [
					{
						id: 'option11id',
						text: 'This answer is created to test if aaaaa 5 a be side by side',
						voters: 33
					},
					{
						id: 'option22id',
						text: 'This answer is created to test if aaaaaa 6 a be side by side',
						voters: 55
					},
					{
						id: 'option33id',
						text: 'This answer is created to test if aaaaaaa 7 a be side by side',
						voters: 11
					},
					{
						id: 'option44id',
						text: 'aaaaaaaaaaaaaaaaaaaaaaaa',
						voters: 1
					}
				]
			}
		]
	},
	{
		id: 'survey22Id',
		name: 'What is an object?',
		userId: '5b6c42070662c173865e020e',
		eventId: '9z7v',
		time: 1534252380320,
		description: 'This is survey 2',
		questions: [
			{
				id: 'question11Id',
				text: 'Which languages object type you use the most?',
				totalVoters: 0,
				options: [
					{
						id: 'option11id',
						text: 'Is this real',
						voters: 4
					},
					{
						id: 'option22id',
						text: 'Or it is just fantasy',
						voters: 8
					},
					{
						id: 'Stuck in the land side',
						text: 'C++',
						voters: 16
					},
					{
						id: 'No escape from reality',
						text: 'C#',
						voters: 72
					}
				]
			},
			{
				id: 'question22Id',
				text: 'This is test question to check !*z/asd',
				totalVoters: 0,
				options: [
					{
						id: 'option11id',
						text: 'This answer is created to test longness',
						voters: 40
					},
					{
						id: 'option22id',
						text: 'This is answer C',
						voters: 20
					},
					{
						id: 'option33id',
						text: '999999',
						voters: 20
					},
					{
						id: 'option44id',
						text: '323131231122',
						voters: 20
					},
					{
						id: 'option11id',
						text: 'This answer is created to test longness',
						voters: 44
					}, {
						id: 'option11id',
						text: 'This answer is created to test longness',
						voters: 44
					}, {
						id: 'option11id',
						text: 'This answer is created to test longness',
						voters: 12
					},
				]
			},
		]
	}
];

describe('<AnswersView /> testing with mock question data', () => {
	const currentIndex = 0;
	const currentQuestion = mockSurveys[0].questions[0];
	const currentAnswers = currentQuestion.options;
	const selectedAnswers = [];

	it('Renders correctly', () => {
		const tree = renderer.create(
			<AnswersView
				questionId={currentQuestion.id}
				questionName={currentQuestion.text}
				answers={currentAnswers}
				onAnswerSelect={this.onAnswerSelect}
				currentIndex={currentIndex}
				selectedAnswers={selectedAnswers}
			/>
		).toJSON();
		expect(tree).to.be.ok;
	});
	it('AnswersView should render 2 View & 1 ScrollView & 1 Text and ' +
		currentAnswers.length + ' AnswerButton components', () => {
			const wrapper = shallow(
				<AnswersView
					questionId={currentQuestion.id}
					questionName={currentQuestion.text}
					answers={currentAnswers}
					onAnswerSelect={this.onAnswerSelect}
					currentIndex={currentIndex}
					selectedAnswers={selectedAnswers}
				/>
			);
			expect(wrapper.find(View)).to.have.length(2);
			expect(wrapper.find(ScrollView)).to.have.length(1);
			expect(wrapper.find(Text)).to.have.length(1);
			expect(wrapper.find(AnswerButton)).to.have.length(currentAnswers.length);
		});
	it('AnswersView should call property function onAnswerSelect' +
		'method when any AnswerButton pressed', () => {
		const onAnswerSelect = sinon.spy();
		const wrapper = shallow(
			<AnswersView
				questionId={currentQuestion.id}
				questionName={currentQuestion.text}
				answers={currentAnswers}
				onAnswerSelect={onAnswerSelect}
				currentIndex={currentIndex}
				selectedAnswers={selectedAnswers}
			/>
		);
		const render = wrapper.dive();
		render.find(AnswerButton).forEach(button => {
			button.simulate('AnswerPress');
		});
		expect(onAnswerSelect.called).to.equal(true);
		expect(onAnswerSelect.callCount).to.equal(currentAnswers.length);
	});
});
