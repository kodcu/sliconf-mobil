import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from "sinon";
import AgendaCard from "../AgendaCard";
import renderer from 'react-test-renderer';

const mockData = {
    "key": "a102",
    "time": '9:30',
    "topic": "CI/CD of blockchain smart1 contracts using Java and eDuke",
    "topicDetail": "Blockchain is a hot topic especially the smart contract feature. Smart contracts allow to customize the rules applicable to digital assets deployed on a blockchain. On the Ethereum blockchain, Solidity is the usual programming language used to develop smart contract. With the use of eDuke, a Java framework allowing easy interactions with the Ethereum blockchain, we will show how to continuously deploy and test smart contracts and 'oracle' code using JUnit, Jenkins and Maven.",
    "level": 2,
    "tags": [
        "Java",
        "JVM",
        "Security",
    ],
    "room": "Big Saloon",
    "speaker": "Frédéric Hubin",
    "star": 4.5,
    "date": '1525510807',
};
const speaker = {
    "id": "string",
    "name": "string",
    "profilePicture": ""

};
describe('<AgendaCard />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(
            <AgendaCard item={mockData} speaker={speaker} isClicked={false}/>
        );
    });
    it('it should isClicked false', () => {
        const wrapper = shallow(<AgendaCard item={mockData} speaker={speaker} isClicked={false}/>);
        expect(wrapper.state().isClicked).to.not.equal(undefined)
    });
    it('it should render 5 View component', () => {
        const wrapper = shallow(<AgendaCard item={mockData} speaker={speaker}/>);
        expect(wrapper.find(View)).to.have.length(5);
    });

    it('it should render 3 text components', () => {
        const wrapper = shallow(<AgendaCard item={mockData} speaker={speaker}/>);
        expect(wrapper.find(Text)).to.have.length(3);
    });
    it('it should render 2 TouchableOpacity components', () => {
        const wrapper = shallow(<AgendaCard item={mockData} speaker={speaker}/>);
        expect(wrapper.find(TouchableOpacity)).to.have.length(2);
    });
    it('it should render 1 Icon components', () => {
        const wrapper = shallow(<AgendaCard item={mockData} speaker={speaker}/>);
        expect(wrapper.find(Icon)).to.have.length(1);
    });
    it("it should handle button presses", () => {
        const onPress = sinon.spy();
        const button = shallow(<AgendaCard item={mockData} speaker={speaker} onPress={onPress}/>);
        button.simulate('press');
        expect(onPress.calledOnce).to.equal(true);
    });
    it('calls getColorByLevel', () => {
        const wrapper = shallow(<AgendaCard item={mockData} speaker={speaker}/>);
        expect(wrapper.instance().getColorByLevel(2)).to.equal('#EE5E5F')
    });
});

describe('if <AgendaCard /> is empty', () => {
    it('it should render 1 View component', () => {
        const wrapper = shallow(<AgendaCard isEmpty={true}/>);
        expect(wrapper.find(View)).to.have.length(1);
    });
    it('it should render 1 Image components', () => {
        const wrapper = shallow(<AgendaCard isEmpty={true}/>);
        expect(wrapper.find(Image)).to.have.length(1);
    });
});

