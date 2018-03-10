/**
 * Created by Muslum on 29.07.2017.
 */

import Request from "../../service/Request";
import {getVoteByUser, voteTalk} from '../Api'

const types = {
    VOTE_TALK_REQUEST: 'VOTE_TALK_REQUEST',
    VOTE_TALK_SUC: 'VOTE_TALK_SUC',
    VOTE_TALK_FAIL: 'VOTE_TALK_FAIL',
    VOTE_TALK_USER_REQUEST: 'VOTE_TALK_USER_REQUEST',
    VOTE_TALK_USER_SUC: 'VOTE_TALK_USER_SUC',
    VOTE_TALK_USER_FAIL: 'VOTE_TALK_USER_FAIL'
}

const initialState = {
    loading: false,
    error: false,
    errorMessage: String,
    message: String,
    userVote: false,
    voteValue: null
};

export const reducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case types.VOTE_TALK_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                message: {},
            }
        }
        case types.VOTE_TALK_SUC: {
            return {
                ...state,
                loading: false,
                error: false,
                message: payload,
            }
        }
        case types.VOTE_TALK_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: payload
            }
        }
        case types.VOTE_TALK_USER_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                userVote: false
            }
        }
        case types.VOTE_TALK_USER_SUC: {
            return {
                ...state,
                loading: false,
                error: false,
                userVote: true,
                voteValue: payload
            }
        }
        case types.VOTE_TALK_USER_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                userVote: false,
                errorMessage: payload
            }
        }
    }
    return state;

}

export const actionCreators = {

    voteTalk: (eventId, sessionId, userId, voteValue) => async (dispatch, getState) => {
        dispatch({
            type: types.VOTE_TALK_REQUEST
        })

        await Request.POST(
            voteTalk + eventId + "/" + sessionId + "/" + userId + "/" + voteValue, 
            {}, 
            getTokenAuth(getState()), 
            {
            '200': (res) => {
                if (res.status)
                    dispatch({
                        type: types.VOTE_TALK_SUC,
                        payload: res.message
                    })
                else
                    dispatch({
                        type: types.VOTE_TALK_FAIL,
                        payload: res.message
                    })
            },
            otherwise: (res) => {
                dispatch({
                    type: types.VOTE_TALK_FAIL,
                    payload: res.message
                })
            },
            fail: (err) => {
                dispatch({
                    type: types.VOTE_TALK_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })

    },
    getVoteByUser: (eventId, sessionId, userId) => async (dispatch, getState) => {
        dispatch({
            type: types.VOTE_TALK_USER_REQUEST
        })

        await Request.GET(
            getVoteByUser + eventId + "/" + sessionId + "/" + userId, 
            getTokenAuth(getState()),
            {
            '200': (res) => {
                if (res.status)
                    dispatch({
                        type: types.VOTE_TALK_USER_SUC,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.VOTE_TALK_USER_FAIL,
                        payload: res.message
                    })
            },
            otherwise: (res) => {
                dispatch({
                    type: types.VOTE_TALK_USER_FAIL,
                    payload: res.message
                })
            },
            fail: (err) => {
                dispatch({
                    type: types.VOTE_TALK_USER_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })

    }

}

export default reducer





