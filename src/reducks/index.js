import {applyMiddleware, compose, createStore} from 'redux'
//import {persistStore, autoRehydrate} from 'redux-persist'
//import createMiddleware from './middleware/clientMiddleware';
//import ApiClient from '../helpers/ApiClient';
import thunk from 'redux-thunk'
//import createHistory from 'history/createBrowserHistory'
import rootReducer from './module'
import logger from 'redux-logger'


//export const history = createHistory()
//export const client = new ApiClient();


const initialState = {}
const enhancers = []
const middleware = [
    thunk,
    logger,
    //createMiddleware(client),
    //routerMiddleware(history)
]

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    //autoRehydrate(),
    ...enhancers
)

const _store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
)

//let _persistor = persistStore(_store,{storage: AsyncStorage});

//export const persistor = _persistor;
const store = _store;
export default store;
