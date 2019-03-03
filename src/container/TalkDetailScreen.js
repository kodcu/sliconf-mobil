import React, { Component } from 'react';
import { Alert, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Container, Content, Footer, FooterTab } from "native-base";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { actionCreators as actionCreatorsTalk } from "../reducks/module/talk";
import Header from "../component/Header";
import If from "../component/If";
import TalkInfo from "../component/TalkInfo";
import TalkComment from "../component/TalkComment";
import TalkRate from "../component/TalkRate";
import SendQuestionModal from "../component/SendQuestionModal";
import Color from "../theme/Color";

const { height, width } = Dimensions.get('window');

const mapStateToProps = (state) => ({
    loading: state.comment.loading,
    user: state.auth.login ? state.auth.user : state.authDevice.user,
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
        commentValue: '',
        messageModal: false,
    }

    componentWillMount() {
        const eventId = this.props.event.id;
        const sessionId = this.props.navigation.state.params.id ?
            this.props.navigation.state.params.id :
            this.props.navigation.state.params.agendaElement.id;
        const userId = this.props.user.id;
        this.props.dispatch(actionCreatorsTalk.getVoteByUser(eventId, sessionId, userId));
    }

    changeAskQuestionState = () => {
        this.setState({ messageModal: !this.state.messageModal })
    };

    async voteTalk(voteValue) {
        const eventId = this.props.event.id;
        const sessionId = this.props.navigation.state.params.id;
        const userId = this.props.user.id;
        const { dispatch } = this.props;
        await dispatch(actionCreatorsTalk.voteTalk(eventId, sessionId, userId, voteValue));
        const { voteError, voteMessage } = this.props;
        if (voteError)
            Alert.alert(
                'Warning!',
                voteMessage,
                [
                    {
                        text: 'OK'
                    },
                ],
                { cancelable: false }
            );
        await this.props.dispatch(actionCreatorsTalk.getVoteByUser(eventId, sessionId, userId));
    }

    /**
     * Change talk if comes from chosen
     * @param talk
     */
    changeTalkData(talk) {
        if (talk && talk.agendaElement) {
            talk["id"] = talk.agendaElement.id;
            talk["tags"] = talk.agendaElement.tags;
            talk["room"] = talk.agendaElement.room;
            talk["speaker"] = talk.agendaElement.speaker;
            talk["level"] = talk.agendaElement.level;
            talk["detail"] = talk.agendaElement.detail;
            talk["star"] = talk.agendaElement.star;
            talk["voteCount"] = talk.agendaElement.voteCount;
            talk["duration"] = talk.agendaElement.duration;
            talk["date"] = talk.agendaElement.date;
            talk["topic"] = talk.agendaElement.topic;
        }

        return talk;
    }

    voteController(date) {
        if (moment().isAfter(moment(date))) {
            this.setState({ rate: true });			
		} else {
			Alert.alert(
				'Warning!',
				'Please wait until talk starts.',
				[
					{ text: 'OK' }
				],
				{ cancelable: false }
			);
		}
    }

    render() {
        const { tab, rate } = this.state;
        const { state } = this.props.navigation;
        const talk = this.changeTalkData(state.params);
        return (
            <Container style={styles.container}>
                <Header 
                    leftImage='chevron-left' rightText='Vote'
                    onPressLeft={() => this.props.navigation.goBack()}
                    onPressRight={() => this.voteController(talk.date)}
                >
                    <Header.Title title="Talk Detail" />
                </Header>
                <Content>
                    <SendQuestionModal
                        sessionId={talk.id}
                        closeModal={this.changeAskQuestionState}
                        visible={this.state.messageModal}
                    />
                    <TalkRate 
                        visible={rate}
                        onPressDismiss={() => this.setState({ rate: false })}
                        onPressSubmit={(value) => this.voteTalk(value)}
                        loading={this.props.voteLoading}
                        user={this.props.userVote}
                        voteValue={this.props.voteValue} 
                    />
                    <If con={tab === 'info'}>
                        <If.Then>
                            <TalkInfo talk={talk} />
                        </If.Then>
                        <If.Else>
                            <TalkComment session={talk.id} lite={false} />
                        </If.Else>
                    </If>
                </Content>
                <Footer>
                    <FooterTab style={{ backgroundColor: '#fff' }}>
                        <Button vertical style={{ paddingRight: 30 }} onPress={() => this.setState({ tab: 'info' })}>
                            <Icon size={25} name={tab === 'info' ? 'ios-paper' : 'ios-paper-outline'}
                                color={tab === 'info' ? '#29B673' : '#333'} />
                        </Button>
                        <Button vertical style={{ paddingLeft: 30 }}
                            onPress={() => this.setState({ tab: 'comment' })}>
                            <Icon size={25}
                                name={tab === 'comment' ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
                                color={tab === 'comment' ? '#29B673' : '#333'} />
                        </Button>
                    </FooterTab>
                    <TouchableOpacity
                        style={styles.askQuestionCircle}
                        onPress={() => moment().isBefore(
                            moment(talk.date).add(talk.duration, 'minutes').add(60, 'minutes')
                        ) ?
                            this.changeAskQuestionState() :
                            Alert.alert(
                                'Warning!',
                                'This session has ended.',
                                [
                                    { text: 'OK' },
                                ],
                                { cancelable: false }
                            )
                        }
                    >
                        <Icon name="md-add" size={35} color={Color.white} />
                    </TouchableOpacity>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    askQuestionCircle: {
        width: 80,
        height: 80,
        bottom: -15,
        right: (width / 2) - 40,
        backgroundColor: Color.green,
        borderRadius: 50,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default connect(mapStateToProps)(TalkDetail);
