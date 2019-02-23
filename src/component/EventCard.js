import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Thumbnail } from 'native-base';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import moment from 'moment';

import { TwoLine } from './Selectables';
import Font from '../theme/Font';
import getImage from '../helpers/getImageHelper';

export default class LoginScreen extends Component {
    render() {
        const { event } = this.props;
        const { about, name, description, startDate, logoPath } = event;
        
        return (
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <TouchableOpacity style={styles.image} onPress={() => this.props.getEvent()}>
                        <Thumbnail
                            style={styles.image}
                            source={{ uri: getImage(logoPath) }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewTop} onPress={() => this.props.getEvent()}>
                        <View style={styles.viewTop}>
                            <Text
                                style={styles.title}
                                numberOfLines={1}
                            >{name}</Text>
                            <Text 
                                style={styles.subtitle}
                                numberOfLines={3}
                            >{description}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.bottomSubContainer}>
                        <TwoLine
                            firstLine={'Date'}
                            secondLine={moment(startDate).format('MMM DD, YYYY')}
                            viewStyle={[styles.viewBottom, { flex: 0.4 }]}
                            firstLineStyle={styles.subtitle2}
                            secondLineStyle={styles.subtitle}
                        />
                        <TwoLine
                            firstLine={'Venue'}
                            secondLine={about.location.venue}
                            viewStyle={[styles.viewBottom, { flex: 0.6 }]}
                            firstLineStyle={styles.subtitle2}
                            secondLineStyle={styles.subtitle}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.getEvent()}>
                        <Text style={[styles.subtitle, { color: '#ffffff' }]}>Go To Event</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const SIZE = {
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
        width: SIZE.CARD_WIDTH,
        height: SIZE.CARD_HEIGHT,
        margin: 10,
        borderRadius: 10,
        elevation: 1
    },
    containerTop: {
        flexDirection: 'row',
        width: SIZE.CARD_WIDTH,
        height: SIZE.CARD_HEIGHT * 0.65,
        padding: SIZE.MARGIN,
        backgroundColor: '#fafafa',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    containerBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZE.CARD_WIDTH,
        height: SIZE.CARD_HEIGHT * 0.35,
        backgroundColor: '#eeeeee',
        padding: '0.8%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        ...Font.regular,
        fontSize: SIZE.FONT_BIG,
        lineHeight: SIZE.FONT_BIG * SIZE.LINE_HEIGHT,
    },
    subtitle: {
        ...Font.regular,
        fontSize: SIZE.FONT_NORMAL,
        lineHeight: SIZE.FONT_NORMAL * SIZE.LINE_HEIGHT,
    },
    subtitle2: {
        ...Font.regular,
        fontSize: SIZE.FONT_SMALL,
        lineHeight: SIZE.FONT_SMALL * SIZE.LINE_HEIGHT,
        padding: '1%'
    },
    image: {
        width: SIZE.CARD_WIDTH * 0.19,
        height: SIZE.CARD_WIDTH * 0.19,
        marginRight: SIZE.MARGIN
    },
    viewTop: {
        width: SIZE.CARD_WIDTH * 0.7,
        height: '100%',
        paddingRight: SIZE.MARGIN
    },
    viewBottom: {
        height: '100%',
        paddingRight: SIZE.MARGIN
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
        height: SIZE.CARD_HEIGHT * 0.35 * 0.5,
        width: SIZE.CARD_WIDTH * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#2aa763'
    },
    viewExtra: {
        width: SIZE.CARD_WIDTH,
        height: SIZE.CARD_HEIGHT,
        flexDirection: 'row',
        backgroundColor: '#fafafa',
    },
    speakerContainer: {
        height: '100%',
        width: SIZE.CARD_WIDTH * 0.16,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    }
});
