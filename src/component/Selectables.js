import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Color from '../theme/Color';

const Heart = props => {
    const {
        onHeartPress,
        heartPressed,
        color,
        size,
        smiley,
        viewStyle
	} = props;
	
    return (
        <TouchableOpacity onPress={onHeartPress}>
            <View style={viewStyle}>
                {heartPressed ?
                    <Image source={smiley} style={{ width: 50, height: 50, margin: 5 }} /> :
                    <Icon name='heart-o' color={color} size={size} />}
            </View>
        </TouchableOpacity>
    );
};

const Circle = props => {
    const {
        isPressed,
        color,
        size
    } = props;
    return (
        <Icon name={isPressed ? 'circle' : 'circle-o'} color={color} size={size} />
    );
};

const LeftRight = props => {
    const {
        onNext,
        onSubmit,
        onPrevious,
        nextDisabled,
        previousDisabled,
        viewStyle,
        buttonStyle,
        textStyle
    } = props;
    return (
        <View style={viewStyle}>
            <TouchableOpacity
                disabled={previousDisabled}
                onPress={previousDisabled ? null : onPrevious}
            >
                <View
                    style={[
                        buttonStyle,
                        {
                            backgroundColor: previousDisabled ?
                                Color.darkGray : Color.green
                        }
                    ]}
                >
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={textStyle}>Previous</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={nextDisabled ? onSubmit : onNext}>
                <View
                    style={[
                        buttonStyle, { backgroundColor: Color.green }
                    ]}
                >
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        {
                            nextDisabled ?
                                <Text style={textStyle}>Submit</Text> :
                                <Text style={textStyle}>Next</Text>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </View >
    );
};

const EmptyCardIcon = props => {
    const {
        viewStyle,
        color,
        size
    } = props;
    const subView = {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center'
    };
    return (
        <View style={viewStyle}>
            <View style={subView}>
                <Icon name='microphone-slash' color={color} size={size} />
            </View>
        </View>
    );
};

export { Heart, Circle, LeftRight, EmptyCardIcon };
