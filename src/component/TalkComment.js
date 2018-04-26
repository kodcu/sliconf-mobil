import React, {Component} from 'react';
import {Alert, Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Container, Content, Fab, Footer, FooterTab, Input, Thumbnail} from "native-base";
import CommentItem from "./CommentItem";
import {actionCreators} from '../reducks/module/comment'
import {connect} from 'react-redux'
import If from "./If";
import Carousel, {Pagination} from "react-native-snap-carousel";
import Loading from "./Loading";

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
        id: "ea81775b-cf51-4b23-b7d2-53d87903993d",
        eventId: "b9b5ada2-f2d6-42c9-83d9-f07abedb9a3f",
        sessionId: "d9f0de15-8ead-4da6-ac85-8c982c6a79dd",
        userId: "aec2cd77-9920-42da-9438-e343b84b3dad",
        time: 1515360534,
        like: 2,
        dislike: 0,
        likes: [
            {
                userId: "c14f5584-8e13-41b8-82ea-bf4e72038cba",
                username: "muslum1",
                fullname: "Guest"
            },
            {
                userId: "d1524b28-1a39-457c-b946-9ce03f1bbab2",
                username: "developer",
                fullname: "Mr Programmer"
            }
        ],
        dislikes: [
            {
                userId: "f5855313-ca45-4831-868b-a14e57060155",
                username: "anil",
                fullname: "Mr Robot"
            }
        ],
        commentValue: "vnbxvnxcbvx cbxjv xcvjxk cvxöv xchbv xch vgbxcnvgxch bvx cvh xcghvb xc vxc vjhxc vhxc vxc vhgxcv xc vxc vjkxc",
        approved: "approved",
        username: "muslum",
        fullname: "Guest",
        roomName: "dfd",
        topic: "ReactNative neden var?",
        rate: 2
    },
    {
        id: "2f0c6125-5818-4728-b384-4a0f604a80fc",
        eventId: "b9b5ada2-f2d6-42c9-83d9-f07abedb9a3f",
        sessionId: "d9f0de15-8ead-4da6-ac85-8c982c6a79dd",
        userId: "c14f5584-8e13-41b8-82ea-bf4e72038cba",
        time: 1515360494,
        like: 1,
        dislike: 0,
        likes: [
            {
                userId: "f5855313-ca45-4831-868b-a14e57060155",
                username: "anil",
                fullname: "Mr Robot"
            }
        ],
        dislikes: [],
        commentValue: "deneme123",
        approved: "approved",
        username: "muslum1",
        fullname: "Guest",
        roomName: "dfd",
        topic: "ReactNative neden var?",
        rate: 1
    }
];

const mapStateToProps = (state) => ({
    loading: state.comment.loading,
    user: state.auth.login ? state.auth.user : state.authDevice.user,
    login: state.auth.login ? state.auth.login : state.authDevice.login,
    userDevice: state.authDevice.user,
    error: state.comment.error,
    event: state.event.event,
    errorMessage: state.comment.errorMessage,
    commentList: state.comment.commentList,
    popularCommentList: state.comment.popularCommentList,
    talkHeader: {auth: state.auth, authDevice: state.authDevice},
    userLoginWithAccount: state.auth.login
});

class TalkComment extends Component {

    state = {
        activeSlide: 0,
        commentData: [],
        popularCommentData: [],
        loading:true
    }
    changeComment = (comment, index) => {
        let data = this.state.commentData;
        let popularData=this.state.popularCommentData;
        data[index] = comment;
        let obj = popularData.findIndex((popularComment) => comment.id === popularComment.id)
        if (obj !== undefined)
            popularData[obj]=comment
        this.setState({
            commentData: data,
            popularCommentData:popularData
        })


    }
    changePopularComment = (comment, index) => {
        let data = this.state.commentData;
        let popularData=this.state.popularCommentData;
        popularData[index] = comment;
        let obj = data.findIndex((recentData) => comment.id === recentData.id)
        if (obj !== undefined)
            data[obj]=comment
        this.setState({
            popularCommentData: popularData,
            commentData:data
        })
    }

    renderRow(info, index) {
        return <CommentItem item={info} userAgent={this.props.userLoginWithAccount ? this.props.user.id : this.props.userDevice.id}
                            index={index} changeComment={this.changeComment} talkHeader={this.props.talkHeader}/>
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

    async getPopularComments() {
        const comment = {
            eventId: this.props.event.id,
            sessionId: this.props.session,
            userId: this.props.user.id,
        };
        const { dispatch } = this.props;
        await dispatch(actionCreators.getPopularCommentsSession(comment.eventId, comment.sessionId));
        const { error, errorMessage } = this.props;
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
        this.getComments();
        !this.props.lite ? this.getPopularComments() : null
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.getComments();
            !this.props.lite ? this.getPopularComments() : null
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading) {
            if (!_.isEqual(this.state.commentData, nextProps.commentList)) {
                this.setState({
                    commentData: nextProps.commentList
                })
            }
            if (!_.isEqual(this.state.popularCommentData, nextProps.popularCommentList)) {
                this.setState({
                    popularCommentData: nextProps.popularCommentList
                })
            }
        }
    }

    renderPopularComments({item, index}, userId) {
        return (
            <CommentItem item={item} userAgent={userId} index={index} changeComment={this.changePopularComment}
                         popular={true}  talkHeader={this.props.talkHeader}/>
        )
    }

    render() {
        let comments = [];
        let popularComments = [];
        if (this.state.commentData !== undefined && this.state.commentData !== null && !this.state.commentData.isEmpty)
            comments = this.state.commentData;
        if (this.state.popularCommentData !== undefined && this.state.popularCommentData !== null && !this.state.popularCommentData.isEmpty)
            popularComments = this.state.popularCommentData;
        return (
            <View style={{flex: 1}}>

                <If con={!this.props.lite}>

                    <View style={{alignSelf: 'center', height: 150}}>

                        <Carousel
                            data={popularComments}
                            renderItem={(item) => this.renderPopularComments(item, this.props.user.id)}
                            sliderWidth={(width) - 20}
                            itemWidth={(width) - 20}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}
                            enableMomentum={true}
                            activeSlideAlignment={'start'}
                            autoplay={true}
                            autoplayDelay={10000}
                            autoplayInterval={10000}
                            containerCustomStyle={styles.slider}
                            contentContainerCustomStyle={styles.sliderContentContainer}
                            removeClippedSubviews={false}
                            onSnapToItem={(index) => this.setState({activeSlide: index})}/>

                        <Pagination
                            dotsLength={popularComments.length}
                            activeDotIndex={this.state.activeSlide}
                            containerStyle={{
                                width: width - 40,
                                position: 'absolute',
                                bottom: -23,
                                backgroundColor: 'rgba(0, 0, 0, 0)'
                            }}
                            dotStyle={{
                                width: 6,
                                height: 6,
                                borderRadius: 5,
                                backgroundColor: '#fff'
                            }}
                            inactiveDotStyle={{
                                backgroundColor: '#fff'
                            }}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />

                    </View>
                </If>


                <View style={{paddingTop: 5, height: this.props.lite ? null : height - 290}}>
                    <ScrollView>
                        {Object.values(comments).map((item, index) =>
                            <View key={index}>
                                {this.renderRow(item, index)}
                            </View>
                        )}
                    </ScrollView>

                </View>
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
        marginTop: 0,
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