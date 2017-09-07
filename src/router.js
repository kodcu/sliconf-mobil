import {StackNavigator} from 'react-navigation';
import SplashScreen from './container/SplashScreen';
import MainScreen from './container/MainScreen';
import HomeScreen from './container/HomeScreen';
import LoginScreen from './container/LoginScreen';
import AgendaScreen from './container/AgendaScreen'
import SpeakersScreen from './container/SpeakersScreen'
import SearchResult from './container/SearchResult'

export let SPLASH = 'screen/Splash'
export let MAIN = 'screen/Main'
export let HOME = 'screen/Home'
export let LOGIN = 'screen/Login'
export let AGENDA ='screen/Agenda'
export let SPEAKERS ='screen/Speakers'
export let SEARCHRESULT ='screen/SearchResult'

export default StackNavigator({
    [SPLASH]: {screen: SplashScreen},
    [MAIN]: {screen: MainScreen},
    [HOME]:{screen: HomeScreen},
    [AGENDA]:{screen: AgendaScreen},
    [SPEAKERS]:{screen: SpeakersScreen},
    [LOGIN]:{screen: LoginScreen},
    [SEARCHRESULT]:{screen:SearchResult}
});
