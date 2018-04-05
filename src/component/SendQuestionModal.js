import React, {Component} from 'react';
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform} from 'react-native';
import * as Scale from "../theme/Scale";
import {moderateScale} from "../theme/Scale";
import Color from "../theme/Color";
import Font from "../theme/Font";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {actionCreators} from "../reducks/module/comment";
import {connect} from "react-redux";
import moment from "moment/moment";
import Icon from 'react-native-vector-icons/Ionicons'
import ButtonComponent from "react-native-button-component"

const mapStateToProps = (state) => ({
    event: state.event.event,
    loading: state.comment.loading,
    user: state.auth.login ? state.auth.user : state.authDevice.user,
    userDevice: state.authDevice.user,
    login: state.auth.login ? state.auth.login : state.authDevice.login,
    error: state.comment.error,
    errorMessage: state.comment.errorMessage
});

export class SendQuestionModal extends Component {

    state = {
        commentValue: "",
        anonymousWarning: false,
        anonymous: true,
        anonymousFullName: '',
        buttonState: "request",
        check: "",
        error: ""
    };

    async sendComment() {
        //this.props.closeModal();
        this.setState({buttonState: "sending"})
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
        const time = moment().valueOf();
        const anonymous = this.state.anonymous;

        const {dispatch} = this.props;

        if (this.props.login)
            await dispatch(actionCreators.postComment(eventId, sessionId, userId, commentValue, time, anonymous));
        else
            await dispatch(actionCreators.postCommentAnonymous(eventId, sessionId, userId, commentValue, time, fullname));

        if (this.props.error)
            this.buttonTypeChange("sendError")
        else
            this.buttonTypeChange("sendSuccessful")


        this.setState({commentValue: "", anonymousFullName: ''})

    }

    /**
     * butonun hangi tipte olacagini ve belirlenen surede tekrar ilk tipe donmesini saglar
     * @param type
     */
    buttonTypeChange(type) {
        this.setState({buttonState: type});
        setTimeout(() => this.setState({buttonState: "request"}), 2500)
    }


    async componentWillMount() {
        await Icon.getImageSource('ios-checkmark-circle', 20, 'white').then((source) => this.setState({check: source.uri}));
        await Icon.getImageSource('ios-close-circle', 20, 'white').then((source) => this.setState({error: source.uri}));
    }

    render() {
        const agenda = this.props.event.agenda;
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => this.props.closeModal()}>
                <View style={{flex: 1, backgroundColor: Color.white, marginTop: Platform.OS === 'ios' ? 20 : 0}}>
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
                                borderColor: Color.green,
                                height: 150
                            }}
                        />
                        <Text style={{
                            ...Font.regular,
                            alignSelf: 'flex-end',
                            justifyContent: 'flex-end',
                            marginRight: 20,
                            color: Color.darkGray2
                        }}>{this.state.commentValue.length}/200</Text>

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
                                color: Color.darkGray3
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
                                    color: Color.darkGray3
                                }}>
                                    If you don't want to specify your identity, you have to mark this. It is mandatory
                                    for those who do not login.
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
                                height: 35
                            }}/> : null}


                        <ButtonComponent
                            buttonStyle={styles.buttonContainer}
                            backgroundColors={[Color.green,Color.green]}
                            buttonState={this.state.buttonState} // "upload" or "uploading"
                            textStyle={{...Font.semiBold,fontSize:moderateScale(15),letterSpacing:0}}
                            states={{
                                request: {
                                    onPress: () => {
                                        !this.state.commentValue.trim() ? this.buttonTypeChange("valueError") : this.sendComment()
                                    },
                                    text: 'Send Question',
                                },
                                sending: {
                                    spinner: true,
                                    text: 'Sending Message...',
                                    backgroundColors: [Color.green,Color.green]
                                },
                                sendSuccessful: {
                                    text: 'Your message has been sent',
                                    backgroundColors: [Color.green,Color.green],
                                    image: { uri: this.state.check },
                                    imageStyle: styles.imageStyle,
                                },
                                sendError: {
                                    text: 'Your message can not sent',
                                    backgroundColors: [Color.red, Color.red],
                                    image: { uri: this.state.error },
                                    imageStyle: styles.imageStyle,
                                },
                                valueError: {
                                    text: 'Please don\'t leave a comment blank',
                                    backgroundColors: [Color.yellow, Color.yellow],
                                    image: { uri: this.state.error },
                                    imageStyle: styles.imageStyle,
                                },
                            }}
                        >
                        </ButtonComponent>

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
        marginHorizontal: 20,
        height: 50,

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
    },
    imageStyle: {
        width: 20,
        height: 20,
    },
});

export default connect(mapStateToProps)(SendQuestionModal);