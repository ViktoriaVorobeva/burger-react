import {
    request
} from "../../utils/checkResponse";

export const GET_PASSWORD_RESET__REQUEST = 'GET_PASSWORD_RESET__REQUEST';
export const GET_PASSWORD_RESET__SUCCESS = 'GET_PASSWORD_RESET__SUCCESS';
export const GET_PASSWORD_RESET__FAILURE = 'GET_PASSWORD_RESET__FAILURE';

export const getPasswordReset = (url, form) => {
    return function (dispatch) {
        dispatch({
            type: GET_PASSWORD_RESET__REQUEST,
        });
        request(url, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((data) => {
                dispatch({
                    type: GET_PASSWORD_RESET__SUCCESS,
                    payload: data.success,
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_PASSWORD_RESET__FAILURE,
                })
            })
    }
};