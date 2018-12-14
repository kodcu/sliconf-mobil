/**
 * Created by Muslum on 30.07.2017.
 */
import { getEvent, getAllEvents } from '../Api';
import Request from '../../service/Request';
import getTokenAuth from '../../helpers/getTokenAuth';

const types = {
	EVENTLIST_POSTS_REQUEST: 'EVENTLIST_POSTS_REQUEST',
	EVENTLIST_POSTS_RESPONSE_SUC: 'EVENTLIST_POSTS_RESPONSE_SUC',
	EVENTLIST_POSTS_RESPONSE_FAIL: 'EVENTLIST_POSTS_RESPONSE_FAIL',
	EVENT_POSTS_REQUEST: 'EVENT_POSTS_REQUEST',
	EVENT_POSTS_RESPONSE_SUC: 'EVENT_POSTS_RESPONSE_SUC',
	EVENT_POSTS_RESPONSE_FAIL: 'EVENT_POSTS_RESPONSE_FAIL',
};

const initialState = {
	loading: false,
	error: false,
	events: Array,
	event: Object,
	errorMessage: ''
};

const initialAction = {
	type: String,
	payload: Object
};

export const reducer = (state = initialState, action = initialAction) => {
	const { type, payload } = action;

	switch (type) {
		case types.EVENTLIST_POSTS_REQUEST: {
			return {
				...state,
				loading: true,
				error: false,
				events: []
			};
		}
		case types.EVENTLIST_POSTS_RESPONSE_SUC: {
			return {
				...state,
				loading: false,
				events: payload,
				error: false
			};
		}
		case types.EVENTLIST_POSTS_RESPONSE_FAIL: {
			return {
				...state,
				loading: false,
				events: [],
				error: true,
				errorMessage: payload
			};
		}
		case types.EVENT_POSTS_REQUEST: {
			return {
				...state,
				loading: true,
				error: false,
				event: []
			};
		}
		case types.EVENT_POSTS_RESPONSE_SUC: {
			return {
				...state,
				loading: false,
				event: payload,
				error: false
			};
		}
		case types.EVENT_POSTS_RESPONSE_FAIL: {
			return {
				...state,
				loading: false,
				error: true,
				errorMessage: payload,
				event: []
			};
		}
		default:
			return state;
	}
};

export const actionCreators = {
	getEventsWithName: (name) => async (dispatch, getState) => {
		dispatch({
			type: types.EVENTLIST_POSTS_REQUEST
		});
		await Request.GET(
			`${getAllEvents}`, //?name=${name.toLowerCase()}
			getTokenAuth(getState()),
			{
				200: (res) => {
					if (res.status && res.returnObject)
						dispatch({
							type: types.EVENTLIST_POSTS_RESPONSE_SUC,
							payload: res.returnObject
						});
					else
						dispatch({
							type: types.EVENTLIST_POSTS_RESPONSE_FAIL,
							payload: res.message
						});
				},
				otherwise: (res) => {
					dispatch({
						type: types.EVENTLIST_POSTS_RESPONSE_FAIL,
						payload: res.message
					});
				},
				fail: (err) => {
					dispatch({
						type: types.EVENTLIST_POSTS_RESPONSE_FAIL,
						payload: 'Can not be processed at this time!'
					});
				}
			}
		);
	},
	fetchEvent: (code, userId) => async (dispatch, getState) => {
		dispatch({
			type: types.EVENT_POSTS_REQUEST
		});

		await Request.GET(
			getEvent + code.toUpperCase() + "?statistic=true&userId=" + userId,
			getTokenAuth(getState()),
			{
				'200': (res) => {
					if (res.status && res.returnObject.status)
						dispatch({
							type: types.EVENT_POSTS_RESPONSE_SUC,
							payload: res.returnObject
						});
					else
						dispatch({
							type: types.EVENT_POSTS_RESPONSE_FAIL,
							payload: '" ' + code.toUpperCase() + ' " can not found!'
						});
				},
				otherwise: (res) => {
					dispatch({
						type: types.EVENT_POSTS_RESPONSE_FAIL,
						payload: '" ' + code.toUpperCase() + ' " can not found!'
					});
				},
				fail: (err) => {
					dispatch({
						type: types.EVENT_POSTS_RESPONSE_FAIL,
						payload: 'Can not be processed at this time!'
					});
				}
			});
	}
};

export default reducer;
