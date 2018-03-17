const baseApi = 'https://api.sliconf.com/service/';

//event
export const getEvent = baseApi + 'events/get/with-key/';

//auth
export const postLogin = baseApi + 'users/login';
export const postLoginDevice = postLogin + '/anonymous/';
export const postRegister = baseApi + 'users/register';
export const postRegisterDevice = postRegister + '/anonymous/';
export const postForgot = baseApi + 'users/password-reset/send/';

//comment
export const postComment = baseApi + 'events/comment/add-new';
export const getComments = baseApi + 'events/comment/list/';
export const postVote = baseApi + 'events/comment/vote/';

// vote
export const voteTalk = baseApi + 'events/agenda/vote/';
export const getVoteByUser=baseApi+'events/agenda/get-vote/';

//Schedule
export const postSchedule = baseApi + 'schedule/add';
export const deleteSchedule = baseApi + 'schedule/remove';
export const getSchedule = baseApi + 'schedule/list/';