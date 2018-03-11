/**
 * Created by Muslum on 29.07.2017.
 */

import Request from "../../service/Request";
import getTokenAuth from "../../helpers/getTokenAuth";

const types = {
    COMMENT_ADD_REQUEST: 'COMMENT_ADD_REQUEST',
    COMMENT_ADD_SUC: 'COMMENT_ADD_SUC',
    COMMENT_ADD_FAIL: 'COMMENT_ADD_FAIL',
    COMMENT_GET_SESSION_REQUEST: 'COMMENT_GET_SESSION_REQUEST',
    COMMENT_GET_SESSION_SUC: 'COMMENT_GET_SESSION_SUC',
    COMMENT_GET_SESSION_FAIL: 'COMMENT_GET_SESSION_FAIL',
    POPULAR_COMMENT_GET_SESSION_REQUEST: 'POPULAR_COMMENT_GET_SESSION_REQUEST',
    POPULAR_COMMENT_GET_SESSION_SUC: 'POPULAR_COMMENT_GET_SESSION_SUC',
    POPULAR_COMMENT_GET_SESSION_FAIL: 'POPULAR_COMMENT_GET_SESSION_FAIL',
    COMMENT_VOTE_REQUEST: 'COMMENT_VOTE_REQUEST',
    COMMENT_VOTE_SUC: 'COMMENT_VOTE_SUC',
    COMMENT_VOTE_FAIL: 'COMMENT_VOTE_FAIL',
}

import {getComments, getEvent, postComment, postVote} from '../Api'

const initialState = {
    loading: false,
    error: false,
    comment: Object,
    commentList:Array,
    commentVoted:Object,
    errorMessage: String,
    popularCommentList:[],

};

export const reducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case types.COMMENT_ADD_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                comment: {},
            }
        }
        case types.COMMENT_ADD_SUC: {
            return {
                ...state,
                loading: false,
                error: false,
                comment: payload,
            }
        }
        case types.COMMENT_ADD_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                comment: {},
                errorMessage: payload
            }
        }
        case types.COMMENT_GET_SESSION_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                commentList: [],
            }
        }
        case types.COMMENT_GET_SESSION_SUC: {
            return {
                ...state,
                loading: false,
                error: false,
                commentList: payload,
            }
        }
        case types.COMMENT_GET_SESSION_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                commentList: [],
                errorMessage: payload
            }
        }
        case types.POPULAR_COMMENT_GET_SESSION_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                popularCommentList: [],
            }
        }
        case types.POPULAR_COMMENT_GET_SESSION_SUC: {
            return {
                ...state,
                loading: false,
                error: false,
                popularCommentList: payload,
            }
        }
        case types.POPULAR_COMMENT_GET_SESSION_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                popularCommentList: [],
                errorMessage: payload
            }
        }
        case types.COMMENT_VOTE_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                commentVoted: {},
            }
        }
        case types.COMMENT_VOTE_SUC: {
            return {
                ...state,
                loading: false,
                error: false,
                commentVoted: payload,
            }
        }
        case types.COMMENT_VOTE_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                commentVoted: {},
                errorMessage: payload
            }
        }
    }
    return state;

}

export const actionCreators = {

    postComment: (eventId,sessionId,userId,commentValue,time,anonymous) => async (dispatch, getState) => {
        dispatch({
            type: types.COMMENT_ADD_REQUEST
        })

        await Request.POST(
            postComment,
            { eventId, sessionId, userId, commentValue, time, anonymous }, 
            getTokenAuth(getState()),
            {
            '200': (res)=>{
                console.log(res)
                if (res.status )
                    dispatch({
                        type: types.COMMENT_ADD_SUC,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.COMMENT_ADD_FAIL,
                        payload: res.message
                    })
            },
            otherwise:(res)=>{
                dispatch({
                    type: types.COMMENT_ADD_FAIL,
                    payload:res.message
                })
            },
            fail:(err) =>{
                dispatch({
                    type: types.COMMENT_ADD_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })

    },
    postCommentAnonymous: (eventId,sessionId,userId,commentValue,time,fullname) => async (dispatch, getState) => {
        dispatch({
            type: types.COMMENT_ADD_REQUEST
        })

        const anonymous = true;
        await Request.POST(
            postComment, 
            { eventId, sessionId, userId, commentValue, time, anonymous, fullname }, 
            getTokenAuth(getState()), 
            {
            '200': (res)=>{
                console.log(res)
                if (res.status )
                    dispatch({
                        type: types.COMMENT_ADD_SUC,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.COMMENT_ADD_FAIL,
                        payload: res.message
                    })
            },
            otherwise:(res)=>{
                dispatch({
                    type: types.COMMENT_ADD_FAIL,
                    payload:res.message
                })
            },
            fail:(err) =>{
                dispatch({
                    type: types.COMMENT_ADD_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })

    },
    getCommentsSession: (eventId,sessionId) => async (dispatch, getState) => {
        dispatch({
            type: types.COMMENT_GET_SESSION_REQUEST
        })
        await Request.GET(
            getComments + 'approved' + '/' + eventId + "/" + sessionId + "?type=recent", 
            getTokenAuth(getState()), 
            {
            '200': (res)=>{
                if (res.status)
                    dispatch({
                        type: types.COMMENT_GET_SESSION_SUC,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.COMMENT_GET_SESSION_FAIL,
                        payload: res.message
                    })
            },
            otherwise:(res)=>{
                dispatch({
                    type: types.COMMENT_GET_SESSION_FAIL,
                    payload: res.message
                })
            },
            fail:(err) =>{
                dispatch({
                    type: types.COMMENT_GET_SESSION_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })

    },
    getPopularCommentsSession: (eventId,sessionId) => async (dispatch, getState) => {
        dispatch({
            type: types.POPULAR_COMMENT_GET_SESSION_REQUEST
        })
        await Request.GET(
            getComments + 'approved' + '/' + eventId + "/" + sessionId + "?count=5&type=top-rated", 
            getTokenAuth(getState()), 
            {
            '200': (res)=>{
                if (res.status){
                    dispatch({
                        type: types.POPULAR_COMMENT_GET_SESSION_SUC,
                        payload: res.returnObject
                    })
                    console.log(res.returnObject)
                }
                else
                    dispatch({
                        type: types.POPULAR_COMMENT_GET_SESSION_FAIL,
                        payload: res.message
                    })
            },
            otherwise:(res)=>{
                dispatch({
                    type: types.POPULAR_COMMENT_GET_SESSION_FAIL,
                    payload: res.message
                })
            },
            fail:(err) =>{
                dispatch({
                    type: types.POPULAR_COMMENT_GET_SESSION_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })

    },
    postCommentVote: (commentId,userId,vote) => async (dispatch, getState) => {
        dispatch({
            type: types.COMMENT_VOTE_REQUEST
        })
        console.log("Istek Yapıldı")
        await Request.POST(
            postVote + commentId + '/' + userId + '/' + vote, {}, getTokenAuth(getState()), {
            '200': (res)=>{
                console.log(res)
                if (res.status)
                    dispatch({
                        type: types.COMMENT_VOTE_SUC,
                        payload: res.returnObject
                    })
                else
                    dispatch({
                        type: types.COMMENT_VOTE_FAIL,
                        payload: res.message
                    })
            },
            otherwise:(res)=>{
                dispatch({
                    type: types.COMMENT_VOTE_FAIL,
                    payload: res.message
                })
            },
            fail:(err) =>{
                dispatch({
                    type: types.COMMENT_VOTE_FAIL,
                    payload: 'Can not be processed at this time!'
                })
            }
        })
    }

}

export default reducer





