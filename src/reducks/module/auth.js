/**
 * Created by Muslum on 29.07.2017.
 */

import Request from "../../service/Request";
import {API_LOGIN, API_REGISTER, postForgot, postLogin, postRegister} from '../Api'

const types = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_RESPONSE_SUC: 'LOGIN_RESPONSE_SUC',
    LOGIN_RESPONSE_FAIL: 'LOGIN_RESPONSE_FAIL',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_RESPONSE: 'LOGOUT_RESPONSE',
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_RESPONSE_SUC: 'REGISTER_RESPONSE_SUC',
    REGISTER_RESPONSE_FAIL: 'REGISTER_RESPONSE_FAIL',
    FORGOT_PASS_REQUEST: 'FORGOT_PASS_REQUEST',
    FORGOT_PASS_RESPONSE_SUC: 'FORGOT_PASS_RESPONSE_SUC',
    FORGOT_PASS_RESPONSE_FAIL: 'FORGOT_PASS_RESPONSE_FAIL',
}

const initialState = {
    loading: false,
    error: false,
    login: false,
    user: Object,
    loginError: String,

};

export const reducer = (state = initialState, action) => {
    const {type, payload} = action;

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
        case types.REGISTER_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                login: false,
                user: {},
            }
        }
        case types.REGISTER_RESPONSE_SUC: {
            return {
                ...state,
                loading: false,
                error: false,
                login: true,
                user: payload,
            }
        }
        case types.REGISTER_RESPONSE_FAIL: {
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
        case types.FORGOT_PASS_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                login: false,
                user: {},
            }
        }
        case types.FORGOT_PASS_RESPONSE_SUC: {
            return {
                ...state,
                loading: false,
                error: false,
                login: false,
            }
        }
        case types.FORGOT_PASS_RESPONSE_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                login: false,
                user: {},
                errorMessage: payload
            }
        }
    }
    return state;

}

export const actionCreators = {

    login: (username, password) => async (dispatch, getState) => {
        dispatch({
            type: types.LOGIN_REQUEST
        })

        await Request.POST(postLogin, {username, password}, {
            '200': (res) => {
                if (res.status)
                    dispatch({
                        type: types.LOGIN_RESPONSE_SUC,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.LOGIN_RESPONSE_FAIL,
                        payload: res.message
                    })
            },
            otherwise: (res) => {
                dispatch({
                    type: types.LOGIN_RESPONSE_FAIL,
                    payload: res.message
                })
            },
            fail: (err) => {
                dispatch({
                    type: types.LOGIN_RESPONSE_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })

    },
    register: (fullname, username, email, password) => async (dispatch, getState) => {
        dispatch({
            type: types.REGISTER_REQUEST
        })

        await Request.POST(postRegister, {username, password, email, fullname}, {
            '200': (res) => {
                if (res.status)
                    dispatch({
                        type: types.REGISTER_RESPONSE_SUC,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.LOGIN_RESPONSE_FAIL,
                        payload: res.message
                    })
            },
            otherwise: (res) => {
                dispatch({
                    type: types.REGISTER_RESPONSE_FAIL,
                    payload: res.message
                })
            },
            fail: (err) => {
                dispatch({
                    type: types.REGISTER_RESPONSE_FAIL,
                    payload: 'İşleminiz gerçekleştirilemiyor!'
                })
            }
        })

    },

    forgotPassword: (email) => async (dispatch, getState) => {
        dispatch({
            type: types.FORGOT_PASS_REQUEST
        })

        await Request.POST(postForgot + email, {email}, {
            '200': (res) => {
                if (res.status)
                    dispatch({
                        type: types.FORGOT_PASS_RESPONSE_SUC,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.FORGOT_PASS_RESPONSE_FAIL,
                        payload: res.message
                    })
            },
            otherwise: (res) => {
                dispatch({
                    type: types.FORGOT_PASS_RESPONSE_FAIL,
                    payload: res.message
                })
            },
            fail: (err) => {
                dispatch({
                    type: types.FORGOT_PASS_RESPONSE_FAIL,
                    payload: 'İşleminiz gerçekleştirilemiyor!'
                })
            }
        })

    },

    login2: (username, password) => async (dispatch, getState) => {
        dispatch({type: types.LOGIN_REQUEST});


        if (username === "abc" && password === "123") {
            try {
                const response = await fetch(API_LOGIN)
                const posts = await response.json()

                dispatch({type: types.LOGIN_RESPONSE_SUC, payload: posts.user})


            } catch (e) {
                dispatch({type: types.LOGIN_RESPONSE_FAIL, message: 'hata'})
            }
        } else
            dispatch({
                type: types.LOGIN_RESPONSE_FAIL,
                message: 'Girdiğiniz bilgiler hatali veya eksik'
            })


    },
    logout: () => async (dispatch, getState) => {
        dispatch({
            type: types.LOGOUT_REQUEST
        })
    },

}

export default reducer





