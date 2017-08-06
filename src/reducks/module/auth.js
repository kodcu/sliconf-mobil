/**
 * Created by Muslum on 29.07.2017.
 */

const types = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_RESPONSE_SUC: 'LOGIN_RESPONSE_SUC',
    LOGIN_RESPONSE_FAIL: 'LOGIN_RESPONSE_FAIL',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_RESPONSE: 'LOGOUT_RESPONSE'
}

import {API_REGISTER, API_LOGIN} from '../API'

const initialState = {
    loading: false,
    error: false,
    login: false,
    user: Object,
    loginError: String,

};

export const reducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case types.LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                login: false,
                user: {},
            }
        }
        case types.LOGIN_RESPONSE_SUC: {
            return {
                ...state,
                loading: false,
                error: false,
                login: true,
                user: payload,
            }
        }
        case types.LOGIN_RESPONSE_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                login: false,
                user: {},
                errorMessage: payload
            }
        }
        case types.LOGOUT_REQUEST: {
            return {
                ...state,
                loading: false,
                error: false,
                login: false,
                user: {},
            }
        }
    }
    return state;

}

export const actionCreators = {

    login: ({username, password}) => async (dispatch, getState) => {

        dispatch({
            type: types.LOGIN_REQUEST
        })

        if (username === "mslm@kodcu.com" && password === "admin123") {
            try {
                const response = await fetch(API_LOGIN)
                const posts = await response.json()

                dispatch({
                    type: types.LOGIN_RESPONSE_SUC,
                    payload: posts.user
                })

            } catch (e) {
                dispatch({
                    type: types.LOGIN_RESPONSE_FAIL,
                    payload: 'İşleminiz gerçekleştirilemiyor!'
                })
            }
        }else
            dispatch({
                type: types.LOGIN_RESPONSE_FAIL,
                payload: 'Girdiğiniz bilgiler hatali veya eksik'
            })



    },
    logout: () => async (dispatch, getState) => {
        dispatch({
            type: types.LOGOUT_REQUEST
        })
    }

}

export default reducer





