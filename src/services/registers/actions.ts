import { AppDispatch, AppThunk } from "../../types/ingridient";
import {
    setCookie
} from "../../utils/cookie";
import { getRegist, login, logout, update } from "../../utils/fetchWithRefresh";

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

export const getRegister: AppThunk = (form) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_REGISTER__REQUEST,
        });
        getRegist(form)
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

export const getLogin: AppThunk = (form) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_LOGIN__REQUEST,
        });
        login(form)
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

export const updateUser: AppThunk = (form) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_UPDATE__REQUEST,
        });
        update(form)
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

export const getLogOut: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_LOGOUT__REQUEST,
        });
        logout()
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