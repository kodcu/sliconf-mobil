import React, {Component} from 'react';
import {Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Container, Content, Fab, Footer, FooterTab, Input, Thumbnail} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons'
import moment from "moment";
import Font from "../theme/Font";
import Color from "../theme/Color";
import {moderateScale, width,height} from "../theme/Scale";
import {connect} from "react-redux";
import Request from "../service/Request";
import {postVote} from "../reducks/Api";

const personLogo = require('../../images/hi.png');


const mapStateToProps = (state) => ({
    loading: state.comment.loading,
    user: state.auth.user,
    error: state.comment.error,
    errorMessage: state.comment.errorMessage,
    commentVoted: state.comment.commentVoted
});

class CommentItem extends Component {

    state = {
        isClicked: false,
        isDislike: false,
        item: this.props.item,
        userAgent: this.props.userAgent
    }

    clickLike = async () => {
        if (!this.state.isClicked ) {
            const response = await this.voteRequest(this.props.item.id, this.state.userAgent, 1)
            if (!response.status) {
                Alert.alert(
                    'Warning!',
                    response.payload,
                    [
                        {text: 'OK'}
                    ],
                    {cancelable: false}
                );
            } else {
                this.setState({isClicked: true,isDislike:false,item: response.payload});
                this.props.changeComment(response.payload, this.props.index)
            }
        } else if (this.state.isClicked && !this.state.isDislike) {
            const response = await this.voteRequest(this.props.item.id, this.state.userAgent, 0)
            if (!response.status) {
                Alert.alert(
                    'Warning!',
                    response.payload,
                    [
                        {text: 'OK'}
                    ],
                    {cancelable: false}
                );
            } else {
                this.setState({isClicked: false, item: response.payload});
                this.props.changeComment(response.payload, this.props.index)
            }
        }
    }

    async voteRequest(commentId, userId, vote) {
        console.log(commentId + " " + userId)
        let status, payload;
        await Request.POST(postVote + commentId + '/' + userId + '/' + vote, {}, {
            '200': (res) => {
                status = res.status
                if (res.status)
                    payload = res.returnObject
                else
                    payload = res.message
            },
            otherwise: (res) => {
                status = false
                payload = res.message

            },
            fail: (err) => {
                status = false
                payload = 'Can not be processed at this time!'
            }
        })
        return {payload, status}
    }

    clickDislike = async () => {
        if (!this.state.isDislike) {
            const response = await this.voteRequest(this.props.item.id, this.state.userAgent, -1)
            if (!response.status) {
                Alert.alert(
                    'Warning!',
                    response.payload,
                    [
                        {text: 'OK'}
                    ],
                    {cancelable: false}
                );
            } else {
                this.setState({isDislike: true,isClicked:false, item: response.payload});
                this.props.changeComment(response.payload, this.props.index)
            }
        } else if (this.state.isDislike && !this.state.isClicked) {
            const response = await this.voteRequest(this.props.item.id, this.state.userAgent, 0)
            if (!response.status) {
                Alert.alert(
                    'Warning!',
                    response.payload,
                    [
                        {text: 'OK'}
                    ],
                    {cancelable: false}
                );
            } else {
                this.setState({isDislike: false, item: response.payload});
                this.props.changeComment(response.payload, this.props.index)
            }
        }
    }

    componentWillMount() {
        const comment = this.props.item;
        if (comment.likes !== undefined && comment.likes !== null) {
            if (comment.likes.find(likes => likes.userId === this.props.userAgent) !== undefined)
                this.setState({isClicked: true})

            if (comment.dislikes.find(dislikes => dislikes.userId === this.props.userAgent) !== undefined)
                this.setState({isDislike: true})
        }
    }




    render() {
        const info = this.props.item;
        const name = info.anonymous ? info.fullname : info.username;
        const user = this.state.userAgent;
        if (!this.props.popular){
            return (
                <View key={info.id} style={{padding: 10, flexDirection: 'row', marginTop: 0, flex: 1}}>
                    <Thumbnail source={personLogo} small style={{marginBottom: 15, flex: 0.1}}/>
                    <View style={{marginLeft: 10, flex: 0.9}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{
                                ...Font.semiBold,
                                fontSize: moderateScale(11.5),
                                color: Color.black,
                                marginBottom: 5
                            }}>{name}</Text>
                            <Text style={{
                                ...Font.light,
                                fontSize: moderateScale(10),
                                color: Color.darkGray2,
                                marginBottom: 5,
                                marginRight: 5
                            }}>{moment.unix(info.time).startOf('second').fromNow()}</Text>
                        </View>
                        <Text style={{
                            ...Font.regular,
                            fontSize: moderateScale(10.5),
                            color: Color.darkGray
                        }}>{info.commentValue}</Text>
                        <View style={{flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
                            {this.state.isClicked ?
                                <Text style={{
                                    ...Font.semiBold,
                                    fontSize: moderateScale(11),
                                    color: Color.red
                                }}>Liked</Text> : this.state.isDislike ?
                                    <Text style={{
                                        ...Font.semiBold,
                                        fontSize: moderateScale(11),
                                        color: Color.darkGray2
                                    }}>Disliked</Text> :
                                    <Text
                                        style={{...Font.regular, fontSize: moderateScale(11), color: Color.darkGray3}}>Like
                                        ?</Text>}
                            <View style={{flexDirection: 'row'}}>

                                {user === info.userId ? null :
                                    <TouchableOpacity style={{marginTop: 5}} onPress={this.clickDislike}>
                                        <View style={{flexDirection: 'row', marginRight: 10}}>
                                            <Icon
                                                name={this.state.isDislike ? 'ios-thumbs-down' : 'ios-thumbs-down-outline'}
                                                size={25}
                                                color={this.state.isDislike && !this.state.isClicked ? Color.darkGray2 : null}/>
                                        </View>
                                    </TouchableOpacity>
                                }

                                <Text style={{...Font.light,}}>{info.like - info.dislike}</Text>

                                {user === info.userId ? null :
                                    <TouchableOpacity onPress={this.clickLike}>
                                        <View style={{flexDirection: 'row', marginLeft: 10}}>
                                            <Icon
                                                name={this.state.isClicked ? 'ios-thumbs-up' : 'ios-thumbs-up-outline'}
                                                size={25}
                                                color={this.state.isClicked && !this.state.isDislike ? Color.red : null}/>
                                        </View>
                                    </TouchableOpacity>
                                }

                            </View>
                        </View>
                    </View>
                </View>
            );
        } else{
            return (<View style={{
                alignSelf: 'center',
                alignItems: 'center',
                marginRight: 5,
                marginLeft:5,
                width: width - 30,
                height: 150,
                backgroundColor: Color.green,
                borderRadius: 20,
                elevation: 3,

            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: moderateScale(9 * name.length),
                    height: 25,
                    marginTop: 0,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor:Color.white,
                }}>
                    <Text style={{
                        ...Font.medium,
                        padding: 5,
                        backgroundColor: Color.transparent,
                        margin: 1,
                        fontSize: moderateScale(10),
                        color: Color.darkGray,
                        height: 25,
                        textAlign: 'center',
                        borderBottomLeftRadius: 70,
                        borderBottomRightRadius: 70,
                    }}>
                        {name}
                    </Text>
                </View>
                <View style={{
                    padding: 10,
                    paddingTop: 0,
                    paddingBottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 75
                }}>
                    <Text style={{
                        ...Font.medium,
                        fontSize: moderateScale(11),
                        color: Color.white,
                        textAlign: 'center',
                        alignItems: 'center',
                    }}>{info.commentValue}</Text>
                </View>

                <View style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 28,
                    width,
                    backgroundColor: Color.transparent,
                    flexDirection: 'row',

                }}>

                    {user === info.userId ? null :
                        <TouchableOpacity onPress={this.clickLike}
                            style={{
                                width: 100,
                                height: 28,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderRadius: 0,
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20,
                                borderRightWidth: 0,
                                borderColor: Color.white,
                                flexDirection: 'row',
                                backgroundColor: this.state.isClicked && !this.state.isDislike ? Color.white : Color.green
                            }}>
                            <Icon name='ios-happy' size={20}
                                  color={this.state.isClicked && !this.state.isDislike ? Color.green : Color.white}/>
                            <Text style={{
                                ...Font.semiBold,
                                color: this.state.isClicked && !this.state.isDislike ? Color.green : Color.white,
                                fontSize: moderateScale(12),
                                marginLeft: 10
                            }}>{info.like}</Text>
                        </TouchableOpacity>
                    }
                    {user === info.userId ? null :
                        <TouchableOpacity onPress={this.clickDislike}
                            style={{
                                width: 100,
                                height: 28,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderRadius: 0,
                                borderTopRightRadius: 20,
                                borderBottomRightRadius: 20,
                                borderLeftWidth: 0,
                                borderColor: Color.white,
                                flexDirection: 'row',
                                backgroundColor: this.state.isDislike && !this.state.isClicked ? Color.white : Color.green
                            }}>
                            <Icon name='ios-sad' size={20}
                                  color={this.state.isDislike && !this.state.isClicked ? Color.green : Color.white}/>
                            <Text style={{
                                ...Font.semiBold,
                                color: this.state.isDislike && !this.state.isClicked ? Color.green : Color.white,
                                fontSize: moderateScale(12),
                                marginLeft: 10
                            }}>{info.dislike}</Text>
                        </TouchableOpacity>
                    }
                </View>

            </View>);
        }

    }
}

const styles = StyleSheet.create({
    container: {},
});

export default connect(mapStateToProps)(CommentItem)