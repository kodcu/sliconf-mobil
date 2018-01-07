import React, {Component} from 'react';
import {Alert, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import Header from "../component/Header";
import Color from "../theme/Color";
import TalkComment from "../component/TalkComment";
import {Input, Picker} from "native-base";
import * as Scale from "../theme/Scale";
import {moderateScale} from "../theme/Scale";
import Font from "../theme/Font";
import moment from "moment/moment";
import {actionCreators} from "../reducks/module/comment";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Icon from 'react-native-vector-icons/Ionicons'

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
        commentValue: "",
        messageModal: false,
        anonymousWarning: false,
        anonymous:true
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
        console.log(comment)
        if (comment.sessionId.trim() && comment.commentValue.trim()) {
            const {dispatch, loading, error, errorMessage} = this.props;
            await dispatch(actionCreators.postComment(comment.eventId, comment.sessionId,
                comment.userId, comment.commentValue, comment.time));
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
                /*Alert.alert(
                    'Info!',
                    "Your comment has been sent.After a comment is approved,it will be shown",
                    [
                        {text: 'OK'}
                    ],
                    {cancelable: true}
                );*/
            }
        } else
            Alert.alert(
                'Warning!',
                "Please select a sessionId and don't leave a comment blank",
                [
                    {text: 'OK'}
                ],
                {cancelable: false}
            );


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

                <Picker style={{width: Scale.width - 20, alignSelf: 'center'}}
                        placeholder={"Select a Session"}
                        selectedValue={this.state.sessionId}
                        onValueChange={(itemValue, itemIndex) => this.changeSession(itemValue)}>
                    {Platform.OS === 'android' ?
                        <Picker.Item key={-1} label={'Select a Session'} value={""}/> : null}
                    {agenda.filter(talk => talk.level !== -1).map((item, i) =>
                        <Picker.Item key={i + 1} label={item.topic} value={item.id}/>
                    )}
                </Picker>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => !this.state.sessionId.trim() ? Alert.alert(
                    'Warning!',
                    "Please select a Session",
                    [
                        {text: 'OK'}
                    ],
                    {cancelable: false}
                ) : this.setState({messageModal: true})}>
                    <Text style={styles.buttonText}>Send Question</Text>
                </TouchableOpacity>

                <View style={{flex: 1, marginTop: 20}}>
                    {this.state.sessionId.trim() ? <TalkComment session={this.state.sessionId} lite={true}/> : null}
                </View>

                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.messageModal}
                    onRequestClose={() => {
                    }}>
                    <View style={{flex: 1, backgroundColor: Color.white}}>
                        <TouchableOpacity style={{padding: 5, marginLeft: 10}} onPress={() => {
                            this.setState({messageModal: false})
                        }}>
                            <Icon name={'ios-close-circle'} size={30} color={Color.gray}/>
                        </TouchableOpacity>

                        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">

                            {agenda.filter(talk => talk.id === this.state.sessionId).map(item =>
                                <Text style={styles.topic}>{item.topic}</Text>)}

                            <TextInput
                                numberOfLines={7}
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
                                    marginLeft: 20,
                                    marginRight: 20,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderColor: Color.green
                                }}
                            />

                            <View style={{
                                flexDirection: 'row',
                                marginLeft: 20,
                                marginRight: 20,
                                margin: 5,
                                borderWidth: 1,
                                borderRadius: 10,
                                alignItems: 'center',
                                borderColor: Color.yellow
                            }}>
                                <Icon style={{margin: 5}} name={'ios-alert'} size={20} color={Color.yellow}/>
                                <Text style={{
                                    ...Font.light,
                                    fontSize: moderateScale(9),
                                    margin: 3,
                                    width: Scale.width - 80
                                }}>
                                    Your comment has been sent. After a comment is approved, it will be shown.
                                </Text>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                padding: 3,
                                marginLeft: 20,
                                marginRight: 20,
                                margin: 5,
                                paddingTop:0,
                                paddingBottom:0,
                                alignItems: 'center',
                            }}>

                                <TouchableOpacity onPress={() => {
                                    this.props.login ? this.setState({anonymous: !this.state.anonymous}) : null
                                }}>
                                    <View style={{flexDirection: 'row',alignItems:'center'}}>
                                        <Icon
                                            name={this.state.anonymous ? 'md-checkmark-circle' : 'md-radio-button-off'}
                                            size={25} color={Color.green}/>
                                        <Text style={{
                                            ...Font.regular, fontSize: moderateScale(12), color: Color.darkGray3,
                                            marginLeft: 10, marginRight: 15
                                        }}>Anonymous</Text>
                                    </View>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    onPress={() => this.setState({anonymousWarning: !this.state.anonymousWarning})}>
                                    <Icon name={this.state.anonymousWarning ? 'ios-close-circle' : 'ios-alert'}
                                          size={20} color={Color.gray}/>
                                </TouchableOpacity>

                            </View>

                            {this.state.anonymousWarning ?
                                <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 25,
                                    marginRight: 25,
                                    margin: 5,
                                    alignItems: 'center',
                                    borderColor: Color.darkGray
                                }}>
                                    <Icon name={'ios-alert'} size={20} color={Color.gray}/>
                                    <Text style={{
                                        ...Font.light,
                                        fontSize: moderateScale(9),
                                        margin: 3,
                                        width: Scale.width - 70
                                    }}>
                                        Eğer kimliğinizi belirtmek istemiyorsanız bunu
                                        işaretlemenin gerekmektedir. Giriş yapmayan kişiler için mecburidir.
                                    </Text>

                                </View> : null}

                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.sendComment()}>
                                <Text style={styles.buttonText}>Send Question</Text>
                            </TouchableOpacity>

                        </KeyboardAwareScrollView>

                    </View>

                </Modal>

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
