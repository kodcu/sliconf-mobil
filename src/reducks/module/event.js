/**
 * Created by Muslum on 30.07.2017.
 */

 import Request from '../../service/Request'

const types = {
    EVENTLIST_POSTS_REQUEST: 'EVENTLIST_POSTS_REQUEST',
    EVENTLIST_POSTS_RESPONSE_SUC: 'EVENTLIST_POSTS_RESPONSE_SUC',
    EVENTLIST_POSTS_RESPONSE_FAIL: 'EVENTLIST_POSTS_RESPONSE_FAIL',

    EVENT_POSTS_REQUEST: 'EVENT_POSTS_REQUEST',
    EVENT_POSTS_RESPONSE_SUC: 'EVENT_POSTS_RESPONSE_SUC',
    EVENT_POSTS_RESPONSE_FAIL: 'EVENT_POSTS_RESPONSE_FAIL',

}

import {API_EVENTLIST, API_EVENT, getEvent} from '../API'

const initialState = {
    loading: false,
    error: false,
    events: Array,
    event: Object,
    errorMessage: ''
}

export const reducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case types.EVENTLIST_POSTS_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                events: []
            }
        }
        case types.EVENTLIST_POSTS_RESPONSE_SUC: {
            return {
                ...state,
                loading: false,
                events: payload,
                error: false
            }
        }
        case types.EVENTLIST_POSTS_RESPONSE_FAIL: {
            return {
                ...state,
                loading: false,
                events: [],
                error: true,
                errorMessage: payload
            }
        }
        case types.EVENT_POSTS_REQUEST: {
            console.log("EVENT POST REQUESTTEYİZ")
            return {
                ...state,
                loading: true,
                error: false,
                event: []
            }
        }
        case types.EVENT_POSTS_RESPONSE_SUC: {
            console.log("BASARILI")
            return {
                ...state,
                loading: false,
                event: payload,
                error: false
            }
        }
        case types.EVENT_POSTS_RESPONSE_FAIL: {
            console.log("FAIL")
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: payload,
                event: []
            }
        }
    }
    return state;

}


export const actionCreators = {

    fetchEvent: (code) => async (dispatch, getState) => {
        dispatch({
            type: types.EVENT_POSTS_REQUEST
        })

        await Request.GET(getEvent+code.toUpperCase(),{
            '200': (res)=>{
                if (res.status && res.returnObject.status)
                    dispatch({
                        type: types.EVENT_POSTS_RESPONSE_SUC,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.EVENT_POSTS_RESPONSE_FAIL,
                        payload: '" ' + code + ' " can not found!'
                    })
            },
            otherwise:(res)=>{
                dispatch({
                    type: types.EVENT_POSTS_RESPONSE_FAIL,
                    payload: '" ' + code + ' " can not found!'
                })
            },
            fail:(err) =>{
                dispatch({
                    type: types.EVENT_POSTS_RESPONSE_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })

    },



}

export default reducer
