import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import AgendaCard from '../AgendaCard';

const mockData = {
    key: 'HMBZ',
    time: '20:00',
    topic: 'A mobile-first approach to 3DSecure today',
    topicDetail: '3DSecure is an important add-on offered by many banks,'
     + 'which provides an extra layer of security for online transactions.'
     + 'Like many security measures, the most popular implementation of 3DSecure' 
     + '(i.e. enter the Xth, Yth, Zth letter of another password) obstructs users'
     + 'from their end goal of paying for something.' 
     + 'When it was time for us to implement it, we knew it had to look,' 
     + 'feel and function in the N26 way. This meant a mobile-first experience'
     + 'that fits in with the intuitive behaviour that our users expect and are' 
     + 'proud of. In this talk we will explore how 3DSecure works, including' 
     + 'why it is the most up-to-date fraud prevention method in the world today.'
     + 'We will look at how we implemented the 3DS Mastercard SecureCode protocol'
     + 'with safety and user-experience as priorities and introduce our' 
     + 'proprietary risk-model that uses machine learning to assess every'
     + 'online transaction made with N26.',
    level: 1,
    tags: ['Security'],
    room: 'Room-1',
    speaker: 'Alina Denisenko',
    star: 5,
    date: '1523736000'
};

const speaker = {
    id: 'string',
    name: 'string',
    profilePicture: ''
};

describe('<AgendaCard /> with mockData', () => {
    it('Renders correctly', () => {
        const tree = renderer.create(
            <AgendaCard item={mockData} speaker={speaker} isClicked={false} />
        ).toJSON();
        expect(tree).to.be.ok;
	});
    it('AgendaCard should render 5 View components', () => {
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
    });
});

describe('if <AgendaCard /> is empty', () => {
    it('AgendaCard should render 3 View component', () => {
        const wrapper = shallow(<AgendaCard isEmpty={true} />);
        expect(wrapper.find(View)).to.have.length(3);
    });
    it('AgendaCard should render 0 Image component', () => {
        const wrapper = shallow(<AgendaCard isEmpty={true} />);
        expect(wrapper.find(Image)).to.have.length(0);
    });
});

