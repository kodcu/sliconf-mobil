import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default class AlphabeticView extends Component {
	state = {
		isClicked: false
	}

	whichLetter(item) {
		this.props.onClick(item);
	}

	render() {
		const item = this.props.item;
		return (
			<TouchableOpacity onPress={() => this.whichLetter(item)}>
				<Text style={{ fontSize: this.state.isClicked ? 15 : 13 }} >{item}</Text>
			</TouchableOpacity>
		);
	}
}
