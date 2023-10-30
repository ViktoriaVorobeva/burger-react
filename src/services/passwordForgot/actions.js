import {
    request
} from "../../utils/checkResponse";
import { BASE_URL } from "../../utils/url";
import { urls } from "../../utils/urls";

export const GET_PASSWORD_FORGOT__REQUEST = 'GET_PASSWORD_FORGOT__REQUEST';
export const GET_PASSWORD_FORGOT__SUCCESS = 'GET_PASSWORD_FORGOT__SUCCESS';
export const GET_PASSWORD_FORGOT__FAILURE = 'GET_PASSWORD_FORGOT__FAILURE';

const FORGOTPASSWORDDATA = `${BASE_URL}${urls.forgot}`;

export const getPasswordForgot = (email) => {
    return function (dispatch) {
            dispatch({
                type: GET_PASSWORD_FORGOT__REQUEST,
            });
            request(FORGOTPASSWORDDATA, {
                    method: "POST",
                    body: JSON.stringify({
                        email: email
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(() => {
                    dispatch({
                        type: GET_PASSWORD_FORGOT__SUCCESS,
                        payload: email,
                    });
                })
                .catch(() => {
                    dispatch({
                        type: GET_PASSWORD_FORGOT__FAILURE,
                    })
                })
        }
};