import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Thumbnail } from 'native-base';

import { EmptyCardIcon } from './Selectables';
import Color from "../theme/Color";
import { moderateScale } from "../theme/Scale";
import Font from "../theme/Font";
import getImage from "../helpers/getImageHelper"


export default class AgendaCard extends Component {

    /**
     * Konusmanin leveline gore renk dondurur.
     * @param level
     * @returns {*}
     */
    getColorByLevel(level) {
        switch (level) {
            case 0:
                return '#29B673';
            case 1:
                return '#FBB041';
            case 2:
                return '#EE5E5F';
            default:
                return '#ffffff';
        }
    }

    /**
     * Cardların ustundeki butonların ne olacagini ayarlar.
     * @param obj
     */
    handleClick(obj) {
        let tempObject = obj;
        if (this.props.isClicked) {
            this.props.onPressDeleteButton(tempObject, true);
        } else {
            this.props.onPressAddButton(tempObject);
        }

    }

    render() {
        const { item, speaker, isEmpty } = this.props;
        if (isEmpty) {
            return (
                <View style={styles.container}>
                    <View style={[styles.cardLine, { borderColor: Color.darkGray }]} />
                    <View
                        style={{
                            flex: 1,
                            alignSelf: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <EmptyCardIcon
                            viewStyle={styles.viewStyle}
                            color={Color.darkGray}
                            size={32}
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                    <View style={[styles.cardLine, { borderColor: this.getColorByLevel(item.level) }]} />
                    <View style={styles.detailField}>
                        <Text style={styles.topic}>{item.topic} </Text>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.speaker}>{speaker.name}</Text>
                            {item.tags !== undefined && item.tags !== null ?
                                <Text style={styles.tags}>Tags: {item.tags.toString()}</Text> : null}
                        </View>
                    </View>
                    <View style={styles.actionField}>
                        <Thumbnail
                            source={!speaker.profilePicture.trim() ? require('../../images/hi.png') : { uri: getImage(speaker.profilePicture) }} />
                        <TouchableOpacity
                            onPress={() => this.handleClick(item)}>
                            <View style={styles.buttonField}>
                                <Icon name={this.props.isClicked ? 'ios-checkmark' : 'ios-add'}
                                    style={{ alignSelf: 'center' }} />
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