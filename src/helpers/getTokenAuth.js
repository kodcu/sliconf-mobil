export const getTokenAuth = (state) => {
    if (state) {
        if (state.auth && state.auth.user && state.auth.user.token ) {
            return { "Authorization": state.auth.user.token }
        } else if (state.authDevice && state.authDevice.user && state.authDevice.user.token){
            return { "Authorization": state.authDevice.user.token }
        }
    }
    return { "Authorization": "" };
};
