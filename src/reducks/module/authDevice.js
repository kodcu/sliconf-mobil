import {postLoginDevice, postRegisterDevice} from "../Api";
import Request from "../../service/Request";

/**
 * Created by Muslum on 10.01.2018.
 */

const types = {
    DEVICE_REQUEST: 'DEVICE_REQUEST',
    DEVICE_LOGIN_SUC: 'DEVICE_LOGIN_SUC',
    DEVICE_LOGIN_FAIL: 'DEVICE_LOGIN_FAIL',
    DEVICE_REGISTER_SUC: 'DEVICE_REGISTER_SUC',
    DEVICE_REGISTER_FAIL: 'DEVICE_REGISTER_FAIL',

};

const initialState = {
    login: false,
    loading: false,
    error: false,
    user: Object,
    errorMessage: ''
};

export const reducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case types.DEVICE_REQUEST: {
            return {
                ...state,
                login: false,
                loading: true,
                error: false,
                user: payload
            }
        }
        case types.DEVICE_LOGIN_SUC: {
            return {
                ...state,
                login: true,
                loading: false,
                error: false,
                user: payload
            }
        }
        case types.DEVICE_LOGIN_FAIL: {
            return {
                ...state,
                login: false,
                loading: false,
                error: true,
                errorMessage: payload
            }
        }
        case types.DEVICE_REGISTER_SUC: {
            return {
                ...state,
                login: true,
                loading: false,
                error: false,
                user: payload
            }
        }
        case types.DEVICE_REGISTER_FAIL: {
            return {
                ...state,
                login: false,
                loading: false,
                error: true,
                errorMessage: payload
            }
        }
    }
    return state;

};

export const actionCreators = {
    loginDevice: (deviceId) => async (dispatch, getState) => {
        dispatch({type: types.DEVICE_REQUEST, payload: null})

        await Request.POST(postLoginDevice + deviceId, {}, {
            '200': (res) => {
                if (res.status)
                    dispatch({
                        type: types.DEVICE_LOGIN_SUC,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.DEVICE_LOGIN_FAIL,
                        payload: res.message
                    })
            },
            otherwise: (res) => {
                dispatch({
                    type: types.DEVICE_LOGIN_FAIL,
                    payload: res.message
                })
            },
            fail: (err) => {
                dispatch({
                    type: types.DEVICE_LOGIN_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })
    },
    registerDevice: (deviceId) => async (dispatch, getState) => {
        console.log("girdi")
        dispatch({type: types.DEVICE_REQUEST, payload: null})
        console.log("istek")
        await Request.POST(postRegisterDevice + deviceId, {}, {
            '200': (res) => {
                console.log("sonuc1")
                console.log(res)
                if (res.status)
                    dispatch({
                        type: types.DEVICE_REGISTER_SUC,
                        payload: res.returnObject
                    })
                else{
                    console.log("sonuc2")
                    dispatch({
                        type: types.DEVICE_REGISTER_FAIL,
                        payload: res.message
                    })
                }

            },
            otherwise: (res) => {
                console.log("sonuc3")
                dispatch({
                    type: types.DEVICE_REGISTER_FAIL,
                    payload: res.message
                })
            },
            fail: (err) => {
                console.log("sonuc4")
                dispatch({
                    type: types.DEVICE_REGISTER_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })
    },
};

export default reducer




