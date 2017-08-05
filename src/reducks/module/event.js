/**
 * Created by Muslum on 30.07.2017.
 */

const types = {
    EVENTLIST_POSTS_REQUEST: 'EVENTLIST_POSTS_REQUEST',
    EVENTLIST_POSTS_RESPONSE_SUC: 'EVENTLIST_POSTS_RESPONSE',
    EVENTLIST_POSTS_RESPONSE_FAIL: 'EVENTLIST_POSTS_RESPONSE',

    EVENT_POSTS_REQUEST: 'EVENT_POSTS_REQUEST',
    EVENT_POSTS_RESPONSE_SUC: 'EVENT_POSTS_RESPONSE',
    EVENT_POSTS_RESPONSE_FAIL: 'EVENT_POSTS_RESPONSE',

}

import {API_EVENTLIST, API_EVENT} from '../API'

const initialState = {
    loading: false,
    error: false,
    events: Array,
    event: Object,
    errorMessage: ''
}

export const reducer = (state = initialState, action) => {
    const {type, payload, message} = action

    switch (type) {
        case types.EVENTLIST_POSTS_REQUEST: {
            return {...state, loading: true, error: false, events: []}
        }
        case types.EVENTLIST_POSTS_RESPONSE_SUC: {
            return {...state, loading: false, events: payload, error: false}
        }
        case types.EVENTLIST_POSTS_RESPONSE_FAIL: {
            return {...state, loading: false, events: [], error: true, errorMessage: message}
        }
        case types.EVENT_POSTS_REQUEST: {
            return {...state, loading: true, error: false}
        }
        case types.EVENT_POSTS_RESPONSE_SUC: {
            return {...state, loading: false, event: payload, error: false}
        }
        case types.EVENT_POSTS_RESPONSE_FAIL: {
            return {...state, loading: false, error: true, errorMessage: message}
        }

    }

    return state;

}


export const actionCreators = {

    fetchEventList: (name) => async (dispatch, getState) => {
        dispatch({type: types.EVENTLIST_POSTS_REQUEST})

        try {
            const response = await fetch(API_EVENTLIST)
            const posts = await response.json()

            if (name === 'hata')
                dispatch({type: types.EVENTLIST_POSTS_RESPONSE_FAIL, message: 'bu isimde bir etkinlik bulunamadı'})
            else
                dispatch({type: types.EVENTLIST_POSTS_RESPONSE_SUC, payload: posts.events})


        } catch (e) {
            dispatch({type: types.EVENTLIST_POSTS_RESPONSE_FAIL, message: 'hata'})
        }

    },
    fetchEvent: (code) => async (dispatch, getState) => {
        dispatch({type: types.EVENT_POSTS_REQUEST})

        try {
            const response = await fetch(API_EVENT)
            const posts = await response.json()

            dispatch({type: types.EVENT_POSTS_RESPONSE_SUC, payload: posts.event})
        } catch (e) {
            dispatch({type: types.EVENT_POSTS_RESPONSE_FAIL, message: 'Etkinliğe ulaşılamıyor'})
        }
    }

}

export default reducer