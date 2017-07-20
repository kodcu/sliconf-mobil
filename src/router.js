import { StackNavigator } from 'react-navigation';
import SplashScreen from './components/SplashScreen';
import MainScreen from './components/MainScreen';

export let SPLASH = 'screen/Splash'
export let MAIN = 'screen/Main'

export default StackNavigator({
  [SPLASH] : { screen: SplashScreen},
  [MAIN] : { screen: MainScreen }
});
