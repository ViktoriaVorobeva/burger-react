import {
    request
} from "../../utils/checkResponse";
import { getCookie } from "../../utils/cookie";
import {
    CLEAR_CONSTRUCTOR
} from "../burgerConstructor/actions";

export const GET_ORDER__REQUEST = 'GET_ORDER__REQUEST';
export const GET_ORDER__SUCCESS = 'GET_ORDER__SUCCESS';
export const GET_ORDER__FAILURE = 'GET_ORDER__FAILURE';

export const getOrdersData = (url, constructor, bun, getOpen, event) => {
    return function (dispatch) {
        if (bun) {
            dispatch({
                type: GET_ORDER__REQUEST,
            });
            request(url, {
                    method: "POST",
                    body: JSON.stringify({
                        ingredients: constructor.concat(bun)
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": 'Bearer ' + getCookie('token')
                    },
                })
                .then((data) => {
                    dispatch({
                        type: GET_ORDER__SUCCESS,
                        payload: data.order.number,
                    });
                    dispatch({
                        type: CLEAR_CONSTRUCTOR,
                    });
                    getOpen(event);
                })
                .catch(() => {
                    dispatch({
                        type: GET_ORDER__FAILURE,
                    })
                })
        } else {
            dispatch({
                type: GET_ORDER__FAILURE,
            })
        }
    }
};