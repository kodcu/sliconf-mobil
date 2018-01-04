import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
    Button, Card, CardItem, Container, Content, Footer, FooterTab, Form, Header, Icon, Item, Left, List, Picker,
    Right, Thumbnail, Title
} from 'native-base';
import Color from "../theme/Color";
import {moderateScale} from "../theme/Scale";
import Font from "../theme/Font";
import getImage from "../helpers/getImageHelper"


export default class AgendaCard extends Component {

    state = {
        isExist: true,
        isClicked: this.props.isClicked
    }

    /**
     * Konusmanin leveline gore renk dondurur.
     * @param level
     * @returns {*}
     */
    getColorByLevel(level) {
        switch (level) {
            case 0:
                return '#29B673';
                break;
            case 1:
                return '#FBB041';
                break;
            case 2:
                return '#EE5E5F';
                break;
            default :
                return '#ffffff';
        }
    }

    setButtonIcon() {
        this.setState(
            {
                isClicked: !this.state.isClicked
            }
        )
    }

    /**
     * Cardların ustundeki butonların ne olacagini ayarlar.
     * @param obj
     */
    handleClick(obj) {
        this.setButtonIcon();
        let tempObject = obj;
        if (this.isSameData(obj)) {
            this.props.onPressDeleteButton(tempObject);
        } else {
            this.props.onPressAddButton(tempObject);
        }

    }

    /**
     * Card verisi sectiklerim listesinde varsa true yoksa false dondurur.
     * @param data
     * @returns {boolean}
     */
    isSameData(data) {
        let choosedOne = this.props.choosedEvents;
        let obj = choosedOne.find((data2) => data === data2)
        if (obj !== undefined)
            return true
        return false
    }

    render() {
        const item = this.props.item;
        const speaker = this.props.speaker;
        if (this.props.isEmpty) {
            return (
                <View style={styles.container}>

                    <Image source={require('../../images/emptyCard.png')} style={{width: 220, height: 120}}/>
                </View>
            )
        } else {
            return (
                <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                    <View style={[styles.cardLine, {borderColor: this.getColorByLevel(item.level)}]}/>
                    <View style={styles.detailField}>
                        <Text style={styles.topic}>{item.topic} </Text>
                        <View style={{marginBottom: 5}}>
                            <Text style={styles.speaker}>{speaker.name}</Text>
                            {item.tags !== undefined && item.tags !== null ?
                                <Text style={styles.tags}>Tags: {item.tags.toString()}</Text> : null}
                        </View>
                    </View>
                    <View style={styles.actionField}>
                        <Thumbnail
                            source={!speaker.profilePicture.trim() ? require('../../images/hi.png') : {uri: getImage(speaker.profilePicture)}}/>
                        <TouchableOpacity
                            onPress={() => this.handleClick(item)}>
                            <View style={styles.buttonField}>
                                <Icon name={this.state.isClicked ? 'ios-checkmark' : 'ios-add'}
                                      style={{alignSelf: 'center'}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            );
        }

    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 220,
        height: 120,
        margin: 5,
        backgroundColor: '#fff',
        borderColor: Color.gray2,
        borderWidth: 0.5,
        borderRadius: 15,
    },
    cardLineEmpty: {
        borderColor: Color.gray2,
        borderWidth: 0.5,
        margin: 10
    },
    cardLine: {
        borderWidth: 1,
        margin: 10,
        marginTop: 0,
        marginBottom: 0
    },
    topic: {
        ...Font.regular,
        fontSize: moderateScale(9),
        textAlign: 'left',
        textAlignVertical: 'center',
        color: Color.black,
        margin: 5
    },
    speaker: {
        ...Font.light,
        fontSize: moderateScale(8),
        textAlign: 'left',
        color: Color.darkGray,
        margin: 5,
        marginBottom: 0
    },
    tags: {
        ...Font.light,
        fontSize: moderateScale(7),
        textAlign: 'left',
        color: Color.darkGray3,
        margin: 5,
        marginTop: 0,
        marginBottom: 0
    },
    detailField: {
        flex: 0.7,
        justifyContent: 'space-between'
    },
    actionField: {
        flex: 0.3,
        marginRight: 10,
        justifyContent: 'space-around'
    },
    buttonField: {
        backgroundColor: '#F1F2F2',
        width: 30,
        height: 30,
        borderRadius: 100,
        alignSelf: 'flex-end'
    }

})