import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class AlphabeticView extends Component {

    state={
        isClicked:false
    }

    whichLetter(item){
        this.props.onClick(item);
    }

    render() {
        const item =this.props.item;
        return(
            <TouchableOpacity onPress={()=> this.whichLetter(item)}>
                <Text style={{fontSize:this.state.isClicked ? 15:13}} >{item}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }

})