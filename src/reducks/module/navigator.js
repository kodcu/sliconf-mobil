import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import AppNavigator from '../../router'
import {MAIN,SPLASH,HOME,LOGIN,AGENDA,SPEAKERS,SEARCHRESULT,INFO,SPEAKERINFO} from '../../router'

//const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(SPLASH));

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
      case AGENDA:
          nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: AGENDA }),
              state
          );
          break;
      case SPEAKERS:
          nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: SPEAKERS }),
              state
          );
          break;
      case LOGIN:
          nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: LOGIN }),
              state
          );
          break;
      case SEARCHRESULT:
          nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: SEARCHRESULT }),
              state
          );
          break;
      case INFO:
          nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: INFO }),
              state
          );
          break;
      case SPEAKERINFO:
          nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: SPEAKERINFO }),
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
