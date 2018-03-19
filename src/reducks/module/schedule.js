/**
 * Berkay 17.03.2018
 */

import Request from '../../service/Request';
import getTokenAuth from '../../helpers/getTokenAuth';
import { postSchedule, deleteSchedule, getSchedule } from '../Api';

const types = {
    SCHEDULE_POST_REQUEST: 'SCHEDULE_POST_REQUEST',
    SCHEDULE_POST_SUCCESS: 'SCHEDULE_POST_SUCCESS',
    SCHEDULE_POST_FAIL: 'SCHEDULE_POST_FAIL',
    SCHEDULE_GET_REQUEST: 'SCHEDULE_GET_REQUEST',
    SCHEDULE_GET_SUCCESS: 'SCHEDULE_GET_SUCCESS',
    SCHEDULE_GET_FAIL: 'SCHEDULE_GET_FAIL',
    SCHEDULE_DELETE_REQUEST: 'SCHEDULE_DELETE_REQUEST',
    SCHEDULE_DELETE_SUCCESS: 'SCHEDULE_DELETE_SUCCESS',
    SCHEDULE_DELETE_FAIL: 'SCHEDULE_DELETE_FAIL'
}

const initialState = {
    loading: false,
    error: false,
    scheduleError: String,
    schedule: Object,
    scheduleList: Array
};

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SCHEDULE_POST_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                schedule: {}
            }
        }
        case types.SCHEDULE_POST_SUCCESS: {
            return {
               ...state,
               loading: false,
               error: false,
               schedule: payload
            }
        }
        case types.SCHEDULE_POST_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                scheduleError: paylaod,
                schedule: {}
            }
        }
        case types.SCHEDULE_GET_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                scheduleList: []
            }
        }
        case types.SCHEDULE_GET_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                scheduleList: payload
            }
        }
        case types.SCHEDULE_GET_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                scheduleError: paylaod,
                scheduleList: []
            }
        }
        case types.SCHEDULE_DELETE_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case types.SCHEDULE_DELETE_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false
            }
        }
        case types.SCHEDULE_DELETE_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                scheduleError: paylaod
            }
        }
    }
    return state;
}

export const actionCreators = {

    postSchedule: (userId, eventId, sessionId) => async (dispatch, getState) => {
        dispatch({
            type: types.SCHEDULE_POST_REQUEST
        })
        await Request.POST(
            postSchedule,
            { userId, eventId, sessionId }, 
            getTokenAuth(getState()),
            {
            '200': (res)=>{
                if (res.status )
                    dispatch({
                        type: types.SCHEDULE_POST_SUCCESS,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.SCHEDULE_POST_FAIL,
                        payload: res.message
                    })
            },
            otherwise:(res)=>{
                dispatch({
                    type: types.SCHEDULE_POST_FAIL,
                    payload: res.message
                })
            },
            fail:(err) =>{
                dispatch({
                    type: types.SCHEDULE_POST_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        });
    },
    getSchedule: (userId, eventId) => async (dispatch, getState) => {
        dispatch({
            type: types.SCHEDULE_GET_REQUEST
        })
        await Request.GET(
            getSchedule + userId + '/' + eventId, 
            getTokenAuth(getState()), 
            {
            '200': (res)=>{
                if (res.status)
                    dispatch({
                        type: types.SCHEDULE_GET_SUCCESS,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.SCHEDULE_GET_FAIL,
                        payload: res.message
                    })
            },
            otherwise:(res)=>{
                dispatch({
                    type: types.SCHEDULE_GET_FAIL,
                    payload: res.message
                })
            },
            fail:(err) =>{
                dispatch({
                    type: types.SCHEDULE_GET_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        });
    },
    deleteSchedule: (id, userId, eventId, sessionId) => async (dispatch, getState) => {
        dispatch({
            type: types.SCHEDULE_DELETE_REQUEST
        })
        await Request.DELETE(
            deleteSchedule, 
            { id, userId, eventId, sessionId }, 
            getTokenAuth(getState()), 
            {
            '200': (res)=>{
                if (res.status )
                    dispatch({
                        type: types.SCHEDULE_DELETE_SUCCESS,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.SCHEDULE_DELETE_FAIL,
                        payload: res.message
                    })
            },
            otherwise:(res)=>{
                dispatch({
                    type: types.SCHEDULE_DELETE_FAIL,
                    payload:res.message
                })
            },
            fail:(err) =>{
                dispatch({
                    type: types.SCHEDULE_DELETE_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        });
    }
}

export default reducer;





