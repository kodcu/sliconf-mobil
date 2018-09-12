import React, { Component } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSocial from 'react-native-vector-icons/Entypo';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';

import Header from "../component/Header";
import { actionCreators } from '../reducks/module/drawer';
import Font from "../theme/Font";
import Color from "../theme/Color";
import { moderateScale } from "../theme/Scale";
import getImage from "../helpers/getImageHelper";

const mapStateToProps = (state) => ({
    event: state.event.event,
});

export class About extends Component {
    componentWillMount() {
        const { dispatch, navigation } = this.props;
        dispatch(actionCreators.changedDrawer(navigation.state.routeName));
    }

    /**
     * Etkinligin iletisim bilgilerini ekrana basar
     * @param name iletisim bilgisi
     * @param icon kullanilacak ikon ismi
     * @param type mail - telefon (email-phone)
     * @param index
     */
    rowItem = (name, icon, type, index) =>
        <TouchableOpacity
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => type === "phone" ?
                Communications.phonecall(name, true) :
                Communications.email([name.toString()], null, null, this.props.event.name + ' About', '')}
        >
            <Icon name={icon} size={40} color={Color.darkGray} style={{ margin: 15 }} />
            <Text style={styles.aboutText}>{name}</Text>
        </TouchableOpacity>

    /**
     * Etkinligin sosyal medya hesaplarini ekrana basar
     * @param icon sosyal medya ikonunun ismi
     * @param url sosyal medya linki
     * @param index
     */
    rowSocial = (icon, url, index) => {
        if (url) {
            return (
                <TouchableOpacity
                    key={index}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => this.redirect(url)}
                >
                    <IconSocial
                        name={icon}
                        size={40}
                        color={Color.darkGray}
                        style={{ margin: 10 }}
                    />
                </TouchableOpacity>
            );
        }
    }

    /**
     * Sosyal medya linklerini yonlendirir
     * @param url yonlendirelecek link
     */
    redirect(url) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to go');
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {
        const event = this.props.event;
        const about = event.about;

        return (
            <View style={styles.container}>

                <Header leftImage='chevron-left' rightImage='bars'
                    onPressLeft={() => this.props.navigation.goBack()}
                    onPressRight={() => {
                        this.props.navigation.navigate('DrawerOpen')
                    }}>
                    <Header.Title title="General Info" />
                </Header>

                <ScrollView>

                    <View style={styles.aboutField}>
                        <Thumbnail large source={{ uri: getImage(event.logoPath) }} />

                        <View style={styles.aboutPanel}>
                            <Text style={styles.eventNameText}>{event.name}</Text>
                            <Text style={styles.descText}>{event.description}</Text>
                        </View>

                    </View>

                    <View style={styles.panel}>
                        <Text style={styles.activeTabText}>Contact Us</Text>
                        <View style={styles.contact}>
                            {about.email ? this.rowItem(about.email, 'ios-at-outline', 'email') : null}
                            {about.phone ? about.phone.map((item, index) => item.trim() ?
                                this.rowItem(item, 'ios-call-outline', 'phone', index) : null) : null}
                            {about.social ?
                                <View style={styles.socialMedia}>
                                    {Object.keys(about.social).map((item, index) =>
                                        item.trim() ? this.rowSocial(item + '-with-circle', about.social[item], index) : null

                                    )}
                                </View> : null
                            }

                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    aboutPanel: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    panel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.white,
    },
    activeTab: {
        backgroundColor: Color.white,
        borderBottomWidth: 1,
        borderBottomColor: Color.green,
        borderTopWidth: 1,
        borderTopColor: Color.green,
    },
    tabText: {
        ...Font.regular,
        fontSize: moderateScale(15),
        lineHeight: 23,
        letterSpacing: 0.47,
        color: Color.darkGray3
    },
    activeTabText: {
        ...Font.medium,
        fontSize: moderateScale(18),
        color: Color.green
    },
    aboutField: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabBarUnderlineStyle: {
        backgroundColor: Color.green,
        elevation: 0,
        shadowColor: Color.white,
        height: 0
    },
    tabsStyle: {
        marginTop: 10
    },
    contact: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        margin: 5
    },
    socialMedia: {
        flexDirection: 'row',
        marginLeft: 50,
        marginRight: 50
    },
    descText: {
        ...Font.light,
        color: Color.darkGray3,
        textAlign: 'center'
    },
    eventNameText: {
        ...Font.medium,
        fontSize: moderateScale(25),
        color: Color.darkGray,
        margin: 10,
        textAlign: 'center'
    },
    aboutText: {
        ...Font.regular,
        fontSize: moderateScale(15),
        margin: 15,
        color: Color.darkGray
    }
});

export default connect(mapStateToProps)(About)