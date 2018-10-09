/**
 * Created by Berkay 04.09.2018
 */

import Request from '../../service/Request';
import getTokenAuth from '../../helpers/getTokenAuth';
import { 
    getSurveys,
	postAnswers,
	increaseView
} from '../Api';

const types = {
    SURVEYS_GET_REQUEST: 'SURVEYS_GET_REQUEST',
    SURVEYS_GET_SUCCESS: 'SURVEYS_GET_SUCCESS',
    SURVEYS_GET_FAIL: 'SURVEYS_GET_FAIL',
    ANSWERS_POST_REQUEST: 'ANSWERS_POST_REQUEST',
    ANSWERS_POST_SUCCESS: 'ANSWERS_POST_SUCCESS',
	ANSWERS_POST_FAIL: 'ANSWERS_POST_FAIL',
	SURVEY_ADD_VIEW_COUNT: 'SURVEY_ADD_VIEW_COUNT',
	SURVEY_ADD_VIEW_SUCCESS: 'SURVEY_ADD_VIEW_SUCCESS',
	SURVEY_ADD_VIEW_FAIL: 'SURVEY_ADD_VIEW_FAIL'
};

const initialState = {
    surveys: Array,
    errorMessage: String,
    error: false,
    loading: false
};

export const reducer = (action, state = initialState) => {    
    const { type, payload } = action;

    switch (type) {
        case types.SURVEYS_GET_REQUEST: {
            return {
                ...state,
                surveys: [],
                loading: true,
                error: false
            };
        }
        case types.SURVEYS_GET_SUCCESS: {
            return {
                ...state,
                surveys: payload,
                loading: false,
                error: false
            };
        }
        case types.SURVEYS_GET_FAIL: {
            return {
                ...state,
                surveys: [],
                loading: false,
                error: true,
                errorMessage: payload
            };
        }
        case types.ANSWERS_POST_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false
            };
        }
        case types.ANSWERS_POST_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false
            };
        }
        case types.ANSWERS_POST_FAIL: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: payload
            };
		}
		case types.SURVEY_ADD_VIEW_COUNT || types.SURVEY_ADD_VIEW_SUCCESS: {
			return {
				...state
			};
		}
		case types.SURVEY_ADD_VIEW_FAIL: {
			return {
				...state,
				error: true,
                errorMessage: payload
			};
		}
        default: {
            return state;
        }
    }
};

export const actionCreators = {
    getSurveys: (eventId) => async (dispatch, getState) => {
        dispatch({
            type: types.SURVEYS_GET_REQUEST
        });
        await Request.GET(
            `${getSurveys}/${eventId}/surveys`,
            getTokenAuth(getState()),
            {
                200: (res) => {
                    if (res.status) {
                        dispatch({
                            type: types.SURVEYS_GET_SUCCESS,
                            payload: res.returnObject
                        });
                    } else {
                        dispatch({
                            type: types.SURVEYS_GET_FAIL,
                            payload: res.message
                        });
                    }
                },
                otherwise: (res) => {
                    dispatch({
                        type: types.SURVEYS_GET_FAIL,
                        payload: res.message
                    });
                },
                fail: () => {
                    dispatch({
                        type: types.SURVEYS_GET_FAIL,
                        payload: 'Can not be processed at this time!'
                    });
                }
            }
        );
    },
    postAnswers: (eventId, surveyId, answers) => async (dispatch, getState) => {
        dispatch({
            type: types.ANSWERS_POST_REQUEST
        });
        await Request.POST(
            `${postAnswers}/${eventId}/surveys/${surveyId}/answer`,
            answers,
            getTokenAuth(getState()),
            {
                200: (res) => {
                    if (res.status) {
                        dispatch({
                            type: types.ANSWERS_POST_SUCCESS,
                            payload: res.returnObject
                        });
                    } else {
                        dispatch({
                            type: types.ANSWERS_POST_FAIL,
                            payload: res.message
                        });
                    }
                },
                otherwise: (res) => {
                    dispatch({
                        type: types.ANSWERS_POST_FAIL,
                        payload: res.message
                    });
                },
                fail: () => {
                    dispatch({
                        type: types.ANSWERS_POST_FAIL,
                        payload: 'Can not be processed at this time!'
                    });
                }
            }
        );
	},
	increaseViewCount: (eventId, surveyId) => async (dispatch, getState) => {
		dispatch({
			type: types.SURVEY_ADD_VIEW_COUNT
		});
		await Request.POST(
			`${increaseView}/${eventId}/surveys/${surveyId}/view`,
			{},
			getTokenAuth(getState()),
			{
                200: (res) => {
                    if (res.status) {
                        dispatch({
                            type: types.SURVEY_ADD_VIEW_SUCCESS
                        });
                    } else {
                        dispatch({
                            type: types.SURVEY_ADD_VIEW_FAIL,
                            payload: res.message
                        });
                    }
                },
                otherwise: (res) => {
                    dispatch({
                        type: types.SURVEY_ADD_VIEW_FAIL,
                        payload: res.message
                    });
                },
                fail: () => {
                    dispatch({
                        type: types.SURVEY_ADD_VIEW_FAIL,
                        payload: 'Can not be processed at this time!'
                    });
                }
            }
		);
	}
};

export default reducer;
