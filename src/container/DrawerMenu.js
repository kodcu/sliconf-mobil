import React, {Component} from "react"
import {FlatList, StyleSheet, Text, View,} from "react-native"
import {Button} from 'native-base'
import {connect} from 'react-redux'
import ProfileComponent from '../component/ProfileComponent'
import DrawerItem from '../component/DrawerItemComponent'
import {AGENDA, FLOOR, HOME, INFO, LOCATION, LOGIN, SPEAKERS} from "../router";
import If from "../component/If";
import Font from "../theme/Font";
import Color from "../theme/Color";
import {actionCreators} from "../reducks/module/auth";

const mapStateToProps = (state) => ({
    selectDrawer: state.drawer.drawerIndex,
    user:state.auth.user,
    login:state.auth.login
});

const userData = {
    profileUrl: 'https://s-media-cache-ak0.pinimg.com/736x/a3/e3/d6/a3e3d67e30105ca1688565e484370ab8--social-networks-harry-potter.jpg',
    username: 'Nursel Cıbır',
    email: 'nurselcibir@gmail.com'
};

class DrawerMenu extends Component {

    state = {
        logout: false,
        login: false,
        userData : {
            profileUrl: 'https://s-media-cache-ak0.pinimg.com/736x/a3/e3/d6/a3e3d67e30105ca1688565e484370ab8--social-networks-harry-potter.jpg',
            username: 'Nursel Cıbır',
            email: 'nurselcibir@gmail.com'
        }
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
            {icon: "ios-information-circle-outline", name: "Info", screenName: INFO, key: 6},

            ];

        const selected = this.props.selectDrawer;

        return (
            <View style={styles.container}>

                <FlatList
                    data={menuData}
                    renderItem={({item}) => <DrawerItem navigation={this.props.navigation} screenName={item.screenName}
                                                        icon={item.icon} name={item.name} key={item.key} current={selected}
                                                        color={selected === item.screenName ? Color.green : Color.darkGray}/>}
                />
                <View>
                    <View style={{
                        height: this.state.logout ? 70 : 0,
                        backgroundColor: this.state.logout ? '#29B673' : '#fff',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}>
                        <Text style={{color: '#fff', paddingTop: 10}}>Are you sure?</Text>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Button transparent onPress={() => {
                                this.logout_close();
                                this.props.dispatch(actionCreators.logout())
                            }}>
                                <Text style={{color: '#fff'}}>Yes</Text>
                            </Button>
                            <Button transparent onPress={() => this.logout_close()}>
                                <Text style={{color: '#fff'}}>No</Text>
                            </Button>
                        </View>
                    </View>
                    <If con={this.props.login}>
                        <If.Then>
                            <ProfileComponent logout={() => this.logout_open()} profileUrl={''}
                                              username={this.props.user.username} email={this.props.user.email}/>
                        </If.Then>
                        <If.Else>
                            <ProfileComponent.Login login={() => {this.setState({login: true});this.props.navigation.navigate(LOGIN)}}/>
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
        backgroundColor: 'rgba(255,255,255,0.43)',
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
    }
});

export default connect(mapStateToProps)(DrawerMenu)
