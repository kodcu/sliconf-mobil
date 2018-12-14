import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Platform } from 'react-native';
import { Thumbnail } from 'native-base';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import getImage from '../helpers/getImageHelper';
import { TwoLine } from './Selectables';
import Font from '../theme/Font';

const defaultLogo = require('../../images/logo.png');
const defaultSpeaker = require('../../images/hi.png');

export default class LoginScreen extends Component {
    state = {
        show: false
    }

    getEvent() {
        this.props.getEvent();
    }

    ToggleInfo = () => {
        this.setState({ show: !this.state.show });
    }

    renderSpeakers = (speakers) =>
        speakers.map(speaker => {
            const speakerName = speaker.name.split(' ')[0] ? 
                speaker.name.split(' ')[0] : 
                speaker.name;
            return (
                <View key={speaker.id} style={styles.speakerContainer}>
                    <Thumbnail
                        small
                        source={
                            speaker.profilePicture &&
                                speaker.profilePicture.trim() ?
                                { uri: getImage(speaker.profilePicture) } :
                                defaultSpeaker
                        }
                        style={{
                            borderRadius: Platform.OS === 'ios' ? 60 : 90,
                            marginBottom: 15
                        }}
                    />
                    <Text style={styles.subtitle}>{speakerName}</Text>
                </View>
            );
        });

    render() {
        const { event } = this.props;
        const { about, key, name, description, speakers, startDate, endDate, logo } = event;

        const height = this.state.show ?
            { card: Style.CARD_HEIGHT * 1.8, extra: Style.CARD_HEIGHT * 0.8, button: 0 } :
            { card: Style.CARD_HEIGHT, extra: 0, button: Style.CARD_HEIGHT * 0.65 };

        return (
            <View style={[styles.container, { height: height.card }]}>
                <View style={styles.containerTop}>
                    <Thumbnail
                        style={styles.image}
                        source={logo === undefined ? defaultLogo : { uri: logo }}
                    />
                    <View style={styles.viewTop}>
                        <Text
                            style={styles.title}
                            numberOfLines={1}
                        >{name}</Text>
                        <ScrollView style={{}}>
                            <Text style={styles.subtitle}>{description}</Text>
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={{ paddingTop: Style.CARD_HEIGHT * 0.4, height: height.button }} onPress={this.ToggleInfo}>
                        <Icon name='chevron-down' />
                    </TouchableOpacity>
                </View>
                <View style={[styles.viewExtra, { height: height.extra }]}>
                    <View style={{ width: Style.CARD_WIDTH * 0.92 }}>
                        <TwoLine
                            firstLine={`Phone: ${about.phone[0]}`}
                            secondLine={`Website: ${about.web}`}
                            viewStyle={{ flex: 0.12, marginBottom: '2%' }}
                        />
                        <ScrollView horizontal style={{ flex: 0.88, height: '100%', marginTop: '2%' }}>
                            {this.renderSpeakers(speakers)}
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={{ paddingTop: Style.CARD_HEIGHT - Style.MARGIN * 3 }} onPress={this.ToggleInfo}>
                        <Icon name='chevron-up' />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.bottomSubContainer}>
                        <TwoLine
                            firstLine={'Event Date'}
                            secondLine={moment(startDate).format('Do MMM YYYY')}
                            viewStyle={[styles.viewBottom, { flex: 0.4, height: '100%' }]}
                            firstLineStyle={styles.subtitle2}
                            secondLineStyle={styles.subtitle}
                        />
                        <TwoLine
                            firstLine={'Event Code'}
                            secondLine={key}
                            viewStyle={[styles.viewBottom, { flex: 0.3, height: '100%' }]}
                            firstLineStyle={styles.subtitle2}
                            secondLineStyle={styles.subtitle}
                        />
                        <TwoLine
                            firstLine={'Event Duration'}
                            secondLine={moment.duration(moment(endDate).diff(startDate)).humanize()}
                            //secondLine={moment(startDate).diff(endDate, 'days')}
                            viewStyle={[styles.viewBottom, { flex: 0.3, height: '100%' }]}
                            firstLineStyle={styles.subtitle2}
                            secondLineStyle={styles.subtitle}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.getEvent()}>
                        <Text style={[styles.subtitle, { color: '#ffffff' }]}>Go To Event</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const Style = {
    MARGIN: responsiveWidth(2),

    CARD_WIDTH: responsiveWidth(96),
    CARD_HEIGHT: responsiveWidth(96) * 0.4,

    FONT_BIG: responsiveFontSize(2.48),
    FONT_NORMAL: responsiveFontSize(1.73),
    FONT_SMALL: responsiveFontSize(1.23),
    LINE_HEIGHT: 1.28
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: Style.CARD_WIDTH,
        height: Style.CARD_HEIGHT,
        margin: 10,
        borderRadius: 10,
        elevation: 1
    },
    containerTop: {
        flexDirection: 'row',
        width: Style.CARD_WIDTH,
        height: Style.CARD_HEIGHT * 0.65,
        padding: Style.MARGIN,
        backgroundColor: '#fafafa',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    containerBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Style.CARD_WIDTH,
        height: Style.CARD_HEIGHT * 0.35,
        padding: Style.MARGIN,
        backgroundColor: '#eeeeee',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        ...Font.regular,
        fontSize: Style.FONT_BIG,
        lineHeight: Style.FONT_BIG * Style.LINE_HEIGHT,
    },
    subtitle: {
        ...Font.regular,
        fontSize: Style.FONT_NORMAL,
        lineHeight: Style.FONT_NORMAL * Style.LINE_HEIGHT,
    },
    subtitle2: {
        ...Font.regular,
        fontSize: Style.FONT_SMALL,
        lineHeight: Style.FONT_SMALL * Style.LINE_HEIGHT,
        padding: '1%'
    },
    image: {
        width: Style.CARD_WIDTH * 0.19,
        height: Style.CARD_WIDTH * 0.19,
        marginRight: Style.MARGIN
    },
    viewTop: {
        width: Style.CARD_WIDTH * 0.7,
        height: '100%',
        paddingRight: Style.MARGIN
    },
    viewBottom: {
        paddingRight: Style.MARGIN
    },
    bottomSubContainer: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    button: {
        height: Style.CARD_HEIGHT * 0.35 * 0.5,
        width: Style.CARD_WIDTH * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#2aa763'
    },
    viewExtra: {
        width: Style.CARD_WIDTH,
        height: Style.CARD_HEIGHT,
        flexDirection: 'row',
        backgroundColor: '#fafafa',
    },
    speakerContainer: {
        height: '100%',
        width: Style.CARD_WIDTH * 0.16,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    }
});
