import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AnswerButton from '../AnswerButton';

import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

/*(<AnswerButton
    key={`${propKey}`}
    answerId={`${answers[propKey].id}`}
    answer={`${answers[propKey].answer}`}
    isPressed={selectedAnswer === answers[propKey].id}
    anyAnswerSelected={anyAnswerSelected}
    onAnswerPress={this.onAnswerPress}
/>)*/

describe('<AnswerButton /> testing with mockData', () => {
    it('Renders correctly', () => {
        const tree = renderer.create(
            <AnswerButton answer={'Apple'} />
        ).toJSON();
        expect(tree).to.be.ok;
    });
    /*it('AgendaCard should render 5 View components', () => {
        const wrapper = shallow(<AgendaCard item={mockData} speaker={speaker} />);
        expect(wrapper.find(View)).to.have.length(5);
    });
    it('AgendaCard should render 3 text components', () => {
        const wrapper = shallow(<AgendaCard item={mockData} speaker={speaker} />);
        expect(wrapper.find(Text)).to.have.length(3);
    });
    it('AgendaCard should render 2 TouchableOpacity components', () => {
        const wrapper = shallow(<AgendaCard item={mockData} speaker={speaker} />);
        expect(wrapper.find(TouchableOpacity)).to.have.length(2);
    });
    it('AgendaCard should render 1 Icon component', () => {
        const wrapper = shallow(<AgendaCard item={mockData} speaker={speaker} />);
        expect(wrapper.find(Icon)).to.have.length(1);
    });
    it('AgendaCard should handle button press', () => {
        const onPress = sinon.spy();
        const button = shallow(<AgendaCard item={mockData} speaker={speaker} onPress={onPress} />);
        button.simulate('press');
        expect(onPress.calledOnce).to.equal(true);
    });
    it('AgendaCard difficulty level color equals to FBB041', () => {
        const wrapper = shallow(<AgendaCard item={mockData} speaker={speaker} />);
        expect(wrapper.instance().getColorByLevel(1)).to.equal('#FBB041');
    });*/
});
