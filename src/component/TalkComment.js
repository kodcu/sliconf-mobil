import React, {Component} from 'react';
import {Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Container, Content, Fab, Footer, FooterTab, Input, Thumbnail} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons'
import CommentItem from "./CommentItem";
import {actionCreators} from '../reducks/module/comment'
import {connect} from 'react-redux'
import If from "./If";
import Color from "../theme/Color";
import {moderateScale} from "../theme/Scale";
import Font from "../theme/Font";
import Carousel, {Pagination} from "react-native-snap-carousel";

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
    }, {
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

    state={
        activeSlide:0
    }

    _keyExtractor = (item, index) => index;

    renderRow(info) {
        console.log(info)
        return <CommentItem item={info} userAgent={this.props.user.id} key={info.id}/>
    }

    _renderItem({item, index}) {
        return (
            <View style={styles.card} key={index}>
                <Thumbnail source={require('../../images/hi.png')} small style={{marginBottom: 15}}/>
                <Text style={{fontSize: 12, color: '#000'}}>{item.userId}</Text>
                <Text
                    style={{fontSize: 10, color: '#BCBEC0', textAlign: 'center', margin: 2}}>{item.commentValue}</Text>
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

    mymetot({item, index}){
        let message = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of money.'
        return(
            <View style={{
                alignSelf: 'center', margin:0, width: width-40, height: 150, backgroundColor: Color.green, borderRadius:20,
                elevation:3
            }}>
                <View style={{
                    alignItems:'center',
                    justifyContent:'center',
                    height:25,
                    marginTop: 0,
                    borderRadius:10
                }}>
                <Text style={{
                    ...Font.medium,
                    padding: 5,
                    backgroundColor: Color.white,
                    margin: 1,
                    fontSize: moderateScale(10),
                    width: moderateScale(7 * 21),
                    color: Color.darkGray,
                    height:25,
                    textAlign:'center',
                    borderBottomLeftRadius:10,
                    borderBottomRightRadius:10,
                }}>
                    Altuğ Bilgin Altıntaş
                </Text>
                </View>
                <View style={{
                    padding: 10,
                    paddingTop:0,
                    paddingBottom:0,
                    alignItems:'center',
                    justifyContent:'center',
                    height:75
                }}>
                    <Text style={{
                        ...Font.medium,
                        fontSize: moderateScale(11),
                        color: Color.white,
                        textAlign: 'center',
                        alignItems:'center',
                    }}>{message}</Text>
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

                    <TouchableOpacity
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
                            backgroundColor:Color.white
                        }}>
                        <Icon name='ios-happy' size={20} color={Color.green}/>
                        <Text style={{...Font.semiBold, color: Color.green, fontSize: moderateScale(12),marginLeft:10}}>123</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
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
                            flexDirection: 'row'
                        }}>
                        <Icon name='ios-sad' size={20} color={Color.white}/>
                        <Text style={{...Font.semiBold, color: '#fff', fontSize: moderateScale(12),marginLeft:10}}>5</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }

    _renderItem ({item, index}) {
        return (
            <View style={{ width:30,height:30,backgroundColor:Color.yellow}} />
        );
    }

    render() {
        let comments = [];
        if (this.props.commentList !== undefined && this.props.commentList !== null && !this.props.commentList.isEmpty)
            comments = this.props.commentList;
        return (
            <View style={{flex:1}}>
                <If con={!this.props.lite}>

                    <View style={{alignSelf: 'center',height:150}}>

                        <Carousel
                            data={POPULARENTRIES}
                            renderItem={this.mymetot}
                            sliderWidth={(width ) - 40}
                            itemWidth={(width ) - 40}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}
                            enableMomentum={true}
                            activeSlideAlignment={'start'}
                            autoplay={true}
                            autoplayDelay={2000}
                            autoplayInterval={2000}
                            containerCustomStyle={styles.slider}
                            contentContainerCustomStyle={styles.sliderContentContainer}
                            removeClippedSubviews={false}
                            onSnapToItem={(index) => this.setState({ activeSlide: index }) }/>

                        <Pagination
                            dotsLength={POPULARENTRIES.length}
                            activeDotIndex={this.state.activeSlide}
                            containerStyle={{width:width-40, position:'absolute',bottom:-23,backgroundColor: 'rgba(0, 0, 0, 0)'}}
                            dotStyle={{
                                width: 6,
                                height: 6,
                                borderRadius: 5,
                                backgroundColor: '#fff'
                            }}
                            inactiveDotStyle={{
                                backgroundColor:'#fff'
                            }}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />

                    </View>
                </If>


                <View style={{paddingTop:5,height:height-285}}>
                    <ScrollView>
                        {Object.values(comments).map((item, index) =>
                            <View key={index}>
                                {this.renderRow(item)}
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
    sliderContentContainer: {

    },
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