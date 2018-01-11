import { combineReducers } from "redux"
import NavReducer from './navigator'
import AuthReducer from './auth'
import EventReducer from './event'
import CommentReducer from './comment'
import DrawerReducer from './drawer'
import ConnectionReducer from './connection'
import AuthDeviceReducer from './authDevice'
import TalkReducer from './talk'

export default combineReducers({
    auth: AuthReducer,
    event:EventReducer,
    nav: NavReducer,
    drawer: DrawerReducer,
    comment:CommentReducer,
    connection:ConnectionReducer,
    authDevice:AuthDeviceReducer,
    talk:TalkReducer
});