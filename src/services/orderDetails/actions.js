import {
    request
} from "../../utils/checkResponse";
import { getCookie } from "../../utils/cookie";
import { BASE_URL } from "../../utils/url";
import { urls } from "../../utils/urls";
import {
    CLEAR_CONSTRUCTOR
} from "../burgerConstructor/actions";

export const GET_ORDER__REQUEST = 'GET_ORDER__REQUEST';
export const GET_ORDER__SUCCESS = 'GET_ORDER__SUCCESS';
export const GET_ORDER__FAILURE = 'GET_ORDER__FAILURE';

const ORDERDATA = `${BASE_URL}${urls.orders}`;

export const getOrdersData = (constructor, bun) => {
    return function (dispatch) {
        const oneBun = constructor.indexOf(bun);
        const order = constructor.slice();
        order.splice(oneBun, 1);
        const newOrder = [bun, ...order];
        if (bun) {
            dispatch({
                type: GET_ORDER__REQUEST,
            });
            request(ORDERDATA, {
                    method: "POST",
                    body: JSON.stringify({
                        ingredients: newOrder.concat(bun)
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