import {DrawerNavigator, StackNavigator} from 'react-navigation';
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

export const SPLASH = 'screen/Splash';
export const MAIN = 'screen/Main';
export const HOME = 'screen/Home';
export const LOGIN = 'screen/Login';
export const AGENDA = 'screen/Agenda';
export const SPEAKERS = 'screen/Speakers';
export const SEARCHRESULT = 'screen/SearchResult';
export const INFO = 'screen/InfoScreen';
export const SPEAKERINFO = 'screen/SpeakerInfo';
export const LOCATION = 'screen/Location';
export const FLOOR = 'screen/Floor';
export const TALK = 'screen/Talk';
export const EVENT_STACK = 'stack/Event';
export const MAIN_STACK = 'stack/Main';


const EventStack = DrawerNavigator({
    [HOME]: {screen: HomeScreen},
    [AGENDA]: {
        screen: StackNavigator({
            [AGENDA]: {screen: AgendaScreen},
            [SEARCHRESULT]: {screen: SearchResult},
            [TALK]: {screen: TalkDetailScreen},
        }, {
            headerMode: 'none',
            navigationOptions: {
                gesturesEnabled: false
            }
        })
    },
    [SPEAKERS]: {
        screen: StackNavigator({
            [SPEAKERS]: {screen: SpeakersScreen},
            [SPEAKERINFO]: {screen: SpeakerInfoScreen}
        }, {
            headerMode: 'none',
            navigationOptions: {
                gesturesEnabled: false
            }
        })
    },
    [INFO]: {screen: InfoScreen},
    [LOGIN]: {screen: LoginScreen},
    [LOCATION]: {screen: LocationScreen},
    [FLOOR]: {screen: FloorPlanScreen},
    [LOGIN]: {screen: LoginScreen},

}, {
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false
    },
    drawerWidth: 250,
    drawerPosition: 'right',
    contentOptions: {
        activeTintColor: '#fff',
        activeBackgroundColor: '#29B673',
    },
    contentComponent: DrawerMenu
});

const MainStack = StackNavigator({
    [SPLASH]: {screen: SplashScreen},
    [MAIN]: {screen: MainScreen},
    [LOGIN]: {screen: LoginScreen},

}, {
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false
    }

});

// Manifest of possible screens
const PrimaryNav = StackNavigator({
        [MAIN_STACK]: {screen: MainStack},
        [EVENT_STACK]: {screen: EventStack}
    },
    {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false
        }
    });

export default PrimaryNav