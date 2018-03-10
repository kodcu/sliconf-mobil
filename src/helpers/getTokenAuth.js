export const getTokenAuth = (state) => {
    return { "Authorization": state.auth.user.token }
};