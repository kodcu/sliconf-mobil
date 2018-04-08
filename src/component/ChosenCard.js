import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';
import If from '../component/If'
import moment from "moment";
import {connect} from "react-redux";
import Font from "../theme/Font";
import {moderateScale} from "../theme/Scale";
import Color from "../theme/Color";

const mapStateToProps = (state) => ({
    rooms: state.event.event.rooms,
    speakers: state.event.event.speakers
});

class ChosenCard extends Component {

    getColorByLevel(level) {
        let color;
        switch (level) {
            case 0:
                color = Color.green;
                break;
            case 1:
                color = Color.yellow;
                break;
            case 2:
                color = Color.red2;
                break;
            default :
                color = Color.white;
        }
        return color;
    }

    getRoomName(roomId) {
        const roomsTags = this.props.rooms;
        const room = roomsTags.find(room => room.id === roomId)
        return room.label;
        // return roomId.label;
    }

    getSpeakerName(speakerId) {
        return this.props.speakers.find(speaker => speaker.id === speakerId).name
        // return speakerId.name;
    }

    /**
     * Change talk if comes from chosen
     * @param talk
     */
    changeTalkData(talk) {
        if (talk && talk.agendaElement) {
            talk["choosenId"] = talk.id;
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

    render() {
        const item = this.changeTalkData(this.props.item);
        const buttonVisible = this.props.visibleButton
        return (

            <View style={styles.container}>
                <View style={[styles.cardLine, {borderColor: this.getColorByLevel(item.level)}]}/>
                <View style={styles.detailField}>
                    <Text style={styles.topic}>{item.topic}</Text>
                    <Text style={styles.speaker}>{this.getSpeakerName(item.speaker)}</Text>
                    <View style={styles.infoField}>
                        <Text style={styles.topic}>{moment(item.date).format("HH:mm")}</Text>
                        <Text style={styles.topic}>{moment(item.date).format("DD MMM YYYY")}</Text>
                        <Text style={styles.topic}>{this.getRoomName(item.room)}</Text>
                    </View>
                </View>
                <View style={styles.actionField}>
                    <If con={buttonVisible}>
                        <If.Then>
                            <TouchableOpacity onPress={() => this.props.onPressDeleteButton(item, false)}>
                                <View style={styles.buttonField}>
                                    <Icon name='ios-close' style={{alignSelf: 'center'}}/>
                                </View>
                            </TouchableOpacity>
                        </If.Then>
                    </If>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.white,
        borderRadius: 8,
        flexDirection: 'row',
        margin: 10,
        borderColor: Color.gray3,
        borderWidth: 1
    },
    detailField: {
        flex: 0.7,
        justifyContent: 'space-between'
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
        color: '#000000',
        margin: 5
    },
    speaker: {
        ...Font.regular,
        fontSize: moderateScale(7),
        textAlign: 'left',
        margin: 5
    },
    infoField: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionField: {
        flex: 0.3,
        marginRight: 10,
        justifyContent: 'flex-end',
        margin: 5
    },
    buttonField: {
        backgroundColor: Color.gray3,
        width: 30,
        height: 30,
        borderRadius: 100,
        alignSelf: 'flex-end'
    }

})

export default connect(mapStateToProps)(ChosenCard)