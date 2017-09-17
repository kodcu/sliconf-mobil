import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity,Image,Dimensions,Platform } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Content,CardItem,Thumbnail,Card,List,Item,Footer,FooterTab,Picker, Form, Item as FormItem} from 'native-base';
import PropTypes from 'prop-types';


export default class AgendaCard extends Component {

    state={
        isExist:true,
        isClicked:this.props.isClicked
    }

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
    setButtonIcon(){
        this.setState(
            {
                isClicked:!this.state.isClicked
            }
        )
    }
    handleClick(obj){
        this.setButtonIcon();
        let tempObject=obj;
        if(this.isSameData(obj)){
            this.props.onPressDeleteButton(tempObject);
        }else{
            this.props.onPressAddButton(tempObject);
        }

    }

    isSameData(data){
        let choosedOne=this.props.choosedEvents;
        let obj = choosedOne.find((data2)=>data===data2)
        if(obj!== undefined)
            return true
        return false
    }
    render() {
        const item =this.props.item;
        if(this.props.isEmpty){
            return(
                <View  style={styles.container}>

                    <Image source={require('../../images/emptyCard.png')} style={{width:200,height:100}}/>
                </View>
            )
        }else{
            return (
                <View  style={styles.container}>
                    <View  style={[styles.cardLine,{borderColor:this.getColorByLevel(item.level)}]}/>
                    <View style={styles.detailField}>
                        <Text style={styles.topic}>{item.topic} </Text>
                        <Text style={styles.speaker}>{item.speaker}</Text>
                    </View>
                    <View style={styles.actionField}>
                        <Thumbnail source={require('../../images/hi.png')}   />
                        <TouchableOpacity
                            onPress={() => this.handleClick(item)} >
                            <View style={styles.buttonField}>
                                <Icon name={this.state.isClicked? 'ios-checkmark':'ios-add'}
                                      style={{alignSelf:'center'}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width:200,
        height:100,
        margin:5,
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:15,
        borderColor:'#F1F2F2',
    },
    cardLineEmpty:{
        borderColor:'#000',
        borderWidth:1,
        margin:10
    },
    cardLine:{
        borderWidth:1,
        margin:10,
        marginTop:0,
        marginBottom:0
    },
    topic: {
        fontSize:10,
        textAlign:'left',
        textAlignVertical:'center',
        color:'#000000',
        margin:5
    },
    speaker:{
        fontSize:8,
        textAlign:'left',
        margin:5
    },
    detailField:{
        flex:0.7,
        justifyContent:'space-between'
    },
    actionField:{
        flex:0.3,
        marginRight:10,
        justifyContent:'space-around'
    },
    buttonField:{
        backgroundColor:'#F1F2F2',
        width:30,
        height:30,
        borderRadius:100,
        alignSelf:'flex-end'
    }

})