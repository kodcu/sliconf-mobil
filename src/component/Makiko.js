import React from 'react';
import PropTypes from 'prop-types';
import {
    Animated,
    Easing,
    Text,
    TouchableWithoutFeedback,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

const PADDING = 16;

export default class Makiko extends BaseInput {
    static propTypes = {
        /*
         * This is the icon component you are importing from react-native-vector-icons.
         * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
         * iconClass={FontAwesomeIcon}
         */
        iconClass: PropTypes.func.isRequired,

        /*
         * Passed to react-native-vector-icons library as name prop.
         * This icon expands and covers the input.
         * So, the icon should not have any blank spaces for animation experience.
         * This is the limitation for Makiko.
         */
        iconName: PropTypes.string.isRequired,

        /*
         * Passed to react-native-vector-icons library as color prop
         */
        iconColor: PropTypes.string,

        /*
         * Use iconSize and iconWidth to make the animation work for your icon
         */
        iconSize: PropTypes.number,
        iconWidth: PropTypes.number,
    };

    static defaultProps = {
        iconColor: 'white',
        iconSize: 30,
        iconWidth: 60,
        height: 48,
        easing: Easing.bezier(0.7, 0, 0.3, 1),
        animationDuration: 300,
    };

    render() {
        const {
            iconClass,
            iconColor,
            iconName,
            iconSize,
            iconWidth,
            style: containerStyle,
            height: inputHeight,
            inputStyle,
            label,
            labelStyle,
            onSubmitEditing,
        } = this.props;
        const {
            width,
            focusedAnim,
            value,
        } = this.state;
        const AnimatedIcon = Animated.createAnimatedComponent(iconClass);

        return (
            <View
                style={[styles.container, containerStyle]}
                onLayout={this._onLayout}
            >
                <TouchableWithoutFeedback onPress={this.focus}>
                    <View
                        style={{
                            position: 'absolute',
                            height: inputHeight,
                            width,
                        }}
                    >
                        <AnimatedIcon
                            name={iconName}
                            color={iconColor}
                            style={{
                                position: 'absolute',
                                backgroundColor: 'transparent',
                                top: focusedAnim.interpolate({
                                    inputRange: [0, 0.2, 1],
                                    outputRange: [8, iconSize * -1, iconSize * -1],
                                }),
                                left: focusedAnim.interpolate({
                                    inputRange: [0, 0.2, 1],
                                    outputRange: [PADDING, -22, -22],
                                }),
                                height: focusedAnim.interpolate({
                                    inputRange: [0, 0.2, 1],
                                    outputRange: [iconSize, inputHeight * 2, inputHeight * 2],
                                }),
                                fontSize: focusedAnim.interpolate({
                                    inputRange: [0, 0.2, 1],
                                    outputRange: [iconSize, iconSize * 4, iconSize * 4],
                                }),
                            }}
                        />
                        <Text
                            style={[
                                styles.label,
                                labelStyle,
                                {left: iconWidth, color: iconColor},
                            ]}
                        >
                            {label}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        left: 0,
                        height: inputHeight,
                        width: focusedAnim.interpolate({
                            inputRange: [0, 0.2, 1],
                            outputRange: [0, 0, width-50],
                        }),
                    }}
                />



                    <TextInput
                        ref="input"
                        {...this.props}
                        style={[
                            styles.textInput,
                            inputStyle,
                            {
                                width:width-50,
                                height: inputHeight,
                            },
                        ]}
                        returnKeyType="search"
                        onSubmitEditing={() => onSubmitEditing(value)}
                        value={value}
                        onBlur={this._onBlur}
                        onChange={this._onChange}
                        onFocus={this._onFocus}
                        underlineColorAndroid={'transparent'}
                    />

                <AnimatedIcon
                    name={iconName}
                    color={iconColor}
                    onPress={() => onSubmitEditing(value)}
                    style={{
                        position: 'absolute',
                        backgroundColor: 'transparent',
                        top: focusedAnim.interpolate({
                            inputRange: [0, 0.2, 1],
                            outputRange: [0, 8, 8],
                        }),
                        right: focusedAnim.interpolate({
                            inputRange: [0, 0.2, 1],
                            outputRange: [0, PADDING, PADDING-5],
                        }),
                        height: focusedAnim.interpolate({
                            inputRange: [0, 0.2, 1],
                            outputRange: [0, iconSize , iconSize],
                        }),
                        fontSize: focusedAnim.interpolate({
                            inputRange: [0, 0.2, 1],
                            outputRange: [0, iconSize, iconSize ],
                        }),
                    }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#29B673',
        overflow: 'hidden',
        borderRadius: 5
    },
    label: {
        position: 'absolute',
        top: PADDING,
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent',
    },
    textInput: {
        paddingHorizontal: PADDING,
        paddingVertical: 0,
        fontFamily: 'Montserrat-Regular',
        color: 'black',
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#29B673',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
});