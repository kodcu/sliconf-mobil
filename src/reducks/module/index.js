import { combineReducers } from "redux"
import NavReducer from './navigator'

export default combineReducers({
    nav: NavReducer,
    //auth: AuthReducer
});
