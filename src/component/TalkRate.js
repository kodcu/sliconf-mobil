import React, {Component} from 'react';
import {Image, Modal, Slider, StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import {Button, Segment} from "native-base";
import Color from "../theme/Color";
import Emoji from '../helpers/rateEmoji'
import {height, moderateScale, width} from "../theme/Scale";
import Font from "../theme/Font";
import If from "./If";

export default class TalkRate extends Component {

    state = {
        value: 3,
        smile: Emoji[2],
        message: [
            "Wretched",
            "Bad",
            "Passable",
            "Good",
            "Wonderful"
        ],
        view:false
    };

    getSmile = (index) => {
        let emoji = Emoji[index - 1];
        this.setState({smile: emoji, value: index})
      };

    change(){
        this.setState({view:!this.state.view})
    }

    render() {

        const {value, smile,view} = this.state;
        const message = this.state.message;
        const {onPressDismiss, onPressSubmit, visible, loading, user, voteValue} = this.props;
        let talkValue = 2;
        let userValue = 2;

        if(voteValue){
            const {session, vote} = voteValue;
            talkValue = session.star;
            userValue = vote.value;
        }

        return (
            <View style={styles.container}>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                    }}>
                    <View style={styles.containerModal}>
                        <View style={styles.containerView}>
                            <View style={styles.viewCenter}>

                                <If con={loading}>
                                    <If.Then>
                                        <ActivityIndicator animating={true} color={Color.darkGray3} size='large'/>
                                        <Text style={styles.indicatorText}>Loading...</Text>
                                    </If.Then>

                                    <If.Else>

                                        <If con={!user || view }>
                                            <If.Then>
                                                <View style={styles.changeView}>
                                                    <Image source={smile} style={styles.image}/>
                                                    <Text style={styles.textQuestion}>Did you like talk?</Text>
                                                    <Text style={styles.textDesc}>Use the slide to tell it in the language of
                                                        Emojis.</Text>
                                                    <Slider style={styles.slider}
                                                            maximumValue={5}
                                                            minimumValue={1}
                                                            step={1}
                                                            value={value}
                                                            maximumTrackTintColor={Color.darkGray}
                                                            minimumTrackTintColor={Color.green}
                                                            onValueChange={(val) => {this.getSmile(val)}}/>
                                                    <View style={styles.selectView}>
                                                        <Text style={styles.selectText}>I think it was</Text>
                                                        <Text style={styles.selectTextBold}>{message[value - 1]}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.buttonView}>
                                                        <Button vertical transparent
                                                            onPress={onPressDismiss}
                                                            style={styles.modalButton}>
                                                        <Text style={styles.textButton}>Close</Text>
                                                    </Button>
                                                    <Button vertical transparent
                                                        onPress={() => {user ? this.change() : null; onPressSubmit(value)}}
                                                            style={styles.modalButton}>
                                                        <Text style={styles.textButton}>Submit</Text>
                                                    </Button>
                                                </View>
                                            </If.Then>

                                            <If.Else>
                                                <View style={styles.showView}>

                                                    <View style={styles.resultView}>
                                                        <Text style={styles.textQuestion}>You</Text>
                                                        <Image source={Emoji[userValue - 1]} style={styles.image}/>
                                                        <Text style={styles.selectText}>Point: {userValue}</Text>
                                                        <Text style={styles.selectTextBold}>{message[userValue - 1]}</Text>
                                                    </View>
                                                    <View style={styles.resultView}>
                                                        <Text style={styles.textQuestion}>Total</Text>
                                                        <Image source={Emoji[talkValue.toFixed(0) - 1]} style={styles.image}/>
                                                        <Text style={styles.selectText}>Point: {talkValue.toFixed(1)}</Text>
                                                        <Text style={styles.selectTextBold}>{message[talkValue.toFixed(0) - 1]}</Text>
                                                    </View>

                                                </View>

                                                <View style={styles.buttonView}>
                                                    <Button vertical transparent
                                                            onPress={onPressDismiss}
                                                            style={styles.modalButton}>
                                                        <Text style={styles.textButton}>Close</Text>
                                                    </Button>
                                                    <Button vertical transparent
                                                            onPress={() => this.change()}
                                                            style={styles.modalButton}>
                                                        <Text style={styles.textButton}>Change</Text>
                                                    </Button>
                                                </View>
                                            </If.Else>
                                        </If>
                                    </If.Else>
                                </If>



                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
const widthModal = width - 60;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        backgroundColor: Color.transparentGray
    },
    containerView: {
        height: 350,
        width: widthModal,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        backgroundColor: Color.white,
        borderRadius: 25,
    },
    viewCenter: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    changeView: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: widthModal,
        height: 290,
        padding: 20,
    },
    showView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: widthModal,
        height: 290,
        padding: 20,
    },
    image: {
        width: 80,
        height: 80,
        margin: 10
    },
    textQuestion: {
        ...Font.medium,
        textAlign: 'center',
        fontSize: moderateScale(18),
        color: Color.darkGray,
        marginTop: 10
    },
    textDesc: {
        ...Font.regular,
        textAlign: 'center',
        fontSize: moderateScale(15),
        color: Color.darkGray4,
    },
    selectView: {
        justifyContent: 'center',
        width: widthModal * 0.75,
        flexDirection: 'row',
    },
    selectText: {
        ...Font.regular,
        fontSize: moderateScale(15),
        color: Color.darkGray,
    },
    selectTextBold: {
        ...Font.medium,
        fontSize: moderateScale(15),
        color: Color.green,
        paddingLeft: 5
    },
    modalButton: {
        width: widthModal / 2,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        ...Font.medium,
        color: Color.white,
        fontSize: moderateScale(20)
    },
    buttonView: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: widthModal,
        backgroundColor: Color.green,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        flexDirection: 'row',

    },
    slider: {
        width: widthModal * 0.75,
        paddingTop: 10,
    },
    indicatorText:{
        ...Font.medium,
        marginTop: 25,
        color: Color.darkGray3
    },
    resultView:{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center', width: widthModal / 2, height: 270
    }

});

