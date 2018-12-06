import { Animated, Easing, I18nManager } from 'react-native';

function forInitial(props) {
	const { navigation, scene } = props;

	const focused = navigation.state.index === scene.index;
	const opacity = focused ? 1 : 0;
	const translate = focused ? 0 : 1000000;
	return {
		opacity,
		transform: [{ translateX: translate }, { translateY: translate }],
	};
}

function forHorizontal(props) {
	const { layout, position, scene } = props;

	if (!layout.isMeasured) {
		return forInitial(props);
	}

	const index = scene.index;
	const inputRange = [index - 1, index, index + 1];

	const width = layout.initWidth;
	const outputRange = I18nManager.isRTL ?
		([-width, 0, width * 0.3]: Array<number>) :
		([width, 0, width * -0.3]: Array<number>);

	const opacity = position.interpolate({
		inputRange: [
			index - 1,
			index - 0.99,
			index,
			index + 0.99,
			index + 1,
		],
		outputRange: [0, 1, 1, 0.3, 0],
	});

	const translateY = 0;
	const translateX = position.interpolate({
		inputRange,
		outputRange,
	});

	return {
		opacity,
		transform: [{ translateX }, { translateY }],
	};
}

export default function animation() {
	return {
		transitionSpec: {
			duration: 500,
			easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
			timing: Animated.timing,
		},
		screenInterpolator: forHorizontal,
	};
}