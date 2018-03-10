
const types = {
    CONNECTION_REQUEST: 'CONNECTION_REQUEST',
};

const initialState = {
    connectionStatus: false
};

export const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.CONNECTION_REQUEST: {
            return {
                ...state,
                connectionStatus: payload,
            }
        }
    }
    return state;

};

export const actionCreators = {
    /**
     * Internet baglatisinin durumunu degistirir
     * @param connection
     */
    changedConnection: (connection) => (dispatch, getState) => {
        dispatch({type: types.CONNECTION_REQUEST, payload: connection})

    },
};

export default reducer