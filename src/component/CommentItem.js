import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Container, Content, Fab, Footer, FooterTab, Input, Thumbnail} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons'
import moment from "moment";
import Font from "../theme/Font";
import Color from "../theme/Color";
import {moderateScale} from "../theme/Scale";
import {connect} from "react-redux";
import {actionCreators} from '../reducks/module/comment'
import Request from "../service/Request";
import {postVote} from "../reducks/API";
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
        if (!this.state.isClicked && !this.state.isDislike) {
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
            } else{
                this.setState({isClicked: true,item:response.payload});
                this.props.changeComment(response.payload,this.props.index)
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
            } else{
                this.setState({isClicked: false,item:response.payload});
                this.props.changeComment(response.payload,this.props.index)
            }
        }
    }

    async voteRequest(commentId, userId, vote) {
        console.log(commentId+" "+ userId)
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
        if (!this.state.isClicked && !this.state.isDislike) {
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
            } else{
                this.setState({isDislike: true,item:response.payload});
                this.props.changeComment(response.payload,this.props.index)
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
            } else{
                this.setState({isDislike: false,item:response.payload});
                this.props.changeComment(response.payload,this.props.index)
            }
        }
    }

    componentWillMount() {
        const comment=this.props.item;
        if (comment.likes !== undefined && comment.likes !== null){
            if(comment.likes.find(likes => likes.userId === this.props.userAgent)!==undefined)
                this.setState({isClicked:true})
            if(comment.dislikes.find(dislikes => dislikes.userId === this.props.userAgent)!==undefined)
                this.setState({isDislike:true})
        }
    }

    render() {
        const info = this.props.item;
        const user = this.state.userAgent;

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
                        }}>{info.username}</Text>
                        <Text style={{
                            ...Font.light,
                            fontSize: moderateScale(10),
                            color: Color.darkGray2,
                            marginBottom: 5,
                            marginRight: 5
                        }}>~{moment.unix(info.time).startOf('second').fromNow()}</Text>
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
                                <Text style={{...Font.regular, fontSize: moderateScale(11), color: Color.darkGray3}}>Like
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
                                        <Icon name={this.state.isClicked ? 'ios-thumbs-up' : 'ios-thumbs-up-outline'}
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
    }
}

const styles = StyleSheet.create({
    container: {},
});

export default connect(mapStateToProps)(CommentItem)