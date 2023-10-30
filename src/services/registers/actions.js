import {
    request
} from "../../utils/checkResponse";
import {
    getCookie,
    setCookie
} from "../../utils/cookie";
import { BASE_URL } from "../../utils/url";
import { urls } from "../../utils/urls";

export const GET_REGISTER__REQUEST = 'GET_REGISTER__REQUEST';
export const GET_REGISTER__SUCCESS = 'GET_REGISTER__SUCCESS';
export const GET_REGISTER__FAILURE = 'GET_REGISTER__FAILURE';

export const GET_LOGIN__REQUEST = 'GET_LOGIN__REQUEST';
export const GET_LOGIN__SUCCESS = 'GET_LOGIN__SUCCESS';
export const GET_LOGIN__FAILURE = 'GET_LOGIN__FAILURE';

export const GET_UPDATE__REQUEST = 'GET_UPDATE__REQUEST';
export const GET_UPDATE__SUCCESS = 'GET_UPDATE__SUCCESS';
export const GET_UPDATE__FAILURE = 'GET_UPDATE__FAILURE';

export const GET_LOGOUT__REQUEST = 'GET_LOGOUT__REQUEST';
export const GET_LOGOUT__SUCCESS = 'GET_LOGOUT__SUCCESS';
export const GET_LOGOUT__FAILURE = 'GET_LOGOUT__FAILURE';

const LOGINDATA = `${BASE_URL}${urls.login}`;
const REGISTERDATA = `${BASE_URL}${urls.register}`;
const REFRESHDATA = `${BASE_URL}${urls.token}`;
const USERDATA = `${BASE_URL}${urls.user}`;
const LOGOUTDATA = `${BASE_URL}${urls.logout}`;

export const getRegister = (form) => {
    return function (dispatch) {
        dispatch({
            type: GET_REGISTER__REQUEST,
        });
        request(REGISTERDATA, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            })
            .then((data) => {
                const authToken = data.accessToken?.split('Bearer ')[1];
                if (authToken) {
                    setCookie('token', authToken);
                    localStorage.setItem('token', data.refreshToken)
                }
                dispatch({
                    type: GET_REGISTER__SUCCESS,
                    payload: {...data.user, ...form},
                });
            })
            .catch(() => {
               dispatch({
                    type: GET_REGISTER__FAILURE,
                })
            })
    }
};

export const getLogin = (form) => {
    return function (dispatch) {
        dispatch({
            type: GET_LOGIN__REQUEST,
        });
        request(LOGINDATA, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            })
            .then((data) => {
                const authToken = data.accessToken?.split('Bearer ')[1];
                if (authToken) {
                    setCookie('token', authToken);
                    localStorage.setItem('token', data.refreshToken)
                }
                dispatch({
                    type: GET_LOGIN__SUCCESS,
                    payload: {...data.user, ...form},
                });
            })
            .catch(() => {
               dispatch({
                    type: GET_LOGIN__FAILURE,
                })
            })
    }
};

export const getRefreshRequest = async () => {
        request(REFRESHDATA, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: localStorage.getItem('token')}),
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
          })
          .then((data) => {
            const authToken = data.accessToken?.split('Bearer ')[1];
            if (authToken) {
                setCookie('token', authToken);
                localStorage.setItem('token', data.refreshToken)
            }
})}

export const updateUser = (form) => {
    return function (dispatch) {
        dispatch({
            type: GET_UPDATE__REQUEST,
        });
        request(USERDATA, {
                method: 'PATCH',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + getCookie('token')
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(form)
            })
            .then((data) => {
                dispatch({
                    type: GET_UPDATE__SUCCESS,
                    payload: {...data.user, ...form},
                });
            })
            .catch(() => {
               dispatch({
                    type: GET_UPDATE__FAILURE,
                })
            })
    }
};

export const getLogOut = () => {
    return function (dispatch) {
        dispatch({
            type: GET_LOGOUT__REQUEST,
        });
        request(LOGOUTDATA, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({token: localStorage.getItem('token')})
            })
            .then(() => {
                dispatch({
                    type: GET_LOGOUT__SUCCESS,
                });
                localStorage.clear();
                setCookie('token', '');
            })
            .catch(() => {
               dispatch({
                    type: GET_LOGOUT__FAILURE,
                })
            })
    }
};