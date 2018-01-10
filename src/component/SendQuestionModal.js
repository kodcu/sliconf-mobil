import React, {Component} from 'react';
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View,Alert} from 'react-native';
import * as Scale from "../theme/Scale";
import {moderateScale} from "../theme/Scale";
import Color from "../theme/Color";
import Font from "../theme/Font";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {actionCreators} from "../reducks/module/comment";
import {connect} from "react-redux";
import moment from "moment/moment";
import Icon from 'react-native-vector-icons/Ionicons'


const mapStateToProps = (state) => ({
    event: state.event.event,
    loading: state.comment.loading,
    user: state.auth.user,
    userDevice: state.authDevice.user,
    login: state.auth.login,
    error: state.comment.error,
    errorMessage: state.comment.errorMessage
});

export class SendQuestionModal extends Component {

    state = {
        commentValue: "",
        anonymousWarning: false,
        anonymous: true,
        anonymousFullName: ''
    };

    async sendComment() {
        this.props.closeModal();

        let userId;
        let fullname;
        if (!this.props.login) {
            userId = this.props.userDevice.id;
            const anonymousFullName = this.state.anonymousFullName;
            fullname = anonymousFullName.trim() ? anonymousFullName : null;
        } else {
            userId = this.props.user.id;
            fullname = null;
        }

        const eventId = this.props.event.id;
        const sessionId = this.props.sessionId;
        const commentValue = this.state.commentValue;
        const time = moment().unix();
        const anonymous = this.state.anonymous;

        console.log(eventId, sessionId, userId, commentValue, time)

        if (commentValue.trim()) {
            const {dispatch, loading, error, errorMessage} = this.props;

            if (this.props.login)
                await dispatch(actionCreators.postComment(eventId, sessionId, userId, commentValue, time,anonymous));
            else
                await dispatch(actionCreators.postCommentAnonymous(eventId, sessionId, userId, commentValue, time, fullname));

            if (error)
                Alert.alert(
                    'Warning!',
                    errorMessage,
                    [
                        {text: 'OK'}
                    ],
                    {cancelable: false}
                );
        } else
            Alert.alert(
                'Warning!',
                "Please don't leave a comment blank",
                [
                    {text: 'OK'}
                ],
                {cancelable: false}
            );

        this.setState({commentValue: "", anonymousFullName: ''})

    }

    render() {
        const agenda = this.props.event.agenda;
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                }}>
                <View style={{flex: 1, backgroundColor: Color.white}}>
                    <TouchableOpacity style={{padding: 5, marginLeft: 10}} onPress={() => this.props.closeModal()}>
                        <Icon name={'ios-close-circle'} size={30} color={Color.gray}/>
                    </TouchableOpacity>

                    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">

                        {agenda.filter(talk => talk.id === this.props.sessionId).map(item =>
                            <Text key={item.id} style={styles.topic}>{item.topic}</Text>)
                        }

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
                                fontSize: moderateScale(10),
                                margin: 3,
                                width: Scale.width - 80,
                                color:Color.darkGray3
                            }}>
                                After a comment is approved, it will be shown.
                            </Text>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            padding: 3,
                            marginLeft: 20,
                            marginRight: 20,
                            margin: 10,
                            paddingTop: 0,
                            paddingBottom: 0,
                            alignItems: 'center',
                        }}>

                            <TouchableOpacity onPress={() => {
                                this.props.login ? this.setState({anonymous: !this.state.anonymous}) : null
                            }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon
                                        name={this.state.anonymous ? 'md-checkmark-circle' : 'md-radio-button-off'}
                                        size={30} color={Color.green}/>
                                    <Text style={{
                                        ...Font.regular, fontSize: moderateScale(13), color: Color.darkGray3,
                                        marginLeft: 10, marginRight: 15
                                    }}>Anonymous</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => this.setState({anonymousWarning: !this.state.anonymousWarning})}>
                                <Icon name={this.state.anonymousWarning ? 'ios-close-circle' : 'ios-alert'}
                                      size={25} color={Color.gray}/>
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
                                <Icon style={{marginRight: 5}} name={'ios-alert'} size={20} color={Color.gray}/>
                                <Text style={{
                                    ...Font.light,
                                    fontSize: moderateScale(9),
                                    margin: 3,
                                    width: Scale.width - 70,
                                    color:Color.darkGray3
                                }}>
                                    Eğer kimliğinizi belirtmek istemiyorsanız bunu
                                    işaretlemenin gerekmektedir. Giriş yapmayan kişiler için mecburidir.(ingilizce olacak)
                                </Text>

                            </View> : null}

                        {!this.props.login ? <TextInput
                            multiline={false}
                            placeholder='Name (Optional)'
                            underlineColorAndroid={'transparent'}
                            textAlignVertical={'center'}
                            value={this.state.anonymousFullName}
                            maxLength={20}
                            onChangeText={(text) => this.setState({anonymousFullName: text})}
                            style={{
                                ...Font.light,
                                backgroundColor: Color.transparent,
                                color: Color.black,
                                fontSize: Scale.verticalScale(15),
                                padding: 2,
                                paddingLeft: 10,
                                marginLeft: 20,
                                marginRight: 20,
                                marginBottom: 5,
                                borderWidth: 1,
                                borderRadius: 10,
                                borderColor: Color.green,
                            }}/> : null}

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.sendComment()}>
                            <Text style={styles.buttonText}>Send Question</Text>
                        </TouchableOpacity>

                    </KeyboardAwareScrollView>

                </View>

            </Modal>
        )
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

export default connect(mapStateToProps)(SendQuestionModal);