import React, {Component} from 'react';
import {FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container, Tab, Tabs, Thumbnail} from 'native-base'
import Header from "../component/Header";
import {connect} from 'react-redux'
import {actionCreators} from '../reducks/module/drawer'
import Icon from 'react-native-vector-icons/Ionicons'
import IconSocial from 'react-native-vector-icons/Entypo'
import Communications from 'react-native-communications';
import Font from "../theme/Font";
import Color from "../theme/Color";
import * as Scale from "../theme/Scale";
import getImage from "../helpers/getImageHelper"

const mapStateToProps = (state) => ({
    event: state.event.event,
});

export class About extends Component {

    /**
     * Etkinligin iletisim bilgilerini ekrana basar
     * @param name iletisim bilgisi
     * @param icon kullanilacak ikon ismi
     * @param type mail - telefon (email-phone)
     */
    rowItem = (name, icon, type,index) =>
        <TouchableOpacity key={index}
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => type === "phone" ? Communications.phonecall(name, true) :
                Communications.email([name.toString()], null, null, this.props.event.name + ' About', '')}>
            <Icon name={icon} size={40} color={Color.darkGray} style={{margin: 15}}/>
            <Text style={styles.aboutText}>{name}</Text>

        </TouchableOpacity>


    /**
     * Etkinligin sosyal medya hesaplarini ekrana basar
     * @param icon sosyal medya ikonunun ismi
     * @param url sosyal medya linki
     */
    rowSocial = (icon, url,index) =>
        <TouchableOpacity key={index}
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => this.redirect(url)}>
            <IconSocial name={icon} size={40} color={Color.darkGray} style={{margin: 10}}/>
        </TouchableOpacity>


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

    componentWillMount(){
        const {dispatch,navigation} = this.props;
        dispatch(actionCreators.changedDrawer(navigation.state.routeName));
    }

    _sponsor = () => {Object.keys(sponsors).map((item, index) =>
        <View key={index} style={styles.sponsorTagPanel}>
            <Text style={styles.sponsorTag}>{item}</Text>
            <View style={styles.sponsorPanel}>
                <FlatList
                    data={event.sponsors[item]}
                    numColumns={index === 0 ? 1 : 2}
                    keyExtractor={(item, i) => i}
                    renderItem={(info) =>{
                        console.log('bbb'+info)
                        return <Image source={{uri: info.item.logo}}
                                      resizeMode="contain"
                                      style={styles.sponsorLogo}
                        />}
                    }
                />
            </View>
        </View>
    )}

    render() {
        const event = this.props.event;
        const about = event.about;
        let sponsors = [];
        if (event.sponsors !== undefined && event.sponsors !==null && !event.sponsors.isEmpty)
            sponsors = event.sponsors;

        return (
            <View style={styles.container}>

                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                    <Header.Title title="General Info"/>
                </Header>

                <ScrollView>

                    <View style={styles.aboutField}>
                        <Thumbnail large source={{uri: getImage(event.logoPath)}}/>

                        <View style={styles.sponsorTagPanel}>
                            <Text style={styles.EventnameText}>{event.name}</Text>
                            <Text style={styles.descText}>{event.description}</Text>
                        </View>

                    </View>

                    <Tabs tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                          style={{marginTop: 10}}>
                        <Tab heading="Contact Us"
                             key={1}
                             tabStyle={styles.tab}
                             activeTabStyle={styles.activeTab}
                             activeTextStyle={[styles.activeTabText, Font.medium]}
                             textStyle={styles.tabText}>
                            <View style={styles.contact}>

                                {about.email  ? this.rowItem(about.email, 'ios-at-outline', 'email') : null}
                                {about.phone ? about.phone.map((item, index) => this.rowItem(item, 'ios-call-outline', 'phone',index)) : null}
                                {about.social ?
                                    <View style={styles.socialMedia}>
                                        {Object.keys(about.social).map((item, index) =>
                                            this.rowSocial(item + '-with-circle', about.social[item],index)
                                        )}
                                    </View> : null
                                }

                            </View>
                        </Tab>

                        <Tab heading="Sponsor"
                             tabStyle={styles.tab}
                             key={2}
                             activeTabStyle={styles.activeTab}
                             activeTextStyle={[styles.activeTabText, Font.medium]}
                             textStyle={styles.tabText}>
                            <View style={styles.sponsorTagPanel}>
                                    <View style={styles.sponsor}>
                                        {Object.keys(event.sponsors).map((item, index) =>
                                            <View key={index} style={styles.sponsorTagPanel}>
                                                <Text style={styles.sponsorTag}>{event.sponsorTags[item]}</Text>
                                                <View style={styles.sponsorPanel}>
                                                    <FlatList
                                                        data={event.sponsors[item]}
                                                        numColumns={index === 0 ? 1 : 2}
                                                        keyExtractor={(item, i) => i}
                                                        renderItem={(info) =>{
                                                            console.log('bbb'+info)
                                                            return <Image source={{uri: getImage(info.item.logo)}}
                                                                          resizeMode="contain"
                                                                          style={styles.sponsorLogo}
                                                            />}
                                                        }
                                                    />
                                                </View>
                                            </View>
                                        )}
                                    </View>
                            </View>
                        </Tab>
                    </Tabs>
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
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.white,
        borderBottomWidth: 1,
        borderBottomColor: Color.darkGray4,
        borderTopWidth: 1,
        borderTopColor: Color.darkGray4,
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
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 0.47,
        color: Color.darkGray3
    },
    activeTabText: {
        ...Font.medium,
        fontSize: 18,
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
        marginTop: 10
    },
    socialMedia: {
        flexDirection: 'row',
        marginLeft: 50,
        marginRight: 50
    },
    sponsorLogo: {
        margin: 5,
        width: (Scale.width - 30) * 0.4,
        height: (Scale.width - 30) * 0.4
    },
    sponsorPanel: {
        alignItems: 'center',
        flex: 1
    },
    sponsorTag: {
        ...Font.bold,
        fontSize: 20,
        color: Color.green,
        margin: 10,
        marginTop: 20
    },
    sponsorTagPanel: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    sponsor: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    descText: {
        ...Font.light,
        color: Color.darkGray3,
        textAlign: 'center'
    },
    EventnameText: {
        ...Font.medium,
        fontSize: 25,
        color: Color.darkGray,
        margin: 10,
        textAlign:'center'
    },
    aboutText: {
        ...Font.regular,
        fontSize: 15,
        margin: 15,
        color: Color.darkGray
    }
});

export default connect(mapStateToProps)(About)