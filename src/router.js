import {StackNavigator, DrawerNavigator, DrawerItems} from 'react-navigation';
import SplashScreen from './container/SplashScreen';
import MainScreen from './container/MainScreen';
import HomeScreen from './container/HomeScreen';
import LoginScreen from './container/LoginScreen';
import AgendaScreen from './container/AgendaScreen'
import SpeakersScreen from './container/SpeakersScreen'
import SearchResult from './container/SearchResult'
import InfoScreen from './container/AboutScreen'
import SpeakerInfoScreen from './container/SpeakerInfoScreen'
import * as React from "react";
import DrawerMenu from "./container/DrawerMenu";
import LocationScreen from "./container/LocationScreen"
import FloorPlanScreen from "./container/FloorPlanScreen"
import TalkDetailScreen from "./container/TalkDetailScreen"

export let SPLASH = 'screen/Splash'
export let MAIN = 'screen/Main'
export let HOME = 'screen/Home'
export let LOGIN = 'screen/Login'
export let AGENDA = 'screen/Agenda'
export let SPEAKERS = 'screen/Speakers'
export let SEARCHRESULT = 'screen/SearchResult'
export let INFO = 'screen/InfoScreen'
export let SPEAKERINFO = 'screen/SpeakerInfo'
export let LOCATION ='screen/Location'
export let FLOOR ='screen/Floor'
export let TALK ='screen/Talk'

const DrawerStack = DrawerNavigator({
    [HOME]: {screen: HomeScreen},
    [AGENDA]: {
        screen: StackNavigator({
            [AGENDA]: {screen: AgendaScreen},
            [SEARCHRESULT]: {screen: SearchResult},
            [TALK] :{screen:TalkDetailScreen},
        },{
            headerMode: 'none',
        })
    },
    [SPEAKERS]: {
        screen: StackNavigator({
            [SPEAKERS]: {screen: SpeakersScreen},
            [SPEAKERINFO]: {screen: SpeakerInfoScreen}
        },{
    headerMode: 'none',
})
    },
    [INFO]: {screen: InfoScreen},
    [LOGIN]: {screen: LoginScreen},
    [LOCATION] :{screen:LocationScreen},
    [FLOOR] :{screen:FloorPlanScreen},



}, {
    headerMode: 'none',
    drawerWidth: 250,
    drawerPosition: 'right',
    contentOptions: {
        activeTintColor: '#fff',
        activeBackgroundColor: '#29B673',
    },
    contentComponent: DrawerMenu
})

const LoginStack = StackNavigator({
    [SPLASH]: {screen: SplashScreen},
    [MAIN]: {screen: MainScreen},

},{
    headerMode: 'none',
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
        loginStack: {screen: LoginStack},
        drawerStack: {screen: DrawerStack}
    },
    {
        headerMode: 'none',
    })

export default PrimaryNav