import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity,Image,Dimensions,Platform } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Content,CardItem,Thumbnail,Card,List,Item,Footer,FooterTab,Picker, Form, Item as FormItem} from 'native-base';
import PropTypes from 'prop-types';

export default class AgendaCard extends Component {

    state={
        isExist:true,
        isClicked:false
    }

    getLevelColor(level){
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
        if(this.props.isEmpty){
            return(<View  style={{backgroundColor:'#fff',width:200,height:100,borderRadius:15,flexDirection:'row',margin:5,borderColor:'#F1F2F2',borderWidth:1}}>
            <View  style={{borderColor:'#000',borderWidth:1,margin:10}}/>
            <View style={{flex:0.7,justifyContent:'space-between'}}>
                <Text style={{fontSize:10,textAlign:'left',textAlignVertical:'center',color:'#000000',margin:5}}>Bu odada etkinlik bulunamadı </Text>
                <Text style={{fontSize:8,textAlign:'left',margin:5}}>kodcu.com</Text>
            </View>
            <View style={{flex:0.3,marginRight:10,justifyContent:'space-around'}}>
                <Thumbnail source={require('../../images/hi.png')}   />
                <TouchableOpacity >
                    <View style={{backgroundColor:'#F1F2F2',width:30,height:30,borderRadius:100,alignSelf:'flex-end'}}>
                    <Icon name='ios-add' style={{alignSelf:'center'}}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>)
        }else{
            return (
                <View  style={{backgroundColor:'#fff',width:200,height:100,borderRadius:15,flexDirection:'row',margin:5,borderColor:'#F1F2F2',borderWidth:1}}>
                <View  style={{borderColor:this.getLevelColor(item.level),borderWidth:1,margin:10}}/>
                <View style={{flex:0.7,justifyContent:'space-between'}}>
                    <Text style={{fontSize:10,textAlign:'left',textAlignVertical:'center',color:'#000000',margin:5}}>{item.topic} </Text>
                    <Text style={{fontSize:8,textAlign:'left',margin:5}}>{item.name}</Text>
                </View>
                <View style={{flex:0.3,marginRight:10,justifyContent:'space-around'}}>
                    <Thumbnail source={require('../../images/hi.png')}   />
                    <TouchableOpacity >
                        <View style={{backgroundColor:'#F1F2F2',width:30,height:30,borderRadius:100,alignSelf:'flex-end'}}>
                        <Icon name={this.state.isClicked? 'ios-contract':'ios-add'} style={{alignSelf:'center'}}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            );
        }
        
    }
}