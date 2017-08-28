import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';


export default class ChosenCard extends Component {




    render() {
        const item =this.props.item;
        return(
            <View style={styles.container}>
                <View  style={styles.cardLine}>
                    <View  style={styles.line}/>
                    <View style={styles.detailField}>
                        <Text style={styles.topic}>{item.topic} </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft:30,
        borderBottomWidth:1,
        borderTopWidth:1,
        borderColor:'#D1D3D4',
        margin:5
    },
    detailField:{
        flex:0.7,
        justifyContent:'space-between'
    },
    cardLine:{
        backgroundColor:'#fff',
        borderRadius:15,
        flexDirection:'row',
        margin:5,
        borderColor:'#F1F2F2',
        borderWidth:1
    },
    topic: {
        fontSize:10,
        textAlign:'left',
        textAlignVertical:'center',
        color:'#000000',
        margin:5
    },
    line:{
        borderColor:'#A97B50',
        borderWidth:1,
        margin:5,
    }

})