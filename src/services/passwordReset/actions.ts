import { AppDispatch, AppThunk } from "../../types/ingridient";
import {
    request
} from "../../utils/checkResponse";
import { BASE_URL } from "../../utils/url";
import { urls } from "../../utils/urls";

export const GET_PASSWORD_RESET__REQUEST = 'GET_PASSWORD_RESET__REQUEST';
export const GET_PASSWORD_RESET__SUCCESS = 'GET_PASSWORD_RESET__SUCCESS';
export const GET_PASSWORD_RESET__FAILURE = 'GET_PASSWORD_RESET__FAILURE';

const RESETPASSWORDDATA = `${BASE_URL}${urls.reset}`;

export const getPasswordReset: AppThunk = (form) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_PASSWORD_RESET__REQUEST,
        });
        request(RESETPASSWORDDATA, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((data) => {
                dispatch({
                    type: GET_PASSWORD_RESET__SUCCESS,
                    payload: data,
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_PASSWORD_RESET__FAILURE,
                })
            })
    }
};