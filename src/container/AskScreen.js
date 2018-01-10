import React, {Component} from 'react';
import {Alert, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {connect} from "react-redux";
import Header from "../component/Header";
import Color from "../theme/Color";
import TalkComment from "../component/TalkComment";
import {Input,Picker } from "native-base";
import * as Scale from "../theme/Scale";
import {moderateScale} from "../theme/Scale";
import Font from "../theme/Font";
import moment from "moment/moment";
import {actionCreators} from "../reducks/module/comment";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Icon from 'react-native-vector-icons/Ionicons'
import SendQuestionModal from "../component/SendQuestionModal";

const mapStateToProps = (state) => ({
    event: state.event.event,
    loading: state.comment.loading,
    user: state.auth.user,
    userDevice: state.authDevice.user,
    login: state.auth.login,
    error: state.comment.error,
    errorMessage: state.comment.errorMessage
});

class AskScreen extends Component {

    state = {
        sessionId: "",
        messageModal: false,
    };

    changeSession(session) {
        this.setState({
            sessionId: session
        })
        console.log(session)
    }

    closeModal = () => {
        this.setState({messageModal:false})
    }



    // componentWillMount() {
    //     if (!this.props.login)
    //         Alert.alert(
    //             'Warning!',
    //             'Please log in for more information.',
    //             [
    //                 {text: 'LOGIN', onPress: () => this.props.navigation.navigate(LOGIN)},
    //                 {text: 'CANCEL', onPress: () => this.props.navigation.navigate(HOME)}
    //             ],
    //             {cancelable: false}
    //         )
    // }

    render() {
        const agenda = this.props.event.agenda;
        return (
            <View style={styles.container}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen');
                        }}>
                    <Header.Title title="Ask Question"/>
                </Header>

                <Picker style={{color:Color.black,width: Scale.width - 30, alignSelf: 'center',height:60}}
                        placeholder={"Select a Session"}
                        selectedValue={this.state.sessionId}
                        onValueChange={(itemValue, itemIndex) => this.changeSession(itemValue)}>
                    {Platform.OS === 'android' ?
                        <Picker.Item key={-1} label={'Select a Session'} value={""}/> : null}
                    {agenda.filter(talk => talk.level !== -1).map((item, i) =>
                        <Picker.Item key={i + 1} label={item.topic} value={item.id}/>
                    )}
                </Picker>

                <TouchableOpacity style={styles.buttonContainer}
                                  onPress={() => !this.state.sessionId.trim() ? Alert.alert(
                                      'Warning!',
                                      "Please select a Session",
                                      [
                                          {text: 'OK'}
                                      ],
                                      {cancelable: false}
                                  ) : this.setState({messageModal: true})}>
                    <Text style={styles.buttonText}>Send Question</Text>
                </TouchableOpacity>

                <View style={{flex: 1, marginTop: 10}}>
                    {this.state.sessionId.trim() ? <TalkComment session={this.state.sessionId} lite={true}/> : null}
                </View>

                <SendQuestionModal sessionId={this.state.sessionId}
                                   closeModal={this.closeModal}
                                   visible={this.state.messageModal}/>

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
        height: 50
    },
    buttonText: {
        ...Font.regular,
        textAlign: 'center',
        color: Color.white,
        fontSize: Scale.verticalScale(25),
    },
    topic: {
        ...Font.regular,
        textAlign: 'center',
        color: Color.green,
        fontSize: Scale.verticalScale(18),
        padding: 5,
        paddingTop: 0
    }
});

export default connect(mapStateToProps)(AskScreen)
