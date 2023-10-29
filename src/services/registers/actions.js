import {
    request
} from "../../utils/checkResponse";
import {
    getCookie,
    setCookie
} from "../../utils/cookie";
import { fetchWithRefresh } from "../../utils/fetchWithRefresh";

export const GET_REGISTER__REQUEST = 'GET_REGISTER__REQUEST';
export const GET_REGISTER__SUCCESS = 'GET_REGISTER__SUCCESS';
export const GET_REGISTER__FAILURE = 'GET_REGISTER__FAILURE';
export const GET_REGISTER__LOGOUT = 'GET_REGISTER__LOGOUT';

export const getRegister = (url, form) => {
    return function (dispatch) {
        dispatch({
            type: GET_REGISTER__REQUEST,
        });
        request(url, {
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
                const authToken = data.accessToken.split('Bearer ')[1];
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

export const getRefreshRequest = async (url) => {
        request(url, {
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
            const authToken = data.accessToken.split('Bearer ')[1];
            if (authToken) {
                setCookie('token', authToken);
                localStorage.setItem('token', data.refreshToken)
            }
})}

export const getLoginRequest = async (url) => {
    return function (dispatch) {
        dispatch({
            type: GET_REGISTER__REQUEST,
        });
        fetchWithRefresh(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              "Authorization": 'Bearer ' + getCookie('token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
          })
          .then((data) => {
            dispatch({
                type: GET_REGISTER__SUCCESS,
                payload: data.user,
            });
        })
        .catch(() => {
            dispatch({
                type: GET_REGISTER__FAILURE,
            })
        })
    }
}

export const updateUser = (url, form) => {
    return function (dispatch) {
        dispatch({
            type: GET_REGISTER__REQUEST,
        });
        request(url, {
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

export const getLogOut = (url) => {
    return function (dispatch) {
        dispatch({
            type: GET_REGISTER__REQUEST,
        });
        request(url, {
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
                    type: GET_REGISTER__LOGOUT,
                });
                localStorage.clear();
                setCookie('token', '');
            })
            .catch(() => {
               dispatch({
                    type: GET_REGISTER__FAILURE,
                })
            })
    }
};