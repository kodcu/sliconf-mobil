import React from 'react';
import {
    Animated,
    Easing,
    Text,
    TouchableWithoutFeedback,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

import Font from '../theme/Font';
import Color from '../theme/Color';

const PADDING = 16;

export default class AnimatedInput extends React.Component {
    static defaultProps = {
        iconColor: 'white',
        iconSize: 30,
        iconWidth: 60,
        height: 48,
        easing: Easing.bezier(0.7, 0, 0.3, 1),
        animationDuration: 300,
    };

    constructor(props, context) {
        super(props, context);

        this._onLayout = this._onLayout.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this.focus = this.focus.bind(this);

        const value = props.value || props.defaultValue;

        this.state = {
            value: '',
            focusedAnim: new Animated.Value(value ? 1 : 0),
        };
    }

    componentWillReceiveProps(newProps) {
        const newValue = newProps.value;
        if (newProps.hasOwnProperty('value') && newValue !== this.state.value) {
            this.setState({
                value: newValue,
            });

            // animate input if it's active state has changed with the new value
            // and input is not focused currently.
            const isFocused = this.refs.input.isFocused();
            if (!isFocused) {
                const isActive = Boolean(newValue);
                if (isActive !== this.isActive) {
                    this._toggle(isActive);
                }
            }
        }
    }

    _onLayout(event) {
        this.setState({
            width: event.nativeEvent.layout.width,
        });
    }

    _onChange(event) {
        this.setState({
            value: event.nativeEvent.text,
        });

        const onChange = this.props.onChange;
        if (onChange) {
            onChange(event);
        }
    }

    _onBlur(event) {
        if (!this.state.value) {
            this._toggle(false);
        }

        const onBlur = this.props.onBlur;
        if (onBlur) {
            onBlur(event);
        }
    }

    _onFocus(event) {
        this._toggle(true);

        const onFocus = this.props.onFocus;
        if (onFocus) {
            onFocus(event);
        }
    }

    _toggle(isActive) {
        const {animationDuration, easing, useNativeDriver} = this.props;
        this.isActive = isActive;
        Animated.timing(this.state.focusedAnim, {
            toValue: isActive ? 1 : 0,
            duration: animationDuration,
            easing,
            useNativeDriver,
        }).start();
    }

    inputRef() {
        return this.refs.input;
    }

    focus() {
        if (this.props.editable !== false) {
            this.inputRef().focus();
        }
    }

    blur() {
        this.inputRef().blur();
    }

    isFocused() {
        return this.inputRef().isFocused();
    }

    clear() {
        this.inputRef().clear();
    }

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
            value
        } = this.state;

        // let value;
        // const stateVal = this.state.value;
        // if(stateVal)
        //     value = stateVal.toUpperCase();
        // else
        //     value = stateVal;


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
                            outputRange: [0, 0, width - 50],
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
                            width: width - 50,
                            height: inputHeight,
                        },
                    ]}
                    returnKeyType="search"
                    onSubmitEditing={() => onSubmitEditing(value)}
                    value={value.toUpperCase()}
                    onBlur={this._onBlur}
                    onChange={this._onChange}
                    onFocus={this._onFocus}
                    underlineColorAndroid={'transparent'}
                    autoCapitalize="characters"
                    maxLength={4}
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
                            outputRange: [0, PADDING, PADDING - 5],
                        }),
                        height: focusedAnim.interpolate({
                            inputRange: [0, 0.2, 1],
                            outputRange: [0, iconSize, iconSize],
                        }),
                        fontSize: focusedAnim.interpolate({
                            inputRange: [0, 0.2, 1],
                            outputRange: [0, iconSize, iconSize],
                        }),
                    }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.green,
        overflow: 'hidden',
        borderRadius: 5
    },
    label: {
        ...Font.medium,
        position: 'absolute',
        top: PADDING-3,
        fontSize: 16,
        color: Color.white,
        backgroundColor: Color.transparent,
    },
    textInput: {
        ...Font.regular,
        paddingHorizontal: PADDING,
        paddingVertical: 0,
        color: Color.black,
        fontSize: 18,
        borderWidth: 1,
        borderColor: Color.green,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
});