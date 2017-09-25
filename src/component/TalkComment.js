import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Footer, FooterTab, Icon, Input, Thumbnail} from "native-base";


export class TalkComment extends Component {
    render() {
        return (

            <View style={{flex:1, backgroundColor: '#555',padding:15}}>
                <Text>Comment</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        width: 250,
        height: 50,
        borderBottomLeftRadius: 90,
        borderTopLeftRadius: 90,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
        borderBottomWidth: 0

    },
    nana:{
        height:50,
        width:50,
        borderWidth:1,
        borderRadius:90,
        marginRight:10
    }
});

export default TalkComment;