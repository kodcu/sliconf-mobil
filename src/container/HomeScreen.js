import React, { Component } from 'react';
import {
    AsyncStorage,
    Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { actionCreators } from '../reducks/module/drawer';
import { AGENDA, ASK, INFO, LOCATION, SPEAKERS, SPONSOR, MAIN } from '../router';
import Header from '../component/Header';
import If from '../component/If';
import { moderateScale, scale, verticalScale } from '../theme/Scale';
import Color from '../theme/Color';
import Font from '../theme/Font';
import getImage from '../helpers/getImageHelper';

const mapStateToProps = (state) => ({
    event: state.event.event,
    connection: state.connection.connectionStatus,
    login: state.auth.login,
});

class HomeScreen extends Component {
    state = {
        buttons: [
            { name: 'Schedule', icon: 'ios-calendar-outline', nav: AGENDA },
            { name: 'Ask Question', icon: 'ios-chatbubbles', nav: ASK },
            { name: 'Speakers', icon: 'ios-microphone-outline', nav: SPEAKERS },
            { name: 'Location', icon: 'ios-map-outline', nav: LOCATION },
            { name: 'Sponsors', icon: 'ios-ribbon-outline', nav: SPONSOR },
            { name: 'Info', icon: 'ios-information-outline', nav: INFO },
        ]
    };

    componentWillMount() {
        const { dispatch, navigation } = this.props;
        dispatch(actionCreators.changedDrawer(navigation.state.routeName));

        AsyncStorage.setItem('eventName', this.props.event.name).then((name) => {
            console.log('Success', name);
        });
    }

    /**
     *Bir buton tasarimi
     * @param btn butonun icerigi
     * @returns {XML}
     */
    renderButton = (btn) => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate(btn.item.nav)}
            >
                <If con={btn.item.name === 'Ask Question'}>
                    <If.Then>
                        <View style={[styles.buttonIcon, { backgroundColor: Color.green, borderColor: Color.green }]}>
                            <Icon name={btn.item.icon} size={40} color={Color.white} />
                        </View>
                    </If.Then>
                    <If.Else>
                        <View style={styles.buttonIcon}>
                            <Icon name={btn.item.icon} size={40} color={Color.darkGray} />
                        </View>
                    </If.Else>
                </If>
                <Text
                    style={btn.item.name === 'Ask Question' ?
                        { ...Font.semiBold, color: Color.green } :
                        styles.buttonText
                    }
                >{btn.item.name}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { event } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.headerPanel}>
                    <Header
                        active
                        headerStyle={{ backgroundColor: Color.green, overflow: 'hidden' }}
                        leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.navigate(MAIN)}
                        onPressRight={() => this.props.navigation.navigate('DrawerOpen')}
                    />
                    <View style={styles.topInfo}>
                        <View style={{ flex: 0.72, flexDirection: 'column' }}>
                            <View style={styles.date}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon color={Color.white} name='ios-calendar-outline' size={22} />
                                    <Text
                                        style={styles.dateText}
                                    >{moment(event.startDate).format('Do MMM YYYY')}</Text>
                                </View>
                                <View style={{ paddingLeft: 8, flexDirection: 'row' }}>
                                    <Icon color={Color.white} name='ios-clock-outline' size={22} />
                                    <Text
                                        style={styles.dateText}
                                    >{moment(event.startDate).format('HH:mm')}</Text>
                                </View>
                            </View>
                            <View style={styles.eventName}>
                                <Text numberOfLines={3} style={styles.eventNameText}>
                                    {`${event.name}`}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.28 }}>
                            <Image
                                source={{ uri: getImage(event.logoPath) }}
                                style={styles.eventLogo}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonPanel}>
                    <FlatList
                        data={this.state.buttons}
                        renderItem={(button) => this.renderButton(button)}
                        keyExtractor={(item, index) => index}
                        numColumns={3}
                    />
                    <View style={{ flex: 0.1, width: '100%', height: '100%' }}>
                        <Text style={{ flex: 1 }}>This view is left for ads, Bu view reklam için bırakıldı.</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    headerPanel: {
        flex: 0.28,
        backgroundColor: Color.transparent,
        margin: '2%',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden'
    },
    topInfo: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Color.green,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 12,
        paddingRight: 12
    },
    eventLogo: {
        width: height * 0.15,
        height: height * 0.15,
        borderRadius: Platform.OS === 'ios' ? scale(45) : 90
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 8
    },
    dateText: {
        ...Font.regular,
        color: Color.white,
        fontSize: moderateScale(13),
        paddingLeft: 8
    },
    eventName: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 1,
        paddingTop: verticalScale(4),
        height: moderateScale(27) * 2
    },
    eventNameText: {
        ...Font.regular,
        color: Color.white,
        fontSize: moderateScale(24),
        textAlign: 'left',
        lineHeight: moderateScale(24)
    },
    buttonPanel: {
        flex: 0.63,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: Color.white,
    },
    buttonIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Platform.OS === 'ios' ? 50 : 90,
        borderWidth: 1,
        width: scale(50),
        height: scale(50),
        marginBottom: 4,
        borderColor: Color.darkGray
    },
    buttonText: {
        ...Font.light,
        color: Color.darkGray
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 2.96,
        height: height * 0.18
    }
});

export default connect(mapStateToProps)(HomeScreen);
