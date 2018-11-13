/**
 * Created by Muslum on 28.10.2017.
 */
import { HOME } from '../../router';

const types = {
	DRAWER_REQUEST: 'DRAWER_REQUEST',
};

const initialState = {
	drawerIndex: HOME
};

const initialAction = {
	type: String,
	payload: Object
};

export const reducer = (state = initialState, action = initialAction) => {
	const { type, payload } = action;
	if (type === types.DRAWER_REQUEST) {
		return {
			...state,
			drawerIndex: payload,
		};
	}
	return state;
};

export const actionCreators = {
    /**
     * Drawer uzerinde secili olan sayfanin ismini tutmak icin yazilmistir.
     * @param drawerName
     */
	changedDrawer: (drawerName) => (dispatch, getState) => {
		dispatch({ type: types.DRAWER_REQUEST, payload: drawerName });
	}
};

export default reducer;
