import React, {Component} from "react"
import { FlatList, StyleSheet, Text, View, AsyncStorage } from "react-native"
import { Button } from 'native-base'
import { connect } from 'react-redux'
import ProfileComponent from '../component/ProfileComponent'
import SignInComponent from '../component/SignInComponent'
import DrawerItem from '../component/DrawerItemComponent'
import {AGENDA, ASK, FLOOR, HOME, INFO, LOCATION, LOGIN, SPEAKERS, SPONSOR} from "../router";
import If from "../component/If";
import Font from "../theme/Font";
import Color from "../theme/Color";
import {actionCreators} from "../reducks/module/auth";
import {actionCreators as actionCreatorsDevice} from "../reducks/module/authDevice";
import DeviceInfo from 'react-native-device-info';


const mapStateToProps = (state) => ({
    selectDrawer: state.drawer.drawerIndex,
    user: state.auth.user,
    login: state.auth.login
});

class DrawerMenu extends Component {

    state = {
        logout: false,
        login: false,
    };

    logout_close = () => this.setState({logout: false});
    logout_open = () => this.setState({logout: true});

    render() {

        const menuData = [
            {icon: "ios-home-outline", name: "Home", screenName: HOME, key: 1},
            {icon: "ios-calendar-outline", name: "Schedule", screenName: AGENDA, key: 2},
            {icon: "ios-microphone-outline", name: "Speakers", screenName: SPEAKERS, key: 3},
            {icon: "ios-compass-outline", name: "Location", screenName: LOCATION, key: 4},
            {icon: "ios-menu-outline", name: "Floor Plan", screenName: FLOOR, key: 5},
            {icon: "ios-ribbon-outline", name: "Sponsors", screenName: SPONSOR, key: 6},
            {icon: "ios-information-circle-outline", name: "Info", screenName: INFO, key: 7},
            {icon: "ios-help-circle-outline", name: "Ask Question", screenName: ASK, key: 8},
        ];

        const selected = this.props.selectDrawer;

        return (
            <View style={styles.container}>

                <FlatList
                    data={menuData}
                    renderItem={({item}) =>
                        <DrawerItem navigation={this.props.navigation}
                                    screenName={item.screenName}
                                    icon={item.icon}
                                    name={item.name}
                                    key={item.key}
                                    current={selected}
                        />}
                />
                <View>
                    <If con={this.state.logout}>
                    <View style={{
                        height: this.state.logout ? 70 : 0,
                        backgroundColor: Color.green,
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}>
                        <Text style={styles.question}>Are you sure?</Text>
                        <View style={styles.questionTab}>
                            <Button transparent style={{width: 40, justifyContent: 'center', marginRight: 10}}
                                    onPress={async () => {
                                        this.logout_close();
                                        //await this.props.dispatch(actionCreatorsDevice.loginDevice(DeviceInfo.getUniqueID()));
                                        this.props.dispatch(actionCreators.logout());
                                        AsyncStorage.removeItem('UserToken');
                                        this.props.navigation.navigate(HOME);
                                    }}>
                                <Text style={styles.questionText}>Yes</Text>
                            </Button>
                            <Button transparent style={{width: 40, justifyContent: 'center'}}
                                    onPress={() => this.logout_close()}>
                                <Text style={styles.questionText}>No</Text>
                            </Button>
                        </View>
                    </View></If>
                    <If con={this.props.login}>
                        <If.Then>
                            <ProfileComponent logout={() => this.logout_open()}
                                              username={this.props.user.username} email={this.props.user.email}/>
                        </If.Then>
                        <If.Else>
                            <SignInComponent login={() => {
                                this.setState({login: true});
                                this.props.navigation.navigate(LOGIN)
                            }}/>
                        </If.Else>
                    </If>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        //justifyContent: 'space-between',
        paddingTop: 30
    },
    menuItem: {
        flexDirection: 'row'
    },
    menuItemText: {
        ...Font.medium,
        fontSize: 15,
        margin: 15,
    },
    question: {
        ...Font.semiBold,
        paddingTop:5,
        color: Color.white
    },
    questionText: {
        ...Font.semiBold,
        color: Color.white
    },
    questionTab:{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

export default connect(mapStateToProps)(DrawerMenu)
