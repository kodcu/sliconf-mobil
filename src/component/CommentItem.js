import React, { Component } from 'react';
import {View, Text, StyleSheet,FlatList,Dimensions,ScrollView,TouchableOpacity} from 'react-native';
import {Container, Button, Footer, FooterTab, Input, Thumbnail, Content, Fab} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons'
import moment from "moment";
import Font from "../theme/Font";
import Color from "../theme/Color";


export default class CommentItem extends Component {

    state={
        isClicked:false,
        isDislike:false,
        item:this.props.item
    }

    render() {
        const info =this.state.item
        return (
            <View  key={info.id} style={{margin:10,flexDirection:'row',marginTop:15,flex:1}}>
                <Thumbnail source={require('../../images/person.png')} small style={{marginBottom:15,flex:0.1}}/>
                <View style={{marginLeft:10,flex:0.9}} >
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,color:'#000',fontWeight:'bold',marginBottom:10}}>{info.userId} </Text>
                        <Text style={{fontSize:12,color:'#000',fontWeight:'bold',marginBottom:10}}> ~ </Text>
                        <Text style={{fontSize:12,color:'#414042',marginBottom:10}}>{moment.unix(info.time).startOf('second').fromNow()}</Text>
                    </View>
                    <Text style={{fontSize:12,color:'#414042'}}>{info.commentValue}</Text>
                    <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between'}}>
                        {this.state.isClicked ? <Text style={{...Font.semiBold,color:Color.red}}>Liked</Text> : this.state.isDislike ? <Text style={{...Font.semiBold,color:Color.darkGray2}}>Disliked</Text> :<Text style={{...Font.regular,color:Color.darkGray3}}>Like ?</Text>}
                        <View style={{flexDirection:'row'}}>

                        <TouchableOpacity style={{marginTop:5}} onPress={()=> {this.setState({isDislike:!this.state.isDislike});this.state.isDislike ?info.like++:info.like--}}>
                            <View style={{flexDirection:'row'}}>
                                <Icon name={this.state.isDislike ? 'ios-thumbs-down':'ios-thumbs-down-outline'} size={25} color={this.state.isDislike?"gray":null}/>
                            </View>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={()=> {this.setState({isClicked:!this.state.isClicked});this.state.isClicked ?info.like--:info.like++}}>
                                <View style={{flexDirection:'row',marginLeft:10}}>
                                    <Text style={{marginRight:10}}>{info.like-info.dislike}</Text>
                                    <Icon name={this.state.isClicked ? 'ios-thumbs-up':'ios-thumbs-up-outline'} size={25} color={this.state.isClicked?"red":null}/>
                                </View>
                            </TouchableOpacity>

                        </View>
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
