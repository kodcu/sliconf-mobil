import React, { Component } from 'react';
import { ScrollView, View, Text ,TouchableOpacity} from 'react-native';
import {AGENDA, HOME, INFO, SPEAKERS} from "../router";


export default class Drawer extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate(HOME)} > <Text>HOME</Text> </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate(AGENDA)} > <Text>AGENDA</Text> </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate(SPEAKERS)} > <Text>SPEAKERS</Text> </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate(INFO)} > <Text>INFO</Text> </TouchableOpacity>
            </View>
        );
    }
}