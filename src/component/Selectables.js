import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Color from '../theme/Color';

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

export { EmptyCardIcon };
