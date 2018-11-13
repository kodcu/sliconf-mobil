const types = {
	CONNECTION_REQUEST: 'CONNECTION_REQUEST',
};

const initialState = {
	connectionStatus: false
};

const initialAction = {
	type: String,
	payload: Object
};

export const reducer = (state = initialState, action = initialAction) => {
	const { type, payload } = action;
	if (type === types.CONNECTION_REQUEST) {
		return {
			...state,
			connectionStatus: payload,
		};
	}
	return state;
};

export const actionCreators = {
    /**
     * Internet baglatisinin durumunu degistirir
     * @param connection
     */
	changedConnection: (connection) => (dispatch, getState) => {
		dispatch({ type: types.CONNECTION_REQUEST, payload: connection });
	}
};

export default reducer;
