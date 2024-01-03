import { request } from "../../utils/checkResponse";
import { getCookie } from "../../utils/cookie";
import { BASE_URL } from "../../utils/url";
import { urls } from "../../utils/urls";
import {
  CLEAR_CONSTRUCTOR,
  GET_ORDER__FAILURE,
  GET_ORDER__REQUEST,
  GET_ORDER__SUCCESS,
} from "../constants";
import { AppDispatch, AppThunkAction, IOrder } from "../types";

const ORDERDATA = `${BASE_URL}${urls.orders}`;

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER__REQUEST;
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER__SUCCESS;
  readonly payload: number;
}

export interface IGetOrderFailure {
  readonly type: typeof GET_ORDER__FAILURE;
}

export interface IGetConstructorClear {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TOrderActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailure
  | IGetConstructorClear;

export const getOrderAction = (): IGetOrderRequest => ({
  type: GET_ORDER__REQUEST,
});

export const getOrderActionSuccess = (data: number): IGetOrderSuccess => ({
  type: GET_ORDER__SUCCESS,
  payload: data,
});

export const getOrderActionFailure = (): IGetOrderFailure => ({
  type: GET_ORDER__FAILURE,
});

export const getConstructorClearAction = (): IGetConstructorClear => ({
  type: CLEAR_CONSTRUCTOR,
});

export const getOrdersData = (constructor: string[], bun: string): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    const oneBun = constructor.indexOf(bun);
    const order = constructor.slice();
    order.splice(oneBun, 1);
    const newOrder = [bun, ...order];
    if (bun) {
      dispatch(getOrderAction());
      request<IOrder>(ORDERDATA, {
        method: "POST",
        body: JSON.stringify({
          ingredients: newOrder.concat(bun),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + getCookie("token"),
        },
      })
        .then((data) => {
          dispatch(getOrderActionSuccess(data.order.number));
          dispatch(getConstructorClearAction());
        })
        .catch(() => {
          dispatch(getOrderActionFailure());
        });
    } else {
      dispatch(getOrderActionFailure());
    }
  };
};
