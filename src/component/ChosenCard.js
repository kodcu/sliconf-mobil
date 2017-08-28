import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity,Image,Dimensions,Platform } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Content,CardItem,Thumbnail,Card,List,Item,Footer,FooterTab,Picker, Form, Item as FormItem} from 'native-base';
import PropTypes from 'prop-types';


export default class ChosenCard extends Component {



    getColorByLevel(level){
        switch(level){
            case 1:
                return '#29B673';
                break;
            case 2:
                return '#FBB041';
                break;
            case 3:
                return '#EE5E5F';
                break;
            default :
                return '#ffffff';
        }
    }



    render() {
        const item =this.props.item;
        return(
            <View  style={styles.container}>
                <View  style={[styles.cardLine,{borderColor:this.getColorByLevel(item.level)}]}/>
                <View style={styles.detailField}>
                    <Text style={styles.topic}>{item.topic}</Text>
                    <Text style={styles.speaker}>{item.speaker}</Text>
                    <View style={styles.infoField}>
                        <Text style={styles.topic}>{item.time}</Text>
                        <Text style={styles.topic}>{item.date}</Text>
                        <Text style={styles.topic}>{item.room}</Text>
                    </View>
                </View>
                <View style={styles.actionField}>
                    <TouchableOpacity >
                        <View style={styles.buttonField}>
                            <Icon name='ios-checkmark' style={{alignSelf:'center'}}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        borderRadius:15,
        flexDirection:'row',
        margin:5,
        borderColor:'#F1F2F2',
        borderWidth:1
    },
    detailField:{
        flex:0.7,
        justifyContent:'space-between'
    },
    cardLine:{
        borderWidth:1,
        margin:10
    },
    topic: {
        fontSize:10,textAlign:'left',textAlignVertical:'center',color:'#000000',margin:5
    },
    speaker:{
        fontSize:8,
        textAlign:'left',
        margin:5
    },
    infoField:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    actionField:{
        flex:0.3,
        marginRight:10,
        justifyContent:'flex-end',
        margin:5
    },
    buttonField:{
        backgroundColor:'#F1F2F2',
        width:30,
        height:30,
        borderRadius:100,
        alignSelf:'flex-end'
    }

})