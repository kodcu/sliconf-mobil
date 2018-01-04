import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import Header from "../component/Header";
import Color from "../theme/Color";
import TalkComment from "../component/TalkComment";
import {Picker} from "native-base";
import * as Scale from "../theme/Scale";
import Font from "../theme/Font";
import moment from "moment/moment";
import {actionCreators} from "../reducks/module/comment";
import {HOME, LOGIN} from "../router";

const mapStateToProps = (state) => ({
    event: state.event.event,
    loading: state.comment.loading,
    user: state.auth.user,
    login: state.auth.login,
    error: state.comment.error,
    errorMessage: state.comment.errorMessage
});

class AskScreen extends Component {

    state = {
        sessionId: "",
        commentValue: ""
    };

    changeSession(session) {
        this.setState({
            sessionId: session
        })
        console.log(session)
    }

    async sendComment() {
        const comment = {
            eventId: this.props.event.id,
            sessionId: this.state.sessionId,
            userId: this.props.user.id,
            commentValue: this.state.commentValue,
            time: moment().unix()
        };
        const {dispatch, loading, error, errorMessage} = this.props;
        await dispatch(actionCreators.postComment(comment.eventId, comment.sessionId, comment.userId, comment.commentValue, comment.time));
        if (error)
            Alert.alert(
                'Warning!',
                errorMessage,
                [
                    {text: 'OK'}
                ],
                {cancelable: false}
            );

        if (!error && !loading) {
            this.setState({commentValue: ""})
        }
    }

    componentWillMount() {
        if (!this.props.login)
            Alert.alert(
                'Warning!',
                'Please log in for more information.',
                [
                    {text: 'LOGIN', onPress: () => this.props.navigation.navigate(LOGIN)},
                    {text: 'CANCEL', onPress: () => this.props.navigation.navigate(HOME)}
                ],
                {cancelable: false}
            )
    }

    render() {
        const agenda = this.props.event.agenda;
        return (
            <View style={styles.container}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                    <Header.Title title="Ask Question"/>
                </Header>
                <Picker style={{width: Scale.width - 20, alignSelf: 'center'}}
                        placeholder={"Select a Session"}
                        selectedValue={this.state.sessionId}
                        onValueChange={(itemValue, itemIndex) => this.changeSession(itemValue)}>
                    <Picker.Item key={-1} label={'Select a Session Id'} value={""}/>
                    {agenda.filter(talk => talk.level !== -1).map((item, i) =>
                        <Picker.Item key={i + 1} label={item.topic} value={item.id}/>
                    )}
                </Picker>
                <View style={{
                    margin: 10
                }}
                >
                    <TextInput
                        numberOfLines={5}
                        multiline={true}
                        placeholder='Enter question...'
                        underlineColorAndroid={'transparent'}
                        textAlignVertical={'top'}
                        value={this.state.commentValue}
                        maxLength={200}
                        onChangeText={(text) => this.setState({commentValue: text})}
                        style={{
                            ...Font.light,
                            backgroundColor: Color.transparent,
                            color: Color.black,
                            fontSize: Scale.verticalScale(18),
                            padding: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: Color.green
                        }}
                    />
                </View>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.sendComment()}>
                    <Text style={styles.buttonText}>Send Question</Text>
                </TouchableOpacity>
                <View style={{flex: 1, marginTop: 20}}>
                    {this.state.sessionId.trim() ? <TalkComment session={this.state.sessionId} lite={true}/> : null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    buttonContainer: {
        backgroundColor: Color.green,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        height: 40
    },
    buttonText: {
        ...Font.regular,
        textAlign: 'center',
        color: Color.white,
        fontSize: Scale.verticalScale(20),
    }
});

export default connect(mapStateToProps)(AskScreen)
