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
    user: Object
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
    }
    return state;

};

export const actionCreators = {
    loginDevice: () => (dispatch, getState) => {
        dispatch({type: types.REGISTER_REQUEST, payload: null})
    },
};

export default reducer





