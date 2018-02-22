import React, {Component} from 'react';
import {Alert, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Card, CardItem, Container, Content, Footer, FooterTab, Input, Left, Thumbnail} from "native-base";
import Header from "../component/Header";
import Icon from 'react-native-vector-icons/Ionicons'
import If from "../component/If";
import TalkInfo from "../component/TalkInfo";
import TalkComment from "../component/TalkComment";
import TalkRate from "../component/TalkRate";
import moment from "moment";
import {connect} from 'react-redux'
import Color from "../theme/Color";
import SendQuestionModal from "../component/SendQuestionModal";
import {actionCreators as actionCreatorsTalk} from "../reducks/module/talk";

const {height, width} = Dimensions.get('window');

const mapStateToProps = (state) => ({
    loading: state.comment.loading,
    user: state.auth.user,
    error: state.comment.error,
    event: state.event.event,
    errorMessage: state.comment.errorMessage,
    voteMessage: state.talk.errorMessage,
    voteError: state.talk.error,
    voteLoading: state.talk.loading,
    userVote: state.talk.userVote,
    voteValue: state.talk.voteValue
});

export class TalkDetail extends Component {

    state = {
        tab: 'info',
        rate: false,
        commentValue: "",
        messageModal: false,
    }

    changeAskQuestionState = () => {
        this.setState({messageModal: !this.state.messageModal})
    };

    async voteTalk(voteValue) {
        const eventId = this.props.event.id;
        const sessionId = this.props.navigation.state.params[0].id;
        const userId = this.props.user.id;
        const {dispatch} = this.props;
        await dispatch(actionCreatorsTalk.voteTalk(eventId, sessionId, userId, voteValue));
        const {voteError, voteMessage} = this.props;
        if (voteError)
            Alert.alert(
                'Warning!',
                voteMessage,
                [
                    {
                        text: 'OK', onPress: () => {
                        }
                    },
                ],
                {cancelable: false}
            );
        await this.props.dispatch(actionCreatorsTalk.getVoteByUser(eventId, sessionId, userId))
    }

    componentWillMount() {
        const eventId = this.props.event.id;
        const sessionId = this.props.navigation.state.params[0].id;
        const userId = this.props.user.id;
        this.props.dispatch(actionCreatorsTalk.getVoteByUser(eventId, sessionId, userId))
    }

    render() {
        const {tab, rate} = this.state
        const {state} = this.props.navigation;
        let talk = state.params
        return (

            <Container style={styles.container}>

                <Header leftImage='chevron-left' rightText='Vote'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            moment().isAfter(moment(talk[0].date)) ?
                                this.setState({rate: true}) :
                                Alert.alert(
                                    'Warning!',
                                    'Please wait until start talk.',
                                    [
                                        {text: 'OK', onPress: () => console.log('ok')}
                                    ],
                                    {cancelable: false}
                                );
                        }}>
                    <Header.Title title="Talk Detail"/>
                </Header>
                <Content>

                    <SendQuestionModal sessionId={talk[0].id}
                                       closeModal={this.changeAskQuestionState}
                                       visible={this.state.messageModal}/>

                    <TalkRate visible={rate}
                              onPressDismiss={() => {this.setState({rate: false})}}
                              onPressSubmit={(value) => this.voteTalk(value)}
                              loading={this.props.voteLoading}
                              user={this.props.userVote}
                              voteValue={this.props.voteValue}/>

                    <If con={tab === 'info'}>
                        <If.Then>
                            <TalkInfo talk={talk}/>
                        </If.Then>

                        <If.Else>
                            <TalkComment session={talk[0].id} lite={false}/>
                        </If.Else>

                    </If>

                </Content>


                <Footer>

                    <FooterTab style={{backgroundColor: '#fff'}}>
                        <Button vertical style={{paddingRight: 30}} onPress={() => this.setState({tab: 'info'})}>
                            <Icon size={25} name={tab === 'info' ? 'ios-paper' : 'ios-paper-outline'}
                                  color={tab === 'info' ? '#29B673' : '#333'}/>
                        </Button>

                        <Button vertical style={{paddingLeft: 30}}
                                onPress={() => this.setState({tab: 'comment'})}>
                            <Icon size={25}
                                  name={tab === 'comment' ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
                                  color={tab === 'comment' ? '#29B673' : '#333'}/>
                        </Button>
                    </FooterTab>

                    <TouchableOpacity style={{
                        width: 80, height: 80, bottom: -15, right: (width / 2) - 40,
                        backgroundColor: Color.green, borderRadius: 50, position: 'absolute', justifyContent: 'center',
                        alignItems: 'center'
                    }} onPress={() => this.changeAskQuestionState()}>
                        <Icon name="md-add" size={35} color={Color.white}/>
                    </TouchableOpacity>
                </Footer>


            </Container>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
});

export default connect(mapStateToProps)(TalkDetail)