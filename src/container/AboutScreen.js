import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, FlatList} from 'react-native';
import {Container, Tab, Tabs, Thumbnail} from 'native-base'
import Header from "../component/Header";
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import IconSocial from 'react-native-vector-icons/Entypo'
import Communications from 'react-native-communications';

const mapStateToProps = (state) => ({
    event: state.event.event,
})

export class About extends Component {

    state = {
        sponsor: {
            'Platinum Sponsor': [
                {
                    logo:'https://javaday.istanbul/wp-content/uploads/2016/07/peak-1.png'
                },
                {
                    logo: 'https://javaday.istanbul/wp-content/uploads/2016/07/kodcu.png'
                },
            ],
            'Gold Sponsor': [
                {
                    logo:'https://javaday.istanbul/wp-content/uploads/2016/07/peak-1.png'
                },
                {
                    logo: 'https://javaday.istanbul/wp-content/uploads/2016/07/kodcu.png'
                },
                {
                    logo: 'https://javaday.istanbul/wp-content/uploads/2017/09/site-logo.png'
                },
            ],
        }
    }

    redirect(url) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to go');
            }
        }).catch(err => console.error('An error occurred', err));
    }

    rowItem=(name, icon) => <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() =>  icon === "ios-call-outline" ?  Communications.phonecall(name, true):Communications.email([name.toString()],null,null,'Etkinlik Hakkında','')}>
                <Icon name={icon} size={40} color={'#333'} style={{margin: 15}}/>
                <Text style={{
                    fontSize: 15,
                    fontWeight: '300',
                    margin: 15,
                    color: '#333'
                }}>{name}</Text>

            </TouchableOpacity>


    rowSocial = (icon, url) => <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => this.redirect(url)}>
                <IconSocial name={icon} size={40} color={'#333'} style={{margin: 15}}/>
            </TouchableOpacity>



    render() {
        const {event} = this.props;

        return (
            <Container style={styles.container}>

                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                    <Header.Title title="General Info"/>
                </Header>

                <ScrollView>

                    <View style={{padding: 15, justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                    }}>
                        <Image
                            source={{uri: event.logo}}
                            resizeMode="contain"
                            style={{margin: 10, width: 100, height: 100, borderRadius: 30}}/>
                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Text style={{fontWeight: '700', fontSize: 25, color: '#444', margin: 10}}>{event.name}</Text>
                            <Text style={{fontWeight: '200', color: '#999', textAlign: 'center'}}>{event.description}</Text>
                        </View>
                    </View>

                    <Tabs tabBarUnderlineStyle={{backgroundColor: '#2c8', elevation: 0, shadowColor: '#fff', height: 0}}
                          style={{marginTop: 10}}>
                        <Tab heading="Contact Us"
                             key={1}
                             tabStyle={styles.tab}
                             activeTabStyle={styles.activeTab}
                             activeTextStyle={styles.activeTabText}
                             textStyle={styles.tabText}>
                            <View style={{justifyContent: 'flex-start', alignItems: 'center', flex: 1, marginTop: 10}}>


                                {event.about.email ? this.rowItem(event.about.email, 'ios-at-outline') : null}

                                {event.about.phone ? <View>
                                    {event.about.phone.map((item,index) => this.rowItem(item,'ios-call-outline'))}
                                </View> : null}

                                {event.about.sosial ? <View style={{flexDirection: 'row', marginLeft: 50, marginRight: 50}}>
                                    {Object.keys(event.about.sosial).map((item,index) => this.rowSocial(item+'-with-circle', event.about.sosial[item]))}
                                </View> : null}

                            </View>
                        </Tab>

                        <Tab heading="Sponsor"
                             tabStyle={styles.tab}
                             key={2}
                             activeTabStyle={styles.activeTab}
                             activeTextStyle={styles.activeTabText}
                             textStyle={styles.tabText}>
                            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>



                                <View style={{justifyContent: 'flex-start', alignItems: 'center', flex: 1}}>

                                    {Object.keys(event.sponsor).map((item,index) =>
                                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>

                                        <Text style={{
                                                fontWeight: '700',
                                                fontSize: 25,
                                                color: '#2c9',
                                                margin: 10,
                                                marginTop: 20
                                            }}>{item}</Text>

                                            <View style={{alignItems: 'center', flex: 1}}>
                                                <FlatList
                                                    data={event.sponsor[item]}
                                                    renderItem={(info) => <Image source={{uri: info.item.logo}}
                                                                                 resizeMode="contain"
                                                                                 style={{margin: 10, width: 120, height: 80}}/>}
                                                    numColumns={index === 0 ? 1 : 2 }
                                                    keyExtractor={(item, i) => i}
                                                />

                                            </View>

                                        </View>
                                    )}

                                </View>

                            </View>
                        </Tab>

                    </Tabs>

                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#999',
        borderTopWidth: 1,
        borderTopColor: '#999',
    },
    activeTab: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#2c8',
        borderTopWidth: 1,
        borderTopColor: '#2c8',
    },
    tabText: {
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 0.47,
                color: '#999'
    },
    activeTabText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c8'
    },
    aboutField:{
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventLogo:{
        margin: 10,
        width: 100,
        height: 100,
        borderRadius: 30},
    detailField:{justifyContent: 'center',
        alignItems: 'center',
        flex: 1},
    detailTitleText:{fontWeight: '700',
        fontSize: 25,
        color: '#444',
        margin: 10},
    detailText:{fontWeight: '200',
        color: '#999',
        textAlign: 'center'},
    tabBarUnderlineStyle:{backgroundColor: '#2c8',
        elevation: 0,
        shadowColor: '#fff',
        height: 0},
    tabsStyle:{marginTop: 10},
    contact:{justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        marginTop: 10},
    socialMedia:{flexDirection: 'row',
        marginLeft: 50,
        marginRight: 50},
});

export default connect(mapStateToProps)(About)