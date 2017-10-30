/**
 * Created by Muslum on 30.07.2017.
 */
const API = "https://jsonblob.com/api/jsonBlob/"
export const API_EVENTLIST = API + '5fe3a887-70bb-11e7-9e0d-8d0ef0a54cdd';
//default
export const API_EVENT2 = API + 'bfb38235-75f1-11e7-9e0d-0d7acc47c25b';
//local javaday
export const API_EVENT3 = "http://192.168.204.1:3000/db"
//javaday
export const API_EVENT = API + "238bd198-a799-11e7-ac9a-7d28273b822f"
export const API_LOGIN = API + '1d28e931-7a1d-11e7-9e0d-9b6c09e3cf27';
export const API_REGISTER = API + '1d28e931-7a1d-11e7-9e0d-9b6c09e3cf27';

const sliconfAPI__ = 'http://sliconf.com:8090/service/';
const sliconfAPI = 'http://192.168.43.48:8090/service/';
export const getEvent = sliconfAPI + 'events/get/with-key/';
export const postLOGIN = sliconfAPI + 'users/login';
export const postREGISTER = sliconfAPI + 'users/register';
