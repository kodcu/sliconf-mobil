import React, {Component} from "react"
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from "react-native"
import {Button,} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import ProfileComponent from '../component/ProfileComponent'
import DrawerItem from '../component/DrawerItemComponent'
import {AGENDA, HOME, INFO, SPEAKERS,LOCATION} from "../router";
import If from "../component/If";

const userData = {
    profileUrl: 'https://s-media-cache-ak0.pinimg.com/736x/a3/e3/d6/a3e3d67e30105ca1688565e484370ab8--social-networks-harry-potter.jpg',
    username: 'Nursel Cıbır',
    email: 'nurselcibir@gmail.com'
}

class DrawerMenu extends Component {

    state = {
        selected: 1,
        logout: false,
        login:false
    }

    setSelected = (key) => {
        this.setState({selected: key})
    }

    logout_close = () => this.setState({logout:false})
    logout_open = () => this.setState({logout:true})

    render() {

        const menuData = [
            {icon: "ios-home-outline", name: "Home", screenName: HOME, key: 1},
            {icon: "ios-calendar-outline", name: "Schedule", screenName: AGENDA, key: 2},
            {icon: "ios-microphone-outline", name: "Speakers", screenName: SPEAKERS, key: 3},
            {icon: "ios-compass-outline", name: "Location", screenName: LOCATION, key: 4},
            {icon: "ios-information-circle-outline", name: "Info", screenName: INFO, key: 5},

        ]


        return (
            <View style={styles.container}>

                <FlatList
                    data={menuData}
                    renderItem={({item}) => <DrawerItem navigation={this.props.navigation} screenName={item.screenName}
                                                        onPress={() => this.setSelected(item.key)}
                                                        icon={item.icon} name={item.name} key={item.key}
                                                        color={this.state.selected === item.key ? '#29B673' : '#333'}/>}
                />
                <View>
                    <View style={{height: this.state.logout ? 70 : 0,backgroundColor:'#29B673',alignItems:'center',justifyContent:'space-around'}}>
                        <Text style={{color:'#fff',paddingTop:10}}>Are you sure?</Text>
                        <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',alignItems:'center'}}>
                            <Button transparent onPress={() =>{ this.logout_close();this.setState({login:false})} }>
                                <Text style={{color:'#fff'}}>Yes</Text>
                            </Button>
                            <Button transparent onPress={() => this.logout_close()}>
                                <Text style={{color:'#fff'}}>No</Text>
                            </Button>
                        </View>
                    </View>
                    <If con={this.state.login}>
                        <If.Then>
                            <ProfileComponent logout={() => this.logout_open()} profileUrl={userData.profileUrl} username={userData.username} email={userData.email}/>
                        </If.Then>
                        <If.Else>
                            <ProfileComponent.Login login={() => this.setState({login:true})}/>
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
        paddingTop: 10
    },
    menuItem: {
        flexDirection: 'row'
    },
    menuItemText: {
        fontSize: 15,
        fontWeight: '300',
        margin: 15,
    }
})

DrawerMenu.defaultProps = {};

DrawerMenu.propTypes = {};

export default DrawerMenu;
