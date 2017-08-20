import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity,Image,Dimensions,Platform } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Content,CardItem,Thumbnail,Card,List,Item,Footer,FooterTab,Picker, Form, Item as FormItem} from 'native-base';
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
        marginLeft:100,
        borderBottomWidth:1,
        borderTopWidth:1,
        borderColor:'#D1D3D4'
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
        borderWidth:1
    }

})