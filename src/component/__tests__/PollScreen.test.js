// import React from 'react';
// import { TouchableOpacity, View } from 'react-native';

// import { PollScreen } from '../../container/PollScreen';
// //import AnswersView from '../AnswersView';
// //import AnswerButton from '../AnswerButton';

// import { configure, shallow, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import { expect } from 'chai';
// import sinon from 'sinon';
// import renderer from 'react-test-renderer';

// configure({ adapter: new Adapter() });

// const mockSurveys = [
// 	{
// 		id: 'survey11Id',
// 		name: 'Best programming languge',
// 		userId: '5b6c42070662c173865e020e',
// 		eventId: '9z7v',
// 		time: 1534252380320,
// 		description: 'This is survey 1',
// 		questions: [
// 			{
// 				id: 'question11Id',
// 				text: 'Which programming language you use?',
// 				totalVoters: 0,
// 				options: [
// 					{
// 						id: 'option11id',
// 						text: 'Very long answer probably wont fit',
// 						voters: 32
// 					},
// 					{
// 						id: 'option22id',
// 						text: 'This is answer language C',
// 						voters: 18
// 					},
// 					{
// 						id: 'option33id',
// 						text: 'C++',
// 						voters: 20
// 					},
// 					{
// 						id: 'option44id',
// 						text: 'This answer also must not fit in green',
// 						voters: 30
// 					},
// 					{
// 						id: 'option55id',
// 						text: 'This answer is 5th answer',
// 						voters: 0
// 					}
// 				]
// 			},
// 			{
// 				id: 'question22Id',
// 				text: 'How many programming language you use?',
// 				totalVoters: 0,
// 				options: [
// 					{
// 						id: 'option11id',
// 						text: 'This answer is created to test longness',
// 						voters: 60
// 					},
// 					{
// 						id: 'option22id',
// 						text: '99999999999999999999999999999999999999999',
// 						voters: 15
// 					},
// 					{
// 						id: 'option33id',
// 						text: 'Checking if this answer will fit',
// 						voters: 10
// 					},
// 					{
// 						id: 'option44id',
// 						text: '1234512345123451234512345123451234512345',
// 						voters: 15
// 					}
// 				]
// 			},
// 			{
// 				id: 'question33Id',
// 				text: 'How many languages you know?',
// 				totalVoters: 0,
// 				options: [
// 					{
// 						id: 'option11id',
// 						text: 'This answer is created to test if aaaaa 5 a be side by side',
// 						voters: 33
// 					},
// 					{
// 						id: 'option22id',
// 						text: 'This answer is created to test if aaaaaa 6 a be side by side',
// 						voters: 55
// 					},
// 					{
// 						id: 'option33id',
// 						text: 'This answer is created to test if aaaaaaa 7 a be side by side',
// 						voters: 11
// 					},
// 					{
// 						id: 'option44id',
// 						text: 'aaaaaaaaaaaaaaaaaaaaaaaa',
// 						voters: 1
// 					}
// 				]
// 			}
// 		]
// 	},
// 	{
// 		id: 'survey22Id',
// 		name: 'What is an object?',
// 		userId: '5b6c42070662c173865e020e',
// 		eventId: '9z7v',
// 		time: 1534252380320,
// 		description: 'This is survey 2',
// 		questions: [
// 			{
// 				id: 'question11Id',
// 				text: 'Which languages object type you use the most?',
// 				totalVoters: 0,
// 				options: [
// 					{
// 						id: 'option11id',
// 						text: 'Is this real',
// 						voters: 4
// 					},
// 					{
// 						id: 'option22id',
// 						text: 'Or it is just fantasy',
// 						voters: 8
// 					},
// 					{
// 						id: 'Stuck in the land side',
// 						text: 'C++',
// 						voters: 16
// 					},
// 					{
// 						id: 'No escape from reality',
// 						text: 'C#',
// 						voters: 72
// 					}
// 				]
// 			},
// 			{
// 				id: 'question22Id',
// 				text: 'This is test question to check !*z/asd',
// 				totalVoters: 0,
// 				options: [
// 					{
// 						id: 'option11id',
// 						text: 'This answer is created to test longness',
// 						voters: 40
// 					},
// 					{
// 						id: 'option22id',
// 						text: 'This is answer C',
// 						voters: 20
// 					},
// 					{
// 						id: 'option33id',
// 						text: '999999',
// 						voters: 20
// 					},
// 					{
// 						id: 'option44id',
// 						text: '323131231122',
// 						voters: 20
// 					},
// 					{
// 						id: 'option11id',
// 						text: 'This answer is created to test longness',
// 						voters: 44
// 					}, {
// 						id: 'option11id',
// 						text: 'This answer is created to test longness',
// 						voters: 44
// 					}, {
// 						id: 'option11id',
// 						text: 'This answer is created to test longness',
// 						voters: 12
// 					},
// 				]
// 			},
// 		]
// 	}
// ];

// function setup() {
// 	const props = {
// 		surveys: Array,
// 		answered: Array,
// 		error: String,
// 		user: Object,
// 		event: Object
// 	}

// 	const enzymeWrapper = mount(<PollScreen {...props} />)

// 	return {
// 		props,
// 		enzymeWrapper
// 	}
// }


// describe('<PollScreen /> testing with mock question data', () => {
// 	const { enzymeWrapper } = setup();
// 	const currentIndex = 0;
// 	const currentQuestion = mockSurveys[0].questions[0];
// 	const currentAnswers = currentQuestion.options;
// 	const selectedAnswers = [];

// 	it('Should render corretly', () => {
// 		expect(enzymeWrapper.find('PollScreen').hasClass('PollScreen')).toBe(true);
// 	});

// 	it('PollScreen should render 4 View ' +
// 		'1 TouchableOpacity component on initialization', () => {
// 			const testView = enzymeWrapper.find('View').props();
// 			expect(testView).to.have.length(4);
// 	});
// });
