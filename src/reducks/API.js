const sliconfAPI = 'http://api.sliconf.com/service/';
export const getEvent = sliconfAPI + 'events/get/with-key/';
export const postLOGIN = sliconfAPI + 'users/login';
export const postREGISTER = sliconfAPI + 'users/register';
export const postFORGOT = sliconfAPI + 'users/password-reset/send/';
export const postCOMMENT = sliconfAPI + 'events/comment/add-new';
export const getCOMMENT = sliconfAPI + 'events/comment/list/';
export const postVOTE = sliconfAPI + 'events/comment/vote/';
