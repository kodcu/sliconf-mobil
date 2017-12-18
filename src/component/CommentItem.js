import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Container, Content, Fab, Footer, FooterTab, Input, Thumbnail} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons'
import moment from "moment";
import Font from "../theme/Font";
import Color from "../theme/Color";
import {moderateScale} from "../theme/Scale";


export default class CommentItem extends Component {

    state = {
        isClicked: false,
        isDislike: false,
        item: this.props.item,
        userAgent: this.props.userAgent
    }


    render() {
        const info = this.state.item;
        const user = this.state.userAgent;
        return (
            <View key={info.id} style={{padding: 10, flexDirection: 'row', marginTop: 0, flex: 1}}>
                <Thumbnail source={require('../../images/person.png')} small style={{marginBottom: 15, flex: 0.1}}/>
                <View style={{marginLeft: 10, flex: 0.9}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{
                            ...Font.semiBold,
                            fontSize: moderateScale(11.5),
                            color: Color.black,
                            marginBottom: 5
                        }}>{info.userId}</Text>
                        <Text style={{
                            ...Font.light,
                            fontSize: moderateScale(10),
                            color: Color.darkGray2,
                            marginBottom: 5,
                            marginRight: 5
                        }}>~{moment.unix(info.time).startOf('second').fromNow()}</Text>
                    </View>
                    <Text style={{...Font.regular,fontSize: moderateScale(10.5), color: Color.darkGray}}>{info.commentValue}</Text>
                    <View style={{flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
                        {this.state.isClicked ?
                            <Text style={{...Font.semiBold, fontSize:moderateScale(11), color: Color.red}}>Liked</Text> : this.state.isDislike ?
                                <Text style={{...Font.semiBold, fontSize:moderateScale(11), color: Color.darkGray2}}>Disliked</Text> :
                                <Text style={{...Font.regular, fontSize:moderateScale(11), color: Color.darkGray3}}>Like ?</Text>}
                        <View style={{flexDirection: 'row'}}>

                            {user === info.userId ? null :
                                <TouchableOpacity style={{marginTop: 5}} onPress={() => {
                                    this.setState({isDislike: !this.state.isDislike});
                                    this.state.isDislike ? info.like++ : info.like--
                                }}>
                                    <View style={{flexDirection: 'row', marginRight: 10}}>
                                        <Icon
                                            name={this.state.isDislike ? 'ios-thumbs-down' : 'ios-thumbs-down-outline'}
                                            size={25} color={this.state.isDislike ? "gray" : null}/>
                                    </View>
                                </TouchableOpacity>
                            }

                            <Text style={{...Font.light,}}>{info.like - info.dislike}</Text>

                            {user === info.userId ? null :
                                <TouchableOpacity onPress={() => {
                                    this.setState({isClicked: !this.state.isClicked});
                                    this.state.isClicked ? info.like-- : info.like++
                                }}>
                                    <View style={{flexDirection: 'row', marginLeft: 10}}>
                                        <Icon name={this.state.isClicked ? 'ios-thumbs-up' : 'ios-thumbs-up-outline'}
                                              size={25} color={this.state.isClicked ? "red" : null}/>
                                    </View>
                                </TouchableOpacity>
                            }

                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
});
