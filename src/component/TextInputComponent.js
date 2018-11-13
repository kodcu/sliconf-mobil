import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { Input, Item } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import Color from "../theme/Color";
import * as Scale from "../theme/Scale";
import Font from "../theme/Font";

export default class TextInputComponent extends Component {
	static propTypes = {
		message: PropTypes.string,
	}

	state = {
		isThereError: false,
		message: "Hello"
	}

	isThereError(bool, message) {
		this.setState({ isThereError: bool, message: message })
	}

	render() {
		return (
			<Item
				style={{
					flexDirection: 'column',
					borderBottomColor: Color.transparent
				}}
			>
				<Item rounded style={{ borderRadius: 10, borderColor: this.state.isThereError ? Color.red : Color.green }}>
					{this.props.secure ?
						<Input
							placeholder={this.props.placeholder}
							placeholderTextColor={Color.darkGray3}
							returnKeyType={this.props.returnKeyType}
							onChangeText={this.props.onChangeText}
							style={this.props.style}
							secureTextEntry
						/>
						:
						<Input
							placeholder={this.props.placeholder}
							placeholderTextColor={Color.darkGray3}
							returnKeyType={this.props.returnKeyType}
							onChangeText={this.props.onChangeText}
							style={this.props.style}
						/>}
					{this.state.isThereError ?
						<Icon name={'error'} size={25} style={{ marginRight: 10 }} color={Color.red} /> :
						<Icon />}
				</Item>
				{this.state.isThereError ?
					<Text style={styles.errorText}>{this.state.message}</Text> :
					<Text />}
			</Item>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get('window').width - 450,
		padding: 10
	},
	input: {
		...Font.light,
		backgroundColor: Color.transparent,
		color: Color.green,
		fontSize: Scale.verticalScale(18),
		padding: 5
	},
	errorText: {
		...Font.regular,
		marginRight: 10,
		color: Color.red2,
		alignSelf: 'flex-end'
	},
	ItemStyle: {
		borderRadius: 10,
		marginBottom: 1,
	}
});
