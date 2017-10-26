import React, { Component } from 'react';
import {View, Text, StyleSheet,FlatList,Dimensions,ScrollView,TouchableOpacity} from 'react-native';
import {Container, Button, Footer, FooterTab, Input, Thumbnail, Content, Fab} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons'


export default class CommentItem extends Component {

    state={
        isClicked:false,
        item:this.props.item
    }

    render() {
        const info =this.state.item
        const key =this.props.key;
        return (
            <View  key={key} style={{margin:10,flexDirection:'row',marginTop:15,flex:1}}>
                <Thumbnail source={{uri:info.picture}} small style={{marginBottom:15,flex:0.1}}/>
                <View style={{marginLeft:10,flex:0.9}} >
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,color:'#000',fontWeight:'bold',marginBottom:10}}>{info.name} </Text>
                        <Text style={{fontSize:12,color:'#000',fontWeight:'bold',marginBottom:10}}> ~ </Text>
                        <Text style={{fontSize:12,color:'#414042',marginBottom:10}}>{info.time} </Text>
                    </View>
                    <Text style={{fontSize:12,color:'#414042'}}>{info.comment}</Text>
                    <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between'}}>
                        <Text>Like ?</Text>
                        <TouchableOpacity onPress={()=> {this.setState({isClicked:!this.state.isClicked});this.state.isClicked ?info.like--:info.like++}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginRight:5}}>{info.like}</Text>
                                <Icon name={this.state.isClicked ? 'ios-heart':'ios-heart-outline'} size={20} color={this.state.isClicked?"red":null}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
});
