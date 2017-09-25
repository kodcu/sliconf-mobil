import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal, ActivityIndicator, Dimensions} from 'react-native';
import {Button, Segment} from "native-base";
import CheckBox from "react-native-check-box";


export class TalkRate extends Component {

    state = {
        eventName:'',
        data:[{name:"Java Language",checked:false},
            {name:"Server Side",checked:false},
            {name:"Big Data",checked:false},
            {name:"Mobile",checked:false},
            {name:"Modern Web",checked:false},
            {name:"Cloud,Containers &Infrastructure",checked:false}],
        searchFilter:[]
    }
    render() {

        return (
            <View style={styles.container}>
               <Text>Rate</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
    },
    containerModel: {
        justifyContent:'center',
        alignItems:'center',
    },
    modal:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#29B673',
        height:100,
        width:Dimensions.get('window').width,
    }
});

export default TalkRate;