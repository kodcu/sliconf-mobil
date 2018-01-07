import React, {Component} from 'react';
import {Alert, Dimensions, FlatList, StyleSheet, Text, View,ScrollView} from 'react-native';
import {Button, Container, Content, Fab, Footer, FooterTab, Input, Thumbnail} from "native-base";
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons'
import CommentItem from "./CommentItem";
import {actionCreators} from '../reducks/module/comment'
import {connect} from 'react-redux'
import If from "./If";
import AgendaCard from "./AgendaCard";

const ENTRIES = [
    {
        id: '123',
        eventId: '123456',
        sessionId: '123456',
        userId: '123456',
        time: 1512118026,
        like: 8,
        dislike: 2,
        likes: ["Anıl Coşar", "Hüseyin Akdoğan"],
        dislikes: ["Nursel Cıbır"],
        commentValue: "Tuvalet nerede ? ",
        approved: "APPROVED",
        commentType: "normal"
    }, {
        id: '1234',
        eventId: '123456',
        sessionId: '123456',
        userId: '123456',
        time: 1512118206,
        like: 7,
        dislike: 15,
        likes: ["Anıl Coşar", "Hüseyin Akdoğan"],
        dislikes: ["Nursel Cıbır"],
        commentValue: "Tuvalet nerede ? 2",
        approved: "APPROVED",
        commentType: "anonymous"
    }, {
        id: '12345',
        eventId: '123456',
        sessionId: '123456',
        userId: '123456',
        time: 1512119406,
        like: 20,
        dislike: 10,
        likes: ["Anıl Coşar", "Hüseyin Akdoğan"],
        dislikes: ["Nursel Cıbır"],
        commentValue: "Tuvalet nerede ? 3",
        approved: "APPROVED",
        commentType: "normal"
    }, {
        id: '1234567',
        eventId: '123456',
        sessionId: '123456',
        userId: '123456',
        time: 1512119706,
        like: 0,
        dislike: 0,
        likes: ["Anıl Coşar", "Hüseyin Akdoğan"],
        dislikes: ["Nursel Cıbır"],
        commentValue: "Tuvalet nerede ? 5",
        approved: "APPROVED",
        commentType: "normal"
    }, {
        id: '12345678',
        eventId: '123456',
        sessionId: '123456',
        userId: '123456',
        time: 1512119766,
        like: 2,
        dislike: 1,
        likes: ["Anıl Coşar", "Hüseyin Akdoğan"],
        dislikes: ["Nursel Cıbır"],
        commentValue: "Tuvalet nerede ? 6",
        approved: "APPROVED",
        commentType: "normal"
    },

];
const POPULARENTRIES = [
    {
        id: '123456',
        eventId: '123456',
        sessionId: '123456',
        userId: '123456',
        time: 1512119706,
        like: 20,
        dislike: 1,
        likes: ["Anıl Coşar", "Hüseyin Akdoğan"],
        dislikes: ["Nursel Cıbır"],
        commentValue: "Tuvalet nerede ? 4",
        approved: "APPROVED",
        commentType: "normal"
    },{
        id: '1234567',
        eventId: '1234567',
        sessionId: '1234567',
        userId: '1234567',
        time: 1512119706,
        like: 20,
        dislike: 1,
        likes: ["Anıl Coşar", "Hüseyin Akdoğan"],
        dislikes: ["Nursel Cıbır"],
        commentValue: "Tuvalet nerede ? 1",
        approved: "APPROVED",
        commentType: "normal"
    }
];

const mapStateToProps = (state) => ({
    loading: state.comment.loading,
    user: state.auth.user,
    error: state.comment.error,
    event: state.event.event,
    errorMessage: state.comment.errorMessage,
    commentList: state.comment.commentList
});

class TalkComment extends Component {

    _keyExtractor = (item, index) => index;

    renderRow(info) {
        console.log(info)
        return <CommentItem item={info} userAgent={this.props.user.id} key={info.id}/>
    }

    _renderItem ({item, index}) {
        return (
            <View style={styles.card} key={index}>
                <Thumbnail source={require('../../images/hi.png')} small style={{marginBottom: 15}}/>
                <Text style={{fontSize: 12, color: '#000'}}>{item.userId}</Text>
                <Text style={{fontSize: 10, color: '#BCBEC0', textAlign: 'center', margin: 2}}>{item.commentValue}</Text>
            </View>
        );
    }

    async getComments() {
        const comment = {
            eventId: this.props.event.id,
            sessionId: this.props.session,
            userId: this.props.user.id,
        };
        const {dispatch, error, errorMessage} = this.props;
        await dispatch(actionCreators.getCommentsSession(comment.eventId, comment.sessionId));
        if (error)
            Alert.alert(
                'Warning!',
                errorMessage,
                [
                    {text: 'OK'}
                ],
                {cancelable: false}
            );
    }

    componentWillMount() {
        this.getComments()
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getComments(), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let comments = [];
        if (this.props.commentList !== undefined && this.props.commentList !== null && !this.props.commentList.isEmpty)
            comments = this.props.commentList;
        return (
            <View style={{flex: 1}}>
                <If con={!this.props.lite}>
                    <View style={{alignSelf: 'center', marginBottom: 10, height: 220}}>
                        <AgendaCard isEmpty={true}/>
                        <Text style={{textAlign:'center',fontSize:24,fontWeight:'bold'}}>Yapım Aşamasında</Text>
                    </View>
                </If>


                <View style={{height: this.props.lite ? null : height - 368}}>
                    <ScrollView>
                    {Object.values(comments).map((item, index) =>
                        <View key={index}>
                            {this.renderRow(item)}
                        </View>
                    )}
                    </ScrollView>

                </View>

                <If con={!this.props.lite}>
                    <Fab
                        active={true}
                        direction="left"
                        containerStyle={{}}
                        style={{backgroundColor: '#29B673'}}
                        position="bottomRight"
                        onPress={this.props.question}>
                        <Icon name="ios-text"/>
                    </Fab>
                </If>

            </View>

        )
    }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1,
        paddingTop: 50
    },
    scrollviewContentContainer: {
        paddingBottom: 50
    },
    exampleContainer: {
        marginBottom: 30
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 25,
    },
    sliderContentContainer: {},
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
    card: {
        width: (width / 2) - 20,
        height: 190,
        marginLeft: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#F1F2F2',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default connect(mapStateToProps)(TalkComment);