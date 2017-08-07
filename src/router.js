import {StackNavigator} from 'react-navigation';
import SplashScreen from './container/SplashScreen';
import MainScreen from './container/MainScreen';
import HomeScreen from './container/HomeScreen';
import LoginScreen from './container/LoginScreen';

export let SPLASH = 'screen/Splash'
export let MAIN = 'screen/Main'
export let HOME = 'screen/Home'
export let LOGIN = 'screen/Login'

export default StackNavigator({
    [SPLASH]: {screen: SplashScreen},
    [MAIN]: {screen: MainScreen},
    [HOME]:{screen: HomeScreen},
    [LOGIN]:{screen: LoginScreen},
});
