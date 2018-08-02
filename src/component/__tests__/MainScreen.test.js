import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MainScreen from '../../container/MainScreen';
import AnimatedInput from '../AnimatedInput';
//import renderer from 'react-test-renderer';

describe('<MainScreen /> testing', () => {
    it('renders one <KeyboardAwareScrollView /> component', () => {
        const wrapper = shallow(<MainScreen />);
        //Checks if only one KeyboardAwareScrollView has been rendered.
        expect(wrapper.find(KeyboardAwareScrollView)).to.have.length(1);
    });

    it('Renders an qrcode-scan icon', () => {
        const wrapper = shallow(<MainScreen />);
        expect(wrapper.find('qrcode-scan')).to.have.length(1);
    });

    it('Simulates click event for AnimatedInput component', () => {
        const onSubmitEditing = sinon.spy();
        const wrapper = shallow(<AnimatedInput onSubmitEditing={onSubmitEditing} />);
        wrapper.find('button').simulate('click');
        expect(onSubmitEditing).to.have.property('callCount', 1);
    });
});
