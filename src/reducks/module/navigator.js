import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import AppNavigator from '../../router'
import {MAIN,SPLASH,HOME,REDUX} from '../../router'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(SPLASH));

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
      case REDUX:
          nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: REDUX }),
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
