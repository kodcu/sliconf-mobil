import {StackNavigator} from 'react-navigation';
import SplashScreen from './components/SplashScreen';
import MainScreen from './components/MainScreen';
import HomeScreen from './components/HomeScreen';

export let SPLASH = 'screen/Splash'
export let MAIN = 'screen/Main'
export let HOME = 'screen/Home'

export default StackNavigator({
    [SPLASH]: {screen: SplashScreen},
    [MAIN]: {screen: MainScreen},
    [HOME]:{screen: HomeScreen}
});
