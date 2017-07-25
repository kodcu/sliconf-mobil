import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import AppNavigator from '../../router'
import {MAIN,SPLASH,HOME} from '../../router'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(SPLASH));

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams(SPLASH);
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams(MAIN);
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

const navReducer = (state, action) => {
  let nextState;

  switch (action.type) {
    case SPLASH:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: SPLASH }),
        state
      );
      break;
      case HOME:
          nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: HOME }),
              state
          );
          break;
    case MAIN:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: MAIN }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  //const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export default navReducer;
